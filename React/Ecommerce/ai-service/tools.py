from langchain_core.tools import tool
import requests
import json
import re

from config import BACKEND_URL
import services.request_context as request_context

CATEGORY_SYNONYMS = {
    "mobile": "smartphones",
    "mobiles": "smartphones",
    "phone": "smartphones",
    "phones": "smartphones",
    "cell phone": "smartphones",
    "cellphone": "smartphones",

    "tv": "television",
    "television": "television",
    "smart tv": "television",

    "earbuds": "headphones",
    "earphones": "headphones",
    "headset": "headphones",

    "notebook": "laptop",
}

def normalize_query(query: str) -> str:
    query = query.lower().strip()

    for old, new in CATEGORY_SYNONYMS.items():
        query = re.sub(rf"\b{re.escape(old)}\b", new, query)

    words = query.split()
    unique_words = []

    for word in words:
        if word not in unique_words:
            unique_words.append(word)

    return " ".join(unique_words)

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
    

@tool
def search_products(
    query: str = "",
    category: str = "",
    brand: str = "",
    min_price: int = 0,
    max_price: int = 0,
    min_rating: float = 0.0,
    sort: str = "",
) -> str:
    """
        Search products from the ecommerce backend.

        Use this tool whenever the user wants to search, find, browse,
        list, recommend, compare, or filter products.

        Use this tool for requests such as:
        - Show me smartphones
        - Find gaming laptops
        - Show men's clothing
        - Recommend headphones
        - Apple products
        - Samsung mobiles
        - Formal shirts
        - Best cameras
        - Electronics under ₹50000
        - Shoes above ₹3000

        Arguments:

        query:
        Pass ONLY the product name, brand, model, or search keywords.

        Do NOT include:
        - price information
        - words like "under", "below", "above", "less than"
        - category filters
        - unnecessary words such as "show me", "find", "recommend"

        Examples:

        User:
        Show smartphones under ₹50000

        Call:
        query="smartphones"
        max_price=50000

        ----------------------

        User:
        Find Samsung mobiles

        Call:
        query="Samsung mobile"

        ----------------------

        User:
        Gaming laptop below ₹70000

        Call:
        query="gaming laptop"
        max_price=70000

        ----------------------

        User:
        Apple products above ₹50000

        Call:
        query="Apple"
        min_price=50000

        ----------------------

        User:
        Formal shirts

        Call:
        query="formal shirt"

        category:
        Use only if the user explicitly mentions a category.

        Examples:

        User:
        Show men's clothing

        category="Men's Clothing"

        User:
        Show cameras

        category="Cameras"

        min_price:
        Use only when the user specifies a minimum price.

        max_price:
        Use only when the user specifies a maximum price.

        If search_products returns an empty products array:

        - Do not invent products.
        - Inform the user that no matching products were found.
        - Mention the search query.
        - Suggest trying another keyword, category, or brand.

        Never use this tool for:
        - order status
        - tracking orders
        - payment status
        - shipping status
        - customer support questions

        brand:
        Use when the user specifies a brand.

        Examples:

        User:
        Samsung phones

        brand="Samsung"

        ----------------

        User:
        Apple products

        brand="Apple"

        min_rating:
        Use when the user specifies a minimum rating.

        Example:

        User:
        Laptops rated above 4.5

        min_rating=4.5

        sort:
        Use these values:

        price_asc
        price_desc
        newest
        rating_desc

        Examples:

        User:
        Cheapest phones

        sort="price_asc"

        User:
        Most expensive TV

        sort="price_desc"

        User:
        Best laptops

        sort="rating_desc"

        User:
        Newest phones

        sort="newest"
"""


    query = normalize_query(query)
    print("===== SEARCH TOOL =====")
    print("Query:", query)
    print("Category:", category)
    print("Brand:", brand)
    print("Min Price:", min_price)
    print("Max Price:", max_price)
    print("Min Rating:", min_rating)
    print("Sort:", sort)
    
    params = {
    "q": query,
    "category": category,
    "limit": 5,
}

    if brand:
        params["brand"] = brand

    if min_price:
        params["minPrice"] = min_price

    if max_price:
        params["maxPrice"] = max_price

    if min_rating:
        params["minRating"] = min_rating

    if sort:
        params["sort"] = sort

    try:
        response = requests.get(
            f"{BACKEND_URL}/api/products",
            params=params,
        )

        if response.status_code != 200:
            return json.dumps({
                "products": [],
                "message": "Unable to search products."
            })

        data = response.json()

        products = data.get("products", [])
        
        if not products:
            return json.dumps({
                "products": [],
                "query": query,
                "message": f"No products found for '{query}'."
            })

        print("Products Found:", len(products))

        return json.dumps({
            "products": products,
            "message": "Products fetched successfully."
        })

    except Exception as e:
        return json.dumps({
            "products": [],
            "message": str(e)
        })
    
@tool
def get_product_details(product_id: str) -> str:
    """
    Get detailed information about one specific product.

    Use this tool only if the user is asking about
    a particular product.

    Examples:
    - Tell me about iPhone 16
    - Show details of Dell Inspiron
    - Product information for Samsung Galaxy S24

    Do NOT use this tool for product searches.
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