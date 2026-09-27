from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid
import datetime

app = FastAPI(title="Maison Payment API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", 
                   "https://ecommerce-fullstack-design-seven-phi.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CartItem(BaseModel):
    id: str
    name: str
    price: float
    quantity: int
    category: str

class CheckoutRequest(BaseModel):
    user_email: str
    cart_items: List[CartItem]
    total_amount: float
    shipping_address: str

orders_db = {}

@app.get("/")
def root():
    return {"message": "Maison Payment API is running", "version": "1.0.0"}

@app.post("/checkout")
def checkout(request: CheckoutRequest):
    if not request.cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    if request.total_amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid total amount")

    order_id = str(uuid.uuid4())[:8].upper()

    orders_db[order_id] = {
        "order_id": order_id,
        "user_email": request.user_email,
        "cart_items": [item.dict() for item in request.cart_items],
        "total_amount": request.total_amount,
        "shipping_address": request.shipping_address,
        "status": "confirmed",
        "created_at": datetime.datetime.now().isoformat(),
    }

    return {
        "success": True,
        "order_id": order_id,
        "message": f"Order {order_id} placed successfully!",
        "total_amount": request.total_amount,
        "status": "confirmed",
        "estimated_delivery": "3-5 business days",
    }

@app.get("/payment-status/{order_id}")
def payment_status(order_id: str):
    order = orders_db.get(order_id.upper())
    if not order:
        raise HTTPException(status_code=404, detail=f"Order {order_id} not found")
    return {
        "order_id": order["order_id"],
        "status": order["status"],
        "total_amount": order["total_amount"],
        "user_email": order["user_email"],
        "created_at": order["created_at"],
        "items_count": len(order["cart_items"]),
    }

@app.get("/orders")
def get_all_orders():
    return {"orders": list(orders_db.values()), "total": len(orders_db)}