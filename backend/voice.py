# Voice is handled in the browser by Web Speech APIs.
# This module documents supported language tags for frontend speech features.
VOICE_LANGUAGES = {
    "en": "en-IN",
    "te": "te-IN",
    "hi": "hi-IN"
}

def get_voice_language(language):
    return VOICE_LANGUAGES.get(language, "en-IN")
