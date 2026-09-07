import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";
import { ApiException } from "../services/api";
import { createProduct } from "../services/productService";
import type {
  Product,
  ProductRequest,
} from "../types/Product";

interface ProductFormProps {
  onCreated: (product: Product) => void;
  onCancel: () => void;
}

interface ProductFormState {
  sku: string;
  name: string;
  unit: string;
  minimumStock: string;
}

type ProductFormErrors = Partial<
  Record<keyof ProductRequest, string>
>;

const initialForm: ProductFormState = {
  sku: "",
  name: "",
  unit: "",
  minimumStock: "0",
};

function ProductForm({
  onCreated,
  onCancel,
}: ProductFormProps) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(
    null,
  );
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function validate(): ProductFormErrors {
    const validationErrors: ProductFormErrors = {};

    if (!form.sku.trim()) {
      validationErrors.sku = "SKU is required.";
    }

    if (!form.name.trim()) {
      validationErrors.name = "Name is required.";
    }

    if (!form.unit.trim()) {
      validationErrors.unit = "Unit is required.";
    }

    const minimumStock = Number(form.minimumStock);

    if (
      form.minimumStock.trim() === ""
      || Number.isNaN(minimumStock)
      || minimumStock < 0
    ) {
      validationErrors.minimumStock
        = "Minimum stock must be zero or greater.";
    }

    return validationErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSubmitting(true);
      setErrors({});
      setSubmitError(null);

      const product = await createProduct({
        sku: form.sku.trim(),
        name: form.name.trim(),
        unit: form.unit.trim(),
        minimumStock: Number(form.minimumStock),
      });

      onCreated(product);
    }
    catch (error) {
      if (error instanceof ApiException) {
        if (error.details.length > 0) {
          const apiErrors: ProductFormErrors = {};

          error.details.forEach((detail) => {
            const field = detail.field as keyof ProductRequest;
            apiErrors[field] = detail.message;
          });

          setErrors(apiErrors);
        }
        else {
          setSubmitError(error.message);
        }
      }
      else {
        setSubmitError("Unable to create product.");
      }
    }
    finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-card">
      <div className="form-card-header">
        <div>
          <h2>New Product</h2>
          <p>Register a new product in the inventory catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="sku">SKU</label>

            <input
              id="sku"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              placeholder="SKU-001"
            />

            {errors.sku && (
              <span className="field-error">
                {errors.sku}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product name"
            />

            {errors.name && (
              <span className="field-error">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="unit">Unit</label>

            <input
              id="unit"
              name="unit"
              value={form.unit}
              onChange={handleChange}
              placeholder="UNIT"
            />

            {errors.unit && (
              <span className="field-error">
                {errors.unit}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="minimumStock">
              Minimum Stock
            </label>

            <input
              id="minimumStock"
              name="minimumStock"
              type="number"
              min="0"
              value={form.minimumStock}
              onChange={handleChange}
            />

            {errors.minimumStock && (
              <span className="field-error">
                {errors.minimumStock}
              </span>
            )}
          </div>
        </div>

        {submitError && (
          <div className="form-error">
            {submitError}
          </div>
        )}

        <div className="form-actions">
          <button
            className="secondary-button"
            type="button"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </button>

          <button
            className="primary-button"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
