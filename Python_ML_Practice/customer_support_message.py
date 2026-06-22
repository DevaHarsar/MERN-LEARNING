from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
import os



class CustomerSupportMessage(BaseModel):
    name: str = Field(min_length=1)
    email: str = Field(min_length=1)
    order_id: str = Field(min_length=1)
    issue_type: str = Field(min_length=1)
    


groq_api_key = os.getenv("api_key")
    
# customer = CustomerSupportMessage(
#     name="John Doe",    
#     email="john@gmail.com",
#     order_id=12345,
#     issue_type="Product not received"
# )


# llm = ChatGoogleGenerativeAI(
    
#     model="gemini-2.5-flash",
#     api_key=API_KEY_Gemini,
#     temperature=0.7,
#     max_output_tokens=500
# )


llm = ChatGroq(
    api_key=groq_api_key,
    model="llama-3.1-8b-instant"
)

prompt = PromptTemplate(
    input_variables=["text"],
    template="""
Extract the following fields from the customer support message:

- name
- email
- order_id
- issue_type

Rules:
1. Do NOT guess values.
2. Do NOT infer missing values.
3. If information is not explicitly present, return "NOT_FOUND".
4. Extract only information written in the text.

Customer Message:
{text}
"""
)

structured_llm = llm.with_structured_output(
    CustomerSupportMessage
)


customer_message = """
Hi team,

My name is Rahul Sharma.
I placed an order yesterday but the payment failed.

Order ID is ORD-45678



My email is rahul.sharma@gmail.com.

Please help resolve this issue as soon as possible.

Thanks
Rahul
"""


formatted_prompt = prompt.format(
    text=customer_message
)

result = structured_llm.invoke(
    formatted_prompt
)


print(result)

print(result.model_dump())

print(result.model_dump_json(indent=4))




# print(customer)
    