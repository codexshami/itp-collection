import re
from pathlib import Path
from typing import Any

import docx2txt
from pypdf import PdfReader


ACTION_VERBS = {
    "built",
    "developed",
    "designed",
    "implemented",
    "improved",
    "led",
    "optimized",
    "created",
    "managed",
    "delivered",
}

CORE_KEYWORDS = {
    "python",
    "sql",
    "flask",
    "django",
    "aws",
    "docker",
    "git",
    "api",
    "machine learning",
    "data analysis",
}

SECTION_HINTS = {
    "education": {"education", "academic", "qualification"},
    "skills": {"skills", "technical skills", "tech stack"},
    "experience": {"experience", "work experience", "employment", "internship"},
    "projects": {"projects", "project"},
    "certifications": {"certifications", "certificates"},
}


def _read_pdf(file_path: Path) -> str:
    reader = PdfReader(str(file_path))
    all_text = []
    for page in reader.pages:
        all_text.append(page.extract_text() or "")
    return "\n".join(all_text)


def _read_docx(file_path: Path) -> str:
    return docx2txt.process(str(file_path)) or ""


def _read_txt(file_path: Path) -> str:
    return file_path.read_text(encoding="utf-8", errors="ignore")


def extract_resume_text(file_path: Path) -> str:
    suffix = file_path.suffix.lower()
    if suffix == ".pdf":
        return _read_pdf(file_path)
    if suffix == ".docx":
        return _read_docx(file_path)
    if suffix == ".txt":
        return _read_txt(file_path)
    raise ValueError("Only PDF, DOCX and TXT files are supported.")


def _contains_email(text: str) -> bool:
    return bool(re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", text))


def _contains_phone(text: str) -> bool:
    return bool(re.search(r"(\+?\d{1,3}[\s-]?)?(\d[\s-]?){10,13}", text))


def _count_action_verbs(text: str) -> int:
    lower = text.lower()
    return sum(1 for verb in ACTION_VERBS if re.search(rf"\b{re.escape(verb)}\b", lower))


def _keyword_matches(text: str, target_role: str) -> tuple[int, list[str]]:
    lower = text.lower()
    matched = [kw for kw in CORE_KEYWORDS if kw in lower]

    if target_role:
        role_tokens = [token.strip().lower() for token in target_role.split() if token.strip()]
        role_matched = [token for token in role_tokens if token in lower]
        for token in role_matched:
            if token not in matched:
                matched.append(token)

    return len(matched), sorted(matched)


def _detect_sections(text: str) -> dict[str, bool]:
    lower = text.lower()
    found: dict[str, bool] = {}
    for section, words in SECTION_HINTS.items():
        found[section] = any(word in lower for word in words)
    return found


def calculate_ats_score(text: str, target_role: str = "") -> dict[str, Any]:
    clean_text = re.sub(r"\s+", " ", text).strip()
    word_count = len(clean_text.split())

    has_email = _contains_email(clean_text)
    has_phone = _contains_phone(clean_text)
    action_verb_count = _count_action_verbs(clean_text)
    keyword_count, matched_keywords = _keyword_matches(clean_text, target_role)
    section_map = _detect_sections(clean_text)
    section_count = sum(1 for present in section_map.values() if present)

    # Weighted ATS score (out of 100)
    score = 0
    score += min(25, section_count * 5)
    score += 15 if has_email else 0
    score += 15 if has_phone else 0
    score += min(20, keyword_count * 3)
    score += 15 if 250 <= word_count <= 900 else 5
    score += min(10, action_verb_count * 2)

    suggestions = []
    if not has_email:
        suggestions.append("Add a professional email address in the header.")
    if not has_phone:
        suggestions.append("Add a valid phone number for recruiter contact.")
    if section_count < 4:
        suggestions.append("Include clear sections like Skills, Experience, Projects, and Education.")
    if keyword_count < 6:
        suggestions.append("Add role-relevant technical keywords from the job description.")
    if word_count < 250:
        suggestions.append("Resume looks too short. Add project impact and measurable outcomes.")
    if word_count > 900:
        suggestions.append("Resume is too long. Keep it concise and focused on relevant details.")
    if action_verb_count < 3:
        suggestions.append("Use strong action verbs such as Built, Led, Implemented, and Optimized.")

    if not suggestions:
        suggestions.append("Great structure. Tailor keywords for each job posting to boost ATS match.")

    return {
        "ats_score": score,
        "word_count": word_count,
        "section_coverage": section_map,
        "matched_keywords": matched_keywords,
        "suggestions": suggestions,
    }


def analyze_resume_file(file_path: Path, candidate_name: str, email: str, target_role: str) -> dict[str, Any]:
    text = extract_resume_text(file_path)
    if not text.strip():
        raise ValueError("No text could be extracted from the uploaded file.")

    analysis = calculate_ats_score(text=text, target_role=target_role)
    analysis["candidate_name"] = candidate_name
    analysis["provided_email"] = email or "Not provided"
    analysis["target_role"] = target_role or "General"
    return analysis
