from pathlib import Path
from werkzeug.utils import secure_filename
import uuid

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

def save_crop_image(file_storage, upload_folder):
    original = secure_filename(file_storage.filename or "")
    suffix = Path(original).suffix.lower()
    if suffix not in ALLOWED_EXTENSIONS:
        raise ValueError("Please upload a JPG, JPEG, PNG or WEBP image.")
    filename = f"{uuid.uuid4().hex}{suffix}"
    destination = Path(upload_folder) / filename
    file_storage.save(destination)
    return filename
