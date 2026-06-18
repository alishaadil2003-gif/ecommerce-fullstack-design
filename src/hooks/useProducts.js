import { useEffect, useState } from "react";
import { ref, onValue, push, set, update, remove } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = ref(database, "products");

    const unsubscribe = onValue(
      productsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const productList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setProducts(productList);
        } else {
          setProducts([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Create
  async function addProduct(product) {
    const productsRef = ref(database, "products");
    const newRef = push(productsRef);
    await set(newRef, {
      ...product,
      createdAt: Date.now(),
    });
    return newRef.key;
  }

  // Update
  async function updateProduct(id, updates) {
    const productRef = ref(database, `products/${id}`);
    await update(productRef, updates);
  }

  // Delete
  async function deleteProduct(id) {
    const productRef = ref(database, `products/${id}`);
    await remove(productRef);
  }

  return { products, loading, addProduct, updateProduct, deleteProduct };
}
