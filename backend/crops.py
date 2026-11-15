CROP_DATA = {
    "Kharif": {
        "Black": ["Cotton", "Soybean", "Pigeon pea"],
        "Red": ["Groundnut", "Finger millet", "Pigeon pea"],
        "Sandy": ["Pearl millet", "Groundnut"],
        "Alluvial": ["Rice", "Maize", "Jute"],
        "Clay": ["Rice", "Sugarcane"]
    },
    "Rabi": {
        "Black": ["Wheat", "Chickpea", "Safflower"],
        "Red": ["Chickpea", "Lentil", "Safflower"],
        "Sandy": ["Mustard", "Barley"],
        "Alluvial": ["Wheat", "Peas", "Mustard"],
        "Clay": ["Wheat", "Lentil"]
    },
    "Zaid": {
        "Black": ["Sesame", "Sunflower"],
        "Red": ["Groundnut", "Green gram"],
        "Sandy": ["Watermelon", "Muskmelon", "Cucumber"],
        "Alluvial": ["Cucumber", "Watermelon", "Vegetables"],
        "Clay": ["Summer rice (where suitable)"]
    }
}

def get_crops(season, soil):
    return CROP_DATA.get(season, {}).get(soil, [])
