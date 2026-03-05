import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { searchUsers } from "../api/users";
import type { User } from "../types/User";
import { UIInput } from "./UIInput";
import { UserCard } from "./UserCard";
import "./UserFormSearch.css";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const UserFormSearch = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 500);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setUsers([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchUsers(searchQuery, { limit: 50 });
      setUsers(response.users);
    } catch {
      setError("Ошибка при поиске пользователей");
      setUsers([]);
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
    <div className="user-form-search">
      <div className="user-form-search__form">
        <UIInput
          className="user-form-search__input"
          type="text"
          placeholder="Поиск пользователей..."
          value={query}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </div>

      {loading && <div className="user-form-search__loading">Поиск...</div>}

      {error && <div className="user-form-search__error">{error}</div>}

      {users.length > 0 && (
        <div className="user-form-search__list">
          {users.map((user) => (
            <Link
              key={user.id}
              to={`/users/${user.id}`}
              className="user-form-search__card-link"
            >
              <UserCard user={user} />
            </Link>
          ))}
        </div>
      )}

      {!loading && users.length === 0 && query && !error && (
        <div className="user-form-search__empty">Пользователи не найдены</div>
      )}
    </div>
  );
};
