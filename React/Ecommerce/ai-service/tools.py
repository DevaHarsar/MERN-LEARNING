from langchain_core.tools import tool
import requests
import json

from config import BACKEND_URL
import services.request_context as request_context


@tool
def check_order_status() -> str:
    """
    Fetch the logged-in user's latest order from the ecommerce backend.
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
    

@tool
def search_products(
    query: str,
    category: str = "",
    min_price: int = 0,
    max_price: int = 0,
) -> str:
    """
    Search products from the ecommerce backend.

    Use this tool when the user asks to find, search, browse, or list products.
    """

    params = {
        "q": query,
        "category": category,
        "limit": 5,
    }

    if min_price:
        params["minPrice"] = min_price

    if max_price:
        params["maxPrice"] = max_price

    try:
        response = requests.get(
            f"{BACKEND_URL}/api/products",
            params=params,
        )

        if response.status_code != 200:
            return "Unable to search products."

        data = response.json()

        products = data.get("products", [])

        if not products:
            return "No matching products found."

        result = []

        for product in products:
            result.append(
                                f"""
                Product ID: {product['_id']}
                Title: {product['title']}
                Price: ₹{product['price']}
                Category: {product['category']}
                Stock: {product['stock']}
                """
            )
            
        return json.dumps({
            "products": products
            })


    except Exception as e:
        return f"Error searching products: {str(e)}"
    
    
@tool
def get_product_details(product_id: str) -> str:
    """
    Get detailed information about a product.
    """

    try:

        response = requests.get(
            f"{BACKEND_URL}/api/products/{product_id}"
        )

        if response.status_code != 200:
            return "Product not found."

        product = response.json()

        return f"""
            Title: {product['title']}

            Description:
            {product['description']}

            Price: ₹{product['price']}

            Stock: {product['stock']}

            Category: {product['category']}
            """

    except Exception as e:
        return str(e)