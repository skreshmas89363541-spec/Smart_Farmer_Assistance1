import requests

def get_current_weather(latitude, longitude):
    try:
        lat, lon = float(latitude), float(longitude)
    except (TypeError, ValueError):
        raise ValueError("Latitude and longitude must be numbers.")
    if not (-90 <= lat <= 90 and -180 <= lon <= 180):
        raise ValueError("Coordinates are outside valid ranges.")

    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": "temperature_2m,precipitation,wind_speed_10m",
        "hourly": "precipitation_probability",
        "forecast_days": 1
    }
    response = requests.get(url, params=params, timeout=15)
    response.raise_for_status()
    result = response.json()
    current = result.get("current", {})
    hourly = result.get("hourly", {})
    probabilities = hourly.get("precipitation_probability", [])
    return {
        "temperature": current.get("temperature_2m", "N/A"),
        "wind_speed": current.get("wind_speed_10m", "N/A"),
        "precipitation_probability": probabilities[0] if probabilities else "N/A"
    }
