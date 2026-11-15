# Starter interface translations. Add reviewed translations for more Indian languages.
UI_TEXT = {
    "en": {"welcome": "Welcome, Farmer!", "intro": "Find crop, weather and market information."},
    "te": {"welcome": "రైతులకు స్వాగతం!", "intro": "పంటలు, వాతావరణం మరియు మార్కెట్ వివరాలను తెలుసుకోండి."},
    "hi": {"welcome": "किसान आपका स्वागत है!", "intro": "फसल, मौसम और बाजार की जानकारी पाएं।"}
}

def get_text(language):
    return UI_TEXT.get(language, UI_TEXT["en"])
