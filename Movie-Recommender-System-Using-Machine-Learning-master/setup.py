from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as f:
    long_description = f.read()

# Edit these variables
REPO_NAME = "Movie-Recommender-System-Using-Machine-Learning"
AUTHOR_USER_NAME = "entbappy"
PACKAGE_NAME = "src"
AUTHOR_EMAIL = "entbappy73@gmail.com"
VERSION = "0.0.1"
DESCRIPTION = "A small package for Movie Recommender System"

# List of Python dependencies
REQUIREMENTS = [
    "streamlit",
    "requests"
]

setup(
    name=PACKAGE_NAME,
    version=VERSION,
    author=AUTHOR_USER_NAME,
    author_email=AUTHOR_EMAIL,
    description=DESCRIPTION,
    long_description=long_description,
    long_description_content_type="text/markdown",
    url=f"https://github.com/{AUTHOR_USER_NAME}/{REPO_NAME}",
    project_urls={
        "Bug Tracker": f"https://github.com/{AUTHOR_USER_NAME}/{REPO_NAME}/issues",
    },
    packages=find_packages(),
    install_requires=REQUIREMENTS,
    license="MIT",
    python_requires=">=3.7",
)
