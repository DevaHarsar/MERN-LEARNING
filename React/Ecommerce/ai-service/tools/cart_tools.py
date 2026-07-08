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
    
@tool
def add_to_cart(product_id, quantity=1) -> str:
    """
        Use this tool to add a product to the user's cart.

        Examples:
        - Add product 123 to my cart
        - Add 2 of product 456 to my cart
    """

    token = request_context.current_token

    if not token:
        return "User is not authenticated."

    headers = {
        "Authorization": f"Bearer {token}"
    }

    payload = {
        "product": product_id,
        "quantity": quantity
    }

    try:
        response = requests.post(
            f"{BACKEND_URL}/api/cart",
            headers=headers,
            json=payload
        )
        print(response.status_code)
        print(response.text)
        print(payload)

        if response.status_code != 200:
            return "Unable to add the product to your cart."

        return f"Product {product_id} added to your cart successfully."

    except Exception as e:
        return f"Error adding product to cart: {str(e)}"
    

@tool
def remove_from_cart(product_id) -> str:
    """
        Use this tool to remove a product from the user's cart.

        Examples:
        - Remove product 123 from my cart
        - Delete product 456 from my cart
    """

    token = request_context.current_token

    if not token:
        return "User is not authenticated."

    headers = {
        "Authorization": f"Bearer {token}"
    }

    try:
        response = requests.delete(
            f"{BACKEND_URL}/api/cart/{product_id}",
            headers=headers,
        )
        

        if response.status_code != 200:
            return "Unable to remove the product from your cart."

        return f"Product {product_id} removed from your cart successfully."

    except Exception as e:
        return f"Error removing product from cart: {str(e)}"
    
@tool
def update_cart_item(product_id, quantity) -> str:  
    
    """
        Use this tool to update the quantity of a product in the user's cart.

        Examples:
        - Update product 123 to quantity 2 in my cart
        - Change product 456 to quantity 5 in my cart
    """

    token = request_context.current_token

    if not token:
        return "User is not authenticated."

    headers = {
        "Authorization": f"Bearer {token}"
    }

    payload = {
        "quantity": quantity
    }

    try:
        response = requests.put(
            f"{BACKEND_URL}/api/cart/{product_id}",
            headers=headers,
            json=payload
        )

        if response.status_code != 200:
            return "Unable to update the product quantity in your cart."

        return f"Product {product_id} quantity updated to {quantity} in your cart successfully."

    except Exception as e:
        return f"Error updating product quantity in cart: {str(e)}"
    
