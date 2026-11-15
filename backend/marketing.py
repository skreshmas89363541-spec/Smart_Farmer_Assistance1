from database import add_listing, get_listings

def create_listing(data):
    required = ["farmer", "crop", "quantity", "price", "location", "contact"]
    if any(not str(data.get(key, "")).strip() for key in required):
        raise ValueError("Please fill all listing fields.")
    quantity = float(data["quantity"])
    price = float(data["price"])
    if quantity <= 0 or price < 0:
        raise ValueError("Quantity must be positive and price cannot be negative.")
    add_listing(data["farmer"], data["crop"], quantity, price, data["location"], data["contact"])

def list_all():
    return get_listings()
