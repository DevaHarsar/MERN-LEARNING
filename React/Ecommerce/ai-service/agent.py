from langgraph.prebuilt import create_react_agent

from services.llm_service import llm
from prompts import SYSTEM_PROMPT
from tools import *


agent = create_react_agent(
    model=llm,
    tools=[check_order_status, get_product_details,search_products, view_cart, rag_search],
    prompt=SYSTEM_PROMPT,
)