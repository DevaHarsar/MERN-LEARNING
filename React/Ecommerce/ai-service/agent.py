from langgraph.prebuilt import create_react_agent

from services.llm_service import llm
from tools import check_order_status, get_product_details, search_products
from prompts import SYSTEM_PROMPT


agent = create_react_agent(
    model=llm,
    tools=[check_order_status, get_product_details,search_products],
    prompt=SYSTEM_PROMPT,
)