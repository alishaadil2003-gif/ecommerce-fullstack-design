import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const FREE_SHIP_THRESHOLD = 5000;
  const SHIP_COST = 250;

  function handleCheckout() {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    alert("Checkout successful! (Demo only — no real payment processed)");
    clearCart();
    navigate("/");
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <FiShoppingBag size={48} className="mx-auto text-ink/20 mb-4" />
        <h2 className="font-display text-xl font-medium text-ink mb-2">
          Your cart is empty
        </h2>
        <p className="text-ink/50 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          className="inline-block bg-ink hover:bg-primary-600 text-cream px-6 py-3 rounded-full font-medium transition-colors"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display text-2xl md:text-3xl font-medium text-ink mb-6">
        Your cart
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white border border-ink/8 rounded-2xl p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl flex-shrink-0 bg-primary-50"
                onError={(e) => {
                  e.target.src = "https://placehold.co/100x100/FBF6EF/221F1B?text=M";
                }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-ink truncate">{item.name}</h3>
                <p className="text-sm text-ink/45">{item.category}</p>
                <p className="font-semibold text-ink mt-1">
                  Rs {Number(item.price).toLocaleString("en-PK")}
                </p>
              </div>
              <div className="flex items-center border border-ink/15 rounded-full">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-ink/5 rounded-full"
                >
                  <FiMinus size={12} />
                </button>
                <span className="px-3 text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-ink/5 rounded-full"
                >
                  <FiPlus size={12} />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 p-2"
                aria-label="Remove item"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white border border-ink/8 rounded-2xl p-6 h-fit">
          <h3 className="font-display font-medium text-lg mb-4 text-ink">Order summary</h3>
          <div className="flex justify-between text-sm text-ink/60 mb-2">
            <span>Subtotal</span>
            <span>Rs {cartTotal.toLocaleString("en-PK")}</span>
          </div>
          <div className="flex justify-between text-sm text-ink/60 mb-2">
            <span>Shipping</span>
            <span>{cartTotal > FREE_SHIP_THRESHOLD ? "Free" : `Rs ${SHIP_COST}`}</span>
          </div>
          <div className="border-t border-ink/10 my-3"></div>
          <div className="flex justify-between font-semibold text-lg mb-6 text-ink">
            <span>Total</span>
            <span>
              Rs {(cartTotal > FREE_SHIP_THRESHOLD ? cartTotal : cartTotal + SHIP_COST).toLocaleString("en-PK")}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-ink hover:bg-primary-600 text-cream py-3.5 rounded-full font-medium transition-colors"
          >
            Proceed to checkout
          </button>
          {!currentUser && (
            <p className="text-xs text-ink/45 text-center mt-3">
              You'll need to log in to complete checkout.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
