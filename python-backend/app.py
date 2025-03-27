from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pytesseract
from PIL import Image
import pdf2image
import re
import io
import tempfile
from supabase import create_client, Client

# Initialize Supabase client
url: str = "https://yyhtwxtcfneqxrtvmskx.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5aHR3eHRjZm5lcXhydHZtc2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MTY1NjAsImV4cCI6MjA1ODM5MjU2MH0.VVCHNEGCRZnX_0irZOX5aieGQcduoJdeiMo35L9kB74"

print("Supabase URL:", url)
print("Supabase Key:", key)

# Initialize Supabase client without options
supabase: Client = create_client(url, key)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Tesseract path if needed (especially on Windows)
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

@app.route('/extract', methods=['POST'])
def extract_id_data():
  if 'file' not in request.files:
      return jsonify({'error': 'No file part'}), 400
  
  file = request.files['file']
  
  if file.filename == '':
      return jsonify({'error': 'No selected file'}), 400
  
  try:
      # Create a temporary file to store the uploaded file
      with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp:
          file.save(temp.name)
          temp_filename = temp.name
      
      # Process the file based on its type
      if file.filename.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.tiff')):
          text = process_image(temp_filename)
      elif file.filename.lower().endswith('.pdf'):
          text = process_pdf(temp_filename)
      else:
          os.unlink(temp_filename)
          return jsonify({'error': 'Unsupported file format'}), 400
      
      # Clean up the temporary file
      os.unlink(temp_filename)
      
      # Extract data from the OCR text
      extracted_data = extract_data_from_text(text, file.filename)
      
      # Save to Supabase
      supabase.table('extracted_data').insert(extracted_data).execute()
      
      return jsonify(extracted_data)
  
  except Exception as e:
      return jsonify({'error': str(e)}), 500

def process_image(image_path):
  """Process an image file with OCR"""
  image = Image.open(image_path)
  text = pytesseract.image_to_string(image)
  return text

def process_pdf(pdf_path):
  """Convert PDF to images and process with OCR"""
  pages = pdf2image.convert_from_path(pdf_path)
  text = ""
  for page in pages:
      text += pytesseract.image_to_string(page)
  return text

def extract_data_from_text(text, filename):
  """Extract structured data from OCR text"""
  # Determine document type
  document_type = "Unknown"
  if "passport" in text.lower() or "passport" in filename.lower():
      document_type = "Passport"
  elif "national" in text.lower() and "id" in text.lower():
      document_type = "National ID"
  elif "driver" in text.lower() and "license" in text.lower():
      document_type = "Driver's License"
  
  # Initialize extracted data dictionary
  extracted_data = {
      "documentType": document_type,
      "confidence": 0.85  # Base confidence score
  }
  
  # Extract ID/Serial Number
  id_patterns = [
      r'(?:ID|id|No|NO|Number)[\.:#\s]*([A-Z0-9]+)',
      r'(?:Passport|passport)[\.:#\s]*([A-Z0-9]+)',
      r'(?:Serial|serial)[\.:#\s]*([A-Z0-9]+)'
  ]
  
  for pattern in id_patterns:
      match = re.search(pattern, text)
      if match:
          extracted_data["idNumber"] = match.group(1)
          break
  
  # Extract Name
  name_patterns = [
      r'(?:Name|name)[\.:#\s]*([A-Za-z\s]+)',
      r'(?:Given names|given names)[\.:#\s]*([A-Za-z\s]+)',
      r'(?:Surname|surname)[\.:#\s]*([A-Za-z\s]+)'
  ]
  
  # Try to extract full name
  full_name_match = re.search(r'(?:Name|name)[\.:#\s]*([A-Za-z\s]+)', text)
  if full_name_match:
      full_name = full_name_match.group(1).strip()
      name_parts = full_name.split()
      
      if len(name_parts) >= 3:
          extracted_data["firstName"] = name_parts[0]
          extracted_data["middleName"] = name_parts[1]
          extracted_data["lastName"] = " ".join(name_parts[2:])
      elif len(name_parts) == 2:
          extracted_data["firstName"] = name_parts[0]
          extracted_data["lastName"] = name_parts[1]
      else:
          extracted_data["firstName"] = full_name
  
  # Extract Date of Birth
  dob_patterns = [
      r'(?:Date of Birth|DOB|Birth Date)[\.:#\s]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})',
      r'(?:Born|born)[\.:#\s]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})'
  ]
  
  for pattern in dob_patterns:
      match = re.search(pattern, text)
      if match:
          extracted_data["dateOfBirth"] = match.group(1)
          break
  
  # Extract Sex/Gender
  sex_match = re.search(r'(?:Sex|sex|Gender|gender)[\.:#\s]*([MF]|Male|Female)', text, re.IGNORECASE)
  if sex_match:
      sex_value = sex_match.group(1).upper()
      if sex_value in ['M', 'MALE']:
          extracted_data["sex"] = "Male"
      elif sex_value in ['F', 'FEMALE']:
          extracted_data["sex"] = "Female"
  
  # Extract Nationality
  nationality_match = re.search(r'(?:Nationality|nationality)[\.:#\s]*([A-Za-z\s]+)', text)
  if nationality_match:
      extracted_data["nationality"] = nationality_match.group(1).strip()
  
  # Extract Issue/Expiry dates
  issue_match = re.search(r'(?:Date of Issue|Issued|Issue Date)[\.:#\s]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})', text, re.IGNORECASE)
  if issue_match:
      extracted_data["issuedDate"] = issue_match.group(1)
  
  expiry_match = re.search(r'(?:Date of Expiry|Expiry|Expiry Date|Expires|Valid Until)[\.:#\s]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})', text, re.IGNORECASE)
  if expiry_match:
      extracted_data["expiryDate"] = expiry_match.group(1)
  
  # Extract Address
  address_match = re.search(r'(?:Address|address)[\.:#\s]*([A-Za-z0-9\s\.,#-]+)', text)
  if address_match:
      extracted_data["address"] = address_match.group(1).strip()
  
  return extracted_data

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)
