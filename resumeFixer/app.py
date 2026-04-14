import os
from pathlib import Path

from flask import Flask, render_template, request
from werkzeug.utils import secure_filename

from resume_analyzer import analyze_resume_file


BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {"pdf", "docx", "txt"}

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = str(UPLOAD_DIR)
app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024  # 5MB


def is_allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template("index.html")

    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    target_role = request.form.get("target_role", "").strip()
    resume_file = request.files.get("resume")

    if not resume_file or resume_file.filename == "":
        return render_template("index.html", error="Please upload a resume file.")

    if not is_allowed_file(resume_file.filename):
        return render_template(
            "index.html",
            error="Unsupported file type. Upload PDF, DOCX, or TXT only.",
        )

    safe_name = secure_filename(resume_file.filename)
    save_path = Path(app.config["UPLOAD_FOLDER"]) / safe_name
    resume_file.save(save_path)

    try:
        analysis = analyze_resume_file(
            file_path=save_path,
            candidate_name=name or "Candidate",
            email=email,
            target_role=target_role,
        )
    except Exception as exc:
        return render_template("index.html", error=f"Could not analyze file: {exc}")
    finally:
        if save_path.exists():
            os.remove(save_path)

    return render_template("index.html", result=analysis)


if __name__ == "__main__":
    app.run(debug=True)
