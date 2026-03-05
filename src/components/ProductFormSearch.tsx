import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { searchProducts } from "../api/products";
import type { Product } from "../types/Product";
import { UIInput } from "./UIInput";
import { ProductCard } from "./ProductCard";
import "./ProductFormSearch.css";
import { useDebounce } from "../hooks/useDebounce";

export const ProductFormSearch = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 500);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setProducts([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchProducts(searchQuery, { limit: 50 });
      setProducts(response.products);
    } catch (err) {
      console.error(err);
      setError("Ошибка при поиске продуктов");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="product-form-search">
      <div className="product-form-search__form">
        <UIInput
          className="product-form-search__input"
          type="text"
          placeholder="Поиск продуктов..."
          value={query}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </div>

      {loading && <div className="product-form-search__loading">Поиск...</div>}

      {error && <div className="product-form-search__error">{error}</div>}

      {products.length > 0 && (
        <div className="product-form-search__list">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="product-form-search__card-link"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && query && !error && (
        <div className="product-form-search__empty">Продукты не найдены</div>
      )}
    </div>
  );
};
