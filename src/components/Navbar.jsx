import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiMenu, FiX, FiUser, FiSearch } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartCount } = useCart();
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    setMenuOpen(false);
  }

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <nav className="bg-cream/95 backdrop-blur sticky top-0 z-50 border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-ink shrink-0">
            Maison<span className="text-primary-600">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-ink/70">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-primary-600 transition-colors">Shop</Link>
            {isAdmin && (
              <Link to="/admin" className="hover:text-primary-600 transition-colors">Admin</Link>
            )}
          </div>

          {/* Desktop search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs relative">
            <input
              type="text"
              placeholder="Search products or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-ink/15 rounded-full pl-4 pr-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            />
            <button type="submit" aria-label="Search" className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40">
              <FiSearch size={15} />
            </button>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-4 shrink-0">
            <Link to="/cart" className="relative text-ink hover:text-primary-600 transition-colors" aria-label="Cart">
              <FiShoppingBag size={21} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {currentUser ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-ink/60 flex items-center gap-1">
                  <FiUser size={15} /> {currentUser.displayName || currentUser.email?.split("@")[0]}
                </span>
                <button onClick={handleLogout} className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-ink/70 hover:text-primary-600 transition-colors">
                <FiUser size={16} /> Login
              </Link>
            )}

            <button className="md:hidden text-ink" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-ink/10 pt-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-ink/15 rounded-full pl-4 pr-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
              <button type="submit" aria-label="Search" className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40">
                <FiSearch size={15} />
              </button>
            </form>
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-ink/80 font-medium py-1">Home</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-ink/80 font-medium py-1">Shop</Link>
            {isAdmin && (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="block text-ink/80 font-medium py-1">Admin</Link>
            )}
            {currentUser ? (
              <button onClick={handleLogout} className="block text-primary-600 font-medium py-1">
                Logout ({currentUser.displayName || currentUser.email?.split("@")[0]})
              </button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-primary-600 font-medium py-1">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
