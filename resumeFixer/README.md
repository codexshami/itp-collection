# ResumeFixer

ResumeFixer is a Flask-based ATS resume analyzer.

## Features

- Accepts resume upload in PDF, DOCX, and TXT formats
- Collects user details (name, email, target role)
- Extracts resume text and computes ATS score
- Highlights detected sections and matched keywords
- Suggests practical improvements

## Run locally

1. Create and activate virtual environment
2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Start the server:

   ```bash
   python app.py
   ```

4. Open:
   [http://127.0.0.1:5000](http://127.0.0.1:5000)
