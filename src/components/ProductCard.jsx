import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  function handleAddToCart(e) {
    e.preventDefault();
    addToCart(product, 1);
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-2xl border border-ink/8 overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-square bg-primary-50 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x400/FBF6EF/221F1B?text=Maison";
          }}
        />
        {product.stock <= 0 && (
          <span className="absolute top-3 left-3 bg-ink text-cream text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full">
            Sold out
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] text-primary-600 font-semibold uppercase tracking-wide mb-1">
          {product.category}
        </span>
        <h3 className="font-display text-base font-medium text-ink mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-base font-semibold text-ink">
            Rs {Number(product.price).toLocaleString("en-PK")}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="bg-ink hover:bg-primary-600 disabled:bg-ink/20 disabled:cursor-not-allowed text-cream p-2.5 rounded-full transition-colors"
            title={product.stock <= 0 ? "Out of stock" : "Add to cart"}
          >
            <FiShoppingBag size={15} />
          </button>
        </div>
      </div>
    </Link>
  );
}
