# PDF to Voice Converter

This Flask application converts PDF files into MP3 audio files using text-to-speech technology. It allows users to upload a PDF document, extracts the text, and generates an audio file for download.

## Features

- Upload PDF files.
- Extract text from PDF pages.
- Convert extracted text to MP3 using Google Text-to-Speech (gTTS).
- Automatically delete previous MP3 files before saving a new one.
- Provide a user-friendly download experience.

## Requirements

- Python 3.9 or higher
- Flask
- gTTS (Google Text-to-Speech)
- PyPDF2

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. Create and activate a virtual environment:
    python3 -m venv venv
    source venv/bin/activate

3. Install the required packages:
    pip install Flask gtts PyPDF2



## Usage
1. Run the Flask server:
    python3 server.py
2. Open a web browser and go to http://127.0.0.1:5000/
3. Use the upload form to submit a PDF file.
4. Once processed, the MP3 file will automatically download.


## Notes
1. Ensure that your PDF files contain text that can be extracted.
2. The application will delete any previously generated MiniProject.mp3 file upon each upload.

## License
This project is licensed under the MIT License.


