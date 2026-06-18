import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { sampleProducts } from "../utils/sampleData";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiDatabase } from "react-icons/fi";

const EMPTY_FORM = {
  name: "",
  price: "",
  image: "",
  description: "",
  category: "",
  stock: "",
  featured: false,
};

export default function AdminPanel() {
  const { products, loading, addProduct, updateProduct, deleteProduct } =
    useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [seeding, setSeeding] = useState(false);

  async function handleSeedData() {
    if (
      !window.confirm(
        `Add ${sampleProducts.length} sample products to the database?`
      )
    )
      return;
    setSeeding(true);
    try {
      for (const product of sampleProducts) {
        await addProduct(product);
      }
    } catch (err) {
      alert("Error seeding data: " + err.message);
    } finally {
      setSeeding(false);
    }
  }

  function openAddForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(product) {
    setForm({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock,
      featured: !!product.featured,
    });
    setEditingId(product.id);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const productData = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
        featured: !!form.featured,
      };

      if (editingId) {
        await updateProduct(editingId, productData);
      } else {
        await addProduct(productData);
      }
      closeForm();
    } catch (err) {
      alert("Error saving product: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id, name) {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      await deleteProduct(id);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-medium text-ink">
          Admin panel
        </h1>
        <div className="flex gap-2">
          {products.length === 0 && (
            <button
              onClick={handleSeedData}
              disabled={seeding}
              className="flex items-center gap-2 bg-white border border-ink/15 hover:bg-ink/5 text-ink px-4 py-2.5 rounded-full font-medium text-sm transition-colors"
            >
              <FiDatabase size={15} /> {seeding ? "Seeding..." : "Seed sample data"}
            </button>
          )}
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 bg-ink hover:bg-primary-600 text-cream px-4 py-2.5 rounded-full font-medium text-sm transition-colors"
          >
            <FiPlus size={15} /> Add product
          </button>
        </div>
      </div>

      {/* Add/Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-medium text-ink">
                {editingId ? "Edit product" : "Add new product"}
              </h2>
              <button onClick={closeForm} className="text-ink/40 hover:text-ink">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Product name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Price (Rs)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
                className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
              <input
                type="number"
                placeholder="Stock quantity"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                required
                className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                rows={3}
                className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
              <label className="flex items-center gap-2 text-sm text-ink/70">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded border-ink/30"
                />
                Show on homepage as featured
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-ink hover:bg-primary-600 disabled:bg-ink/30 text-cream py-2.5 rounded-full font-medium transition-colors"
              >
                {submitting
                  ? "Saving..."
                  : editingId
                  ? "Update product"
                  : "Add product"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Products table */}
      {loading ? (
        <p className="text-center text-ink/50 py-10">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-ink/50 py-10">
          No products yet. Click "Add product" or "Seed sample data" to get started.
        </p>
      ) : (
        <div className="bg-white rounded-2xl border border-ink/8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/8 text-left text-ink/45">
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-ink/5">
                  <td className="px-4 py-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-primary-50"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/50x50/FBF6EF/221F1B?text=M";
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-ink">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-ink/50">{product.category}</td>
                  <td className="px-4 py-3 font-medium text-ink">
                    Rs {Number(product.price).toLocaleString("en-PK")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        product.stock > 0 ? "text-green-700" : "text-red-500"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditForm(product)}
                        className="text-primary-600 hover:text-primary-700 p-1.5"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="text-red-500 hover:text-red-700 p-1.5"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
