import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import { getProducts } from "../services/productService";
import type { Product } from "../types/Product";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts();

        setProducts(data);
      }
      catch {
        setError("Unable to load products.");
      }
      finally {
        setLoading(false);
      }
    }

    void loadProducts();
  }, []);

  function handleProductCreated(product: Product) {
    setProducts((current) => [...current, product]);
    setShowForm(false);
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage products registered in StockFlow.</p>
        </div>

        {!showForm && (
          <button
            className="primary-button"
            type="button"
            onClick={() => setShowForm(true)}
          >
            New Product
          </button>
        )}
      </div>

      {showForm && (
        <ProductForm
          onCreated={handleProductCreated}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading && (
        <div className="status-message">
          Loading products...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="status-message">
          No products found.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>SKU</th>
                <th>Name</th>
                <th>Unit</th>
                <th>Minimum Stock</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.sku}</td>
                  <td>{product.name}</td>
                  <td>{product.unit}</td>
                  <td>{product.minimumStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
