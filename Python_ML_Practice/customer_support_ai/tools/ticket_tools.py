import json
import uuid

from langchain_core.tools import tool

from utils.logger import logger


@tool
def create_ticket(issue: str):
    """
    Create a support ticket.
    """
    logger.info(f"Creating Ticket : {issue}")

    with open("data/tickets.json","r") as file:
        tickets = json.load(file)

    ticket = {
        "ticket_id": str(uuid.uuid4())[:8],
        "issue": issue
    }

    tickets.append(ticket)

    with open("data/tickets.json","w") as file:
        json.dump(tickets,file,indent=4)

    return f"Ticket Created Successfully.\nTicket ID: {ticket['ticket_id']}"