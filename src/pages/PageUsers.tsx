import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";
import { getUsers } from "../api";
import type { User } from "../types";
import { UITable, type SortConfig } from "../components/UITable";
import { UIPagination } from "../components/UIPagination";
import { UIButton } from "../components/UIButton";
import "./PageUsers.css";
import { UIModal } from "../components/UIModal";
import { UserFormSearch } from "../components/UserFormSearch";

export const PageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 15;

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
  }, [skip, sortConfig]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
      header: "Имя пользователя",
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

  const [userSearchIsOpen, setUserSearchIsOpen] = useState(false);

  return (
    <div className="page-users">
      <div className="page-users__header">
        <h1 className="page-users__title">Пользователи</h1>
      </div>

      <div className="page-users__search-form">
        <UIButton variant="primary" onClick={() => setUserSearchIsOpen(true)}>
          <Search
            width={16}
            height={16}
            className="ui-button__icon"
          />
          Поиск пользователя
        </UIButton>

        <UIModal
          isOpen={userSearchIsOpen}
          onClose={() => setUserSearchIsOpen(false)}
          title="Поиск пользователя"
          bodyPadding={false}
        >
          <UserFormSearch />
        </UIModal>
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
