from pathlib import Path
from flask import Flask, jsonify, request, render_template
from crops import get_crops
from fertilizers import get_guidance
from marketing import create_listing, list_all
from weather import get_current_weather
from pest_detection import save_crop_image
from database import init_db

ROOT = Path(__file__).resolve().parent.parent
FRONTEND = ROOT / "frontend"
UPLOADS = ROOT / "uploads"
UPLOADS.mkdir(exist_ok=True)

print("ROOT:", ROOT)
print("APP FILE:", Path(__file__).resolve())
print("ROOT CONTENTS:", [p.name for p in ROOT.iterdir()])
print("FRONTEND:", FRONTEND)
print("FRONTEND EXISTS:", FRONTEND.exists())
print("FRONTEND FILES:", list(FRONTEND.iterdir()) if FRONTEND.exists() else "Folder not found")


app = Flask(
    __name__,
    template_folder=str(FRONTEND),
    static_folder=str(FRONTEND),
    static_url_path="/static"
)

app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024  # 5 MB upload limit

init_db()

@app.route("/")
def home():
    return render_template("index.html")

@app.get("/api/crops")
def crops():
    season = request.args.get("season", "")
    soil = request.args.get("soil", "")
    return jsonify({"season": season, "soil": soil, "crops": get_crops(season, soil)})

@app.get("/api/fertilizers")
def fertilizers():
    crop = request.args.get("crop", "")
    return jsonify({"crop": crop, "guidance": get_guidance(crop)})

@app.route("/api/marketing", methods=["GET", "POST"])
def marketing():
    if request.method == "GET":
        return jsonify({"listings": list_all()})
    data = request.get_json(silent=True) or {}
    try:
        create_listing(data)
        return jsonify({"message": "Listing added"}), 201
    except (ValueError, TypeError) as error:
        return jsonify({"error": str(error)}), 400

@app.get("/api/weather")
def weather():
    try:
        result = get_current_weather(request.args.get("lat"), request.args.get("lon"))
        return jsonify(result)
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except Exception:
        return jsonify({"error": "Weather service is unavailable. Check internet and try again."}), 502

@app.post("/api/pest-upload")
def pest_upload():
    if "image" not in request.files:
        return jsonify({"error": "Choose an image first."}), 400
    image = request.files["image"]
    try:
        filename = save_crop_image(image, UPLOADS)
        symptom = request.form.get("symptom", "unknown")
        return jsonify({
            "message": "Image uploaded",
            "filename": filename,
            "symptom": symptom,
            "diagnosis": None
        }), 201
    except ValueError as error:
        return jsonify({"error": str(error)}), 400

@app.errorhandler(413)
def too_large(_error):
    return jsonify({"error": "Image is too large. Maximum size is 5 MB."}), 413

if __name__ == "__main__":
    # For phone testing, open http://127.0.0.1:5000 in the same phone browser.
    app.run(host="0.0.0.0", port=5000, debug=False)
