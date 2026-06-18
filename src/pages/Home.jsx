import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";

export default function Home() {
  const { products, loading } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const fallback = featured.length > 0 ? featured : products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-primary-600 font-semibold uppercase text-xs tracking-[0.2em] mb-4">
              Season 04 — Now Live
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-medium text-ink leading-[1.05] mb-5">
              Clothes built to <br />
              <span className="italic text-primary-600">outlast the trend.</span>
            </h1>
            <p className="text-ink/60 mb-8 max-w-md leading-relaxed">
              Considered fabrics, honest pricing, and pieces you'll still
              reach for next year. No noise, just good clothing.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-ink hover:bg-primary-600 text-cream px-7 py-3.5 rounded-full font-medium transition-colors"
            >
              Shop the collection <FiArrowRight />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80"
                alt="Maison collection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg px-5 py-4 hidden sm:block">
              <p className="font-display text-2xl font-semibold text-ink">12+</p>
              <p className="text-xs text-ink/50">Curated essentials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-ink/8">
          <FiTruck className="text-primary-600 text-2xl shrink-0" />
          <div>
            <h4 className="font-semibold text-sm text-ink">Free shipping</h4>
            <p className="text-xs text-ink/50">On orders over Rs 5,000</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-ink/8">
          <FiShield className="text-primary-600 text-2xl shrink-0" />
          <div>
            <h4 className="font-semibold text-sm text-ink">Secure checkout</h4>
            <p className="text-xs text-ink/50">Encrypted & protected</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-ink/8">
          <FiRefreshCw className="text-primary-600 text-2xl shrink-0" />
          <div>
            <h4 className="font-semibold text-sm text-ink">Easy returns</h4>
            <p className="text-xs text-ink/50">30-day return window</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-ink">Featured pieces</h2>
          <Link
            to="/products"
            className="text-primary-600 font-medium text-sm flex items-center gap-1 hover:underline"
          >
            View all <FiArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-ink/50 py-10">Loading products...</p>
        ) : fallback.length === 0 ? (
          <p className="text-center text-ink/50 py-10">
            No products yet. Add some from the Admin panel!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {fallback.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
