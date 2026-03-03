import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";
import { getUsers } from "../api";
import type { User } from "../types";
import { UITable } from "../components/UITable";
import { UIPagination } from "../components/UIPagination";
import { UIBadge } from "../components/UIBadge";
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

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers({
        skip,
        limit,
      });
      setUsers(data.users);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [skip, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = () => {
    setSkip(0);
    setSearch(searchInput);
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      render: (user: User) => <span style={{ fontWeight: 500 }}>{user.id}</span>,
    },
    {
      key: "gender",
      header: "Пол",
      render: (user: User) => <UIBadge>{user.gender === "male" ? "Муж" : "Жен"}</UIBadge>,
    },
    {
      key: "username",
      header: "Username",
      render: (user: User) => (
        <Link
          to={`/users/${user.id}`}
          className="table__link"
        >
          {user.username}
        </Link>
      ),
    },
    {
      key: "role",
      header: "Роль",
      render: (user: User) => <span style={{ textTransform: "capitalize" }}>{user.role}</span>,
    },
  ];

  return (
    <div className="page-users">
      <div className="page-users__header">
        <h1 className="page-users__title">Пользователи</h1>
      </div>

      <div className="page-users__search-form">
        <div className="page-users__search-wrapper">
          <Search className="page-users__search-icon" />

          <UIInput
            placeholder="Поиск пользователей..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

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
