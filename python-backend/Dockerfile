FROM python:3.10-slim

# Install Tesseract OCR and required dependencies
RUN apt-get update && apt-get install -y \
  tesseract-ocr \
  libtesseract-dev \
  poppler-utils \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]

