import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";
import { getUsers } from "../api";
import type { User } from "../types";
import { UITable, type SortConfig } from "../components/UITable";
import { UIPagination } from "../components/UIPagination";
import { UIInput } from "../components/UIInput";
import { UIButton } from "../components/UIButton";
import "./PageUsers.css";

export const PageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 15;

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig | undefined>();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers({
        skip,
        limit,
        sortBy: sortConfig?.key,
        order: sortConfig?.direction,
      });
      setUsers(data.users);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [skip, search, sortConfig]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = () => {
    setSkip(0);
    setSearch(searchInput);
  };

  const handleSort = (config: SortConfig) => {
    setSortConfig(config);
    setSkip(0);
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      sortable: true,
      render: (user: User) => <span style={{ fontWeight: 500 }}>{user.id}</span>,
    },
    {
      key: "username",
      header: "Username",
      sortable: true,
      render: (user: User) => <Link to={`/users/${user.id}`}>{user.username}</Link>,
    },
    {
      key: "role",
      header: "Роль",
      sortable: true,
      render: (user: User) => <span style={{ textTransform: "capitalize" }}>{user.role}</span>,
    },
  ];

  return (
    <div className="page-users">
      <div className="page-users__header">
        <h1 className="page-users__title">Пользователи</h1>
      </div>

      <div className="page-users__search-form">
        <UIInput
          placeholder="Поиск пользователей..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <UIButton
          variant="primary"
          onClick={handleSearch}
        >
          <Search
            width={16}
            height={16}
            className="ui-button__icon"
          />
          Найти
        </UIButton>
      </div>

      <UITable
        columns={columns}
        data={users}
        keyExtractor={(user) => user.id}
        loading={loading}
        emptyMessage="Пользователи не найдены"
        sortConfig={sortConfig}
        onSortChange={handleSort}
      />

      {!loading && (
        <UIPagination
          skip={skip}
          limit={limit}
          total={total}
          onSkipChange={setSkip}
        />
      )}
    </div>
  );
};
