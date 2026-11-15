# Smart Farmer Assistance

A beginner-friendly Flask web application prototype for agriculture support.

## Features in this starter version
- Crop suggestions by season and soil type (sample data; not a complete India-wide crop database).
- Weather lookup using Open-Meteo (internet required).
- General fertilizer learning notes (not a substitute for soil testing or local expert advice).
- Farmer crop listings stored in SQLite.
- Crop image upload (stores an image; does not yet run AI pest/disease detection).
- Starter English, Telugu and Hindi interface text.
- Browser text-to-speech and speech recognition where supported.

## Run on Android with Pydroid 3
1. Extract this folder.
2. In Pydroid 3 terminal, install dependencies:
   `pip install -r /storage/emulated/0/Smart_Farmer_Assistance_Web/requirements.txt`
   If that path differs, use the actual extracted folder path.
3. Open `backend/app.py` in Pydroid 3 and run it.
4. Open `http://127.0.0.1:5000` in the phone browser.

If Pydroid cannot find packages, install Flask and requests separately:
`pip install flask requests`

## Important limitations
- Only English, Telugu and Hindi starter translations are included. Other Indian languages need reviewed translations.
- Crop data is a small demonstration dataset, not every crop grown in India.
- Weather needs internet access and valid latitude/longitude.
- Pest photo upload is implemented, but AI diagnosis is not. Do not make pesticide decisions from this prototype.
- This is a learning prototype. Add authentication, privacy protections, moderation and secure deployment before public use.

## GitHub
Upload the complete `Smart_Farmer_Assistance_Web` folder to a new public or private GitHub repository. Do not upload private API keys, personal farmer data or real contact details.
