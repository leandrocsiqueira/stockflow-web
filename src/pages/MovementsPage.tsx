import { useEffect, useState } from "react";
import {
  getMovements,
  type MovementFilters,
} from "../services/movementService";
import type {
  MovementType,
  StockMovement,
} from "../types/StockMovement";

function MovementsPage() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [type, setType] = useState<MovementType | "">("");

  useEffect(() => {
    async function loadMovements() {
      try {
        setLoading(true);
        setError(null);

        const filters: MovementFilters = {
          page,
          size: 10,
        };

        if (type) {
          filters.type = type;
        }

        const data = await getMovements(filters);

        setMovements(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      }
      catch {
        setError("Unable to load stock movements.");
      }
      finally {
        setLoading(false);
      }
    }

    void loadMovements();
  }, [page, type]);

  function handleTypeChange(value: string) {
    setType(value as MovementType | "");
    setPage(0);
  }

  function formatDate(value: string) {
    return new Date(value).toLocaleString();
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Movements</h1>
          <p>View stock movement history.</p>
        </div>
      </div>

      <div className="movement-filters">
        <div className="form-field movement-type-filter">
          <label htmlFor="movement-type">
            Movement type
          </label>

          <select
            id="movement-type"
            value={type}
            onChange={(event) => handleTypeChange(event.target.value)}
          >
            <option value="">All</option>
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="status-message">
          Loading movements...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && movements.length === 0 && (
        <div className="status-message">
          No stock movements found.
        </div>
      )}

      {!loading && !error && movements.length > 0 && (
        <>
          <p className="movement-summary">
            {totalElements}
            {" "}
            movement
            {totalElements !== 1 ? "s" : ""}
            {" "}
            found.
          </p>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>SKU</th>
                  <th>Product</th>
                  <th>Warehouse</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Reason</th>
                  <th>Reference</th>
                </tr>
              </thead>

              <tbody>
                {movements.map((movement) => (
                  <tr key={movement.id}>
                    <td>{formatDate(movement.occurredAt)}</td>
                    <td>{movement.productSku}</td>
                    <td>{movement.productName}</td>
                    <td>{movement.warehouseName}</td>
                    <td>
                      <span
                        className={`movement-type movement-type-${movement.type.toLowerCase()}`}
                      >
                        {movement.type}
                      </span>
                    </td>
                    <td>{movement.quantity}</td>
                    <td>{movement.reason ?? "-"}</td>
                    <td>{movement.reference ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              className="secondary-button"
              type="button"
              disabled={page === 0}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </button>

            <span className="pagination-info">
              Page
              {" "}
              {page + 1}
              {" "}
              of
              {" "}
              {totalPages}
            </span>

            <button
              className="secondary-button"
              type="button"
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MovementsPage;
