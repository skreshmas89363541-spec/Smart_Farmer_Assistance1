FERTILIZER_GUIDANCE = {
    "Rice": "Use a soil-test-based nutrient plan. Nitrogen is commonly split across crop growth stages; phosphorus and potassium depend on soil test and local recommendations.",
    "Wheat": "Use soil-test-based N-P-K recommendations. Apply nutrients at the recommended stages for your local variety and soil.",
    "Cotton": "Balanced nutrition is important. Base nitrogen, phosphorus, potassium and micronutrients on soil testing and local agriculture department guidance.",
    "Groundnut": "Groundnut may need phosphorus, calcium and sulphur depending on soil conditions. Use tested recommendations for your district.",
    "Chilli": "Use balanced nutrients and organic matter. Avoid excess nitrogen; follow soil-test results and local horticulture guidance.",
    "Maize": "Apply nutrients according to soil test and split nitrogen as advised for the crop stage."
}

def get_guidance(crop):
    return FERTILIZER_GUIDANCE.get(crop, "Please obtain a soil test and ask your local agriculture officer for crop-specific fertilizer recommendations.")
