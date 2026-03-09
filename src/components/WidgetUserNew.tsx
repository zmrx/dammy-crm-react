import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import type { User } from "../types";
import { UICard, UICardHeader, UICardTitle, UICardContent } from "./UICard";
import "./WidgetUserNew.css";
import { UILink } from "./UILink";
import { UIWidgetList, UIWidgetItem } from "./UIWidget";

export const WidgetUserNew = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewUsers = async () => {
      try {
        setLoading(true);
        const response = await getUsers({ limit: 5, sortBy: "id", order: "desc" });
        setUsers(response.users);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };

    fetchNewUsers();
  }, []);

  if (loading) {
    return (
      <UICard className="widget widget_user-new">
        <UICardHeader>
          <UICardTitle>Новые пользователи</UICardTitle>
        </UICardHeader>
        <UICardContent>
          <div className="widget__loading">Загрузка...</div>
        </UICardContent>
      </UICard>
    );
  }

  if (error) {
    return (
      <UICard className="widget widget_user-new">
        <UICardHeader>
          <UICardTitle>Новые пользователи</UICardTitle>
        </UICardHeader>
        <UICardContent>
          <div className="widget__error">{error}</div>
        </UICardContent>
      </UICard>
    );
  }

  return (
    <UICard className="widget widget_user-new">
      <UICardHeader>
        <UICardTitle>Новые пользователи</UICardTitle>
      </UICardHeader>

      <UICardContent>
        <UIWidgetList>
          {users.map((user) => (
            <UIWidgetItem key={user.id}>
              <UILink to={`/users/${user.id}`}>
                <div className="widget-user-new__cart">
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="widget-user-new__avatar"
                  />
                  <div className="widget-user-new__info">
                    <span className="widget-user-new__name">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="widget-user-new__email">{user.email}</span>
                  </div>
                  <span className="widget-user-new__role">{user.role}</span>
                </div>
              </UILink>
            </UIWidgetItem>
          ))}
        </UIWidgetList>
      </UICardContent>
    </UICard>
  );
};
