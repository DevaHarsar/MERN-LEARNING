from langchain_core.tools import tool
from config import BACKEND_URL
import services.request_context as request_context
import requests

@tool
def check_order_status() -> str:
    """
        Use this tool ONLY when the user is asking about
        their own order.

        Examples:
        - Where is my order?
        - Track my order
        - Order status
        - Has my order shipped?
        - Show my latest order

        Do NOT use this tool for product searches.
    """

    token = request_context.current_token

    if not token:
        return "User is not authenticated."

    headers = {
        "Authorization": f"Bearer {token}"
    }

    try:
        response = requests.get(
            f"{BACKEND_URL}/api/orders/myorders",
            headers=headers,
        )

        if response.status_code != 200:
            return "Unable to fetch your orders."

        orders = response.json()

        if not orders:
            return "You don't have any orders."

        latest_order = orders[0]

        return f"""
                Latest Order Details

                Order ID: {latest_order.get("_id")}
                Status: {latest_order.get("orderStatus")}
                Total Amount: ₹{latest_order.get("total")}
                Payment Method: {latest_order.get("paymentMethod")}
                """

    except Exception as e:
        return f"Error fetching order details: {str(e)}"
    
