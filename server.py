import pyttsx3
from PyPDF2 import PdfReader
from tkinter.filedialog import askopenfilename

try:
    # Open file selection dialog
    book = askopenfilename()

    # Create PDF reader and get number of pages
    pdfreader = PdfReader(book)
    pages = len(pdfreader.pages)

    # Loop through pages and convert text to speech
    for page in pdfreader.pages:
        text = page.extract_text()
        player = pyttsx3.init()
        player.say(text)
        player.runAndWait()

except Exception as e:
    print(f"An error occurred: {e}")
from flask import Flask, request, send_file, jsonify
import PyPDF2
import pyttsx3
import tempfile
from googletrans import Translator  # Import for language detection (optional)

app = Flask(__name__)

# Function to extract text from PDF
def extract_text_from_pdf(pdf_file):
    reader = PyPDF2.PdfReader(pdf_file)
    text = ''
    for page in reader.pages:
        text += page.extract_text()
    return text

# Function to convert text to audio using pyttsx3
def convert_text_to_audio(text, language='en-US'):
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)  # Adjust speaking rate (optional)
    engine.setProperty('voices', engine.getProperty('voices')[language])  # Set language-specific voice
    engine.say(text)
    audio_data = engine.getBuffer()
    engine.stop()
    engine.runAndWait()
    return audio_data

# Function to detect language (optional)
def detect_language(text):
    translator = Translator()
    detection = translator.detect(text)
    return detection.lang

# Route for handling file upload and conversion
@app.route('/', methods=['GET', 'POST'])
def convert_pdf():
    if request.method == 'POST':
        pdf_file = request.files['pdf_file']
        language = request.form['language']  # Get selected language

        if not pdf_file:
            return 'No PDF file uploaded!', 400

        try:
            # Process PDF and generate audio
            text = extract_text_from_pdf(pdf_file)

            # Optional language detection (uncomment if desired)
            # detected_language = detect_language(text)
            # language = detected_language  # Use detected language for audio generation

            audio_data = convert_text_to_audio(text, language)

            # Generate temporary audio file
            with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as tmp_file:
                tmp_file.write(audio_data)
                audio_filename = tmp_file.name

            # Return download link or success message
            return jsonify({'message': 'Conversion successful!', 'download_link': audio_filename})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return 'OK'  # Simple response for health checks (optional)

if __name__ == '__main__':
    app.run(debug=True)
