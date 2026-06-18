import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { FiMinus, FiPlus, FiShoppingBag, FiArrowLeft, FiCheck } from "react-icons/fi";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);

  if (loading) {
    return <p className="text-center text-ink/50 py-20">Loading...</p>;
  }

  if (!product) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="font-display text-xl font-medium text-ink mb-2">
          Product not found
        </h2>
        <Link to="/products" className="text-primary-600 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  function handleAddToCart() {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link
        to="/products"
        className="inline-flex items-center gap-1 text-sm text-ink/50 hover:text-primary-600 mb-6"
      >
        <FiArrowLeft /> Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-primary-50 rounded-2xl overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://placehold.co/500x500/FBF6EF/221F1B?text=Maison";
            }}
          />
        </div>

        <div>
          <span className="text-xs text-primary-600 font-semibold uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-medium text-ink mt-2 mb-3">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-ink mb-4">
            Rs {Number(product.price).toLocaleString("en-PK")}
          </p>
          <p className="text-ink/60 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="text-sm text-green-700 font-medium">
                ✓ In stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-sm text-red-500 font-medium">
                Out of stock
              </span>
            )}
          </div>

          {product.stock > 0 && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-ink/70">Quantity</span>
                <div className="flex items-center border border-ink/15 rounded-full">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2.5 hover:bg-ink/5 rounded-full"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="px-4 text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-2.5 hover:bg-ink/5 rounded-full"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 rounded-full font-medium transition-colors ${
                  added ? "bg-green-700 text-white" : "bg-ink hover:bg-primary-600 text-cream"
                }`}
              >
                {added ? (<><FiCheck /> Added to cart</>) : (<><FiShoppingBag /> Add to cart</>)}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
