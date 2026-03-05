import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { getCartsByUserId } from "../api/carts";
import type { Cart } from "../types";
import { UIInput } from "./UIInput";
import { UICard, UICardContent, UICardHeader, UICardTitle } from "./UICard";
import "./CartFormSearch.css";
import { useDebounce } from "../hooks/useDebounce";

interface CartFormSearchProps {
  userId?: number;
}

export const CartFormSearch = ({ userId }: CartFormSearchProps) => {
  const [query, setQuery] = useState("");
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 500);

  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setCarts([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const searchUserId = userId || Number(searchQuery);
        if (isNaN(searchUserId)) {
          setCarts([]);
          setError("Введите корректный ID пользователя");
          return;
        }
        const response = await getCartsByUserId(searchUserId, { limit: 50 });
        setCarts(response.carts);
      } catch {
        setError("Ошибка при поиске корзин");
        setCarts([]);
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="cart-form-search">
      <div className="cart-form-search__form">
        <UIInput
          className="cart-form-search__input"
          type="text"
          placeholder="Поиск корзин по ID пользователя..."
          value={query}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </div>

      {loading && <div className="cart-form-search__loading">Поиск...</div>}

      {error && <div className="cart-form-search__error">{error}</div>}

      {carts.length > 0 && (
        <div className="cart-form-search__list">
          {carts.map((cart) => (
            <Link
              key={cart.id}
              to={`/carts/${cart.id}`}
              className="cart-form-search__card-link"
            >
              <UICard>
                <UICardHeader>
                  <UICardTitle>Корзина #{cart.id}</UICardTitle>
                </UICardHeader>

                <UICardContent>
                  <div className="cart-form-search__info">
                    <span>Пользователь: {cart.userId}</span>
                    <span>Товаров: {cart.totalProducts}</span>
                    <span>Сумма: ${cart.total.toFixed(2)}</span>
                  </div>
                </UICardContent>
              </UICard>
            </Link>
          ))}
        </div>
      )}

      {!loading && carts.length === 0 && query && !error && (
        <div className="cart-form-search__empty">Корзины не найдены</div>
      )}
    </div>
  );
};
