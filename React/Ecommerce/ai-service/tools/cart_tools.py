from langchain_core.tools import tool
import requests
import json
from config import BACKEND_URL
from services import request_context

    
@tool
def view_cart() -> str:
    """
        Use this tool to fetch the user's cart items.

        Examples:
        - Show my cart
        - What items are in my cart?
        - List my cart items
    """

    token = request_context.current_token

    if not token:
        return "User is not authenticated."

    headers = {
        "Authorization": f"Bearer {token}"
    }

    try:
        response = requests.get(
            f"{BACKEND_URL}/api/cart",
            headers=headers,
        )

        if response.status_code != 200:
            return "Unable to fetch your cart items."

        cart_items = response.json()

        if not cart_items:
            return "Your cart is empty."

        return json.dumps(cart_items)

    except Exception as e:
        return f"Error fetching cart items: {str(e)}"
 
