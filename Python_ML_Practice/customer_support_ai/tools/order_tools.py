import json
from langchain_core.tools import tool


@tool
def check_order_status(order_id: str):
    """
    Check customer order status using order ID.
    """

    with open("data/orders.json", "r") as file:
        orders = json.load(file)

    if order_id not in orders:
        return "Invalid Order ID."

    order = orders[order_id]

    return (
        f"Order ID: {order_id}\n"
        f"Customer: {order['customer_name']}\n"
        f"Status: {order['status']}\n"
        f"Expected Delivery: {order['expected_delivery']}"
    )