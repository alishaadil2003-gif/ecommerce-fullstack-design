import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/80 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl text-white font-semibold mb-3">
            Maison<span className="text-primary-500">.</span>
          </h3>
          <p className="text-sm text-cream/50 leading-relaxed">
            Considered essentials, made to be worn often and kept for years.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3 tracking-wide uppercase">Shop</h4>
          <ul className="space-y-2 text-sm text-cream/60">
            <li><Link to="/" className="hover:text-primary-400">Home</Link></li>
            <li><Link to="/products" className="hover:text-primary-400">All Products</Link></li>
            <li><Link to="/cart" className="hover:text-primary-400">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3 tracking-wide uppercase">Categories</h4>
          <ul className="space-y-2 text-sm text-cream/60">
            <li>Shirts</li>
            <li>Jackets</li>
            <li>Accessories</li>
            <li>Footwear</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3 tracking-wide uppercase">Follow</h4>
          <div className="flex gap-4 text-lg text-cream/60">
            <FiInstagram className="hover:text-primary-400 cursor-pointer" />
            <FiFacebook className="hover:text-primary-400 cursor-pointer" />
            <FiTwitter className="hover:text-primary-400 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs py-5 text-cream/40">
        © 2026 Maison. Built as an internship full-stack project.
      </div>
    </footer>
  );
}
