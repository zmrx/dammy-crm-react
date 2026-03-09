import { useEffect, useState } from "react";
import { getCarts } from "../api/carts";
import type { Cart } from "../types";
import { UICard, UICardHeader, UICardTitle, UICardContent } from "./UICard";
import "./WidgetCartRecent.css";
import { UILink } from "./UILink";
import { UIWidgetItem, UIWidgetList } from "./UIWidget";

const CARTS_COUNT = 8;

export const WidgetCartRecent = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setLoading(true);
        // условность демо площадки, т.к. тестовое апи не позволяет передать параметры сортировки корзин
        const response = await getCarts({ limit: 50, skip: 0 });
        const sortedCarts = response.carts.sort((a, b) => b.id - a.id).slice(0, CARTS_COUNT);
        setCarts(sortedCarts);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  if (loading) {
    return (
      <UICard>
        <UICardHeader>
          <UICardTitle>Последние заказы</UICardTitle>
        </UICardHeader>

        <UICardContent>
          <div className="widget__loading">Загрузка...</div>
        </UICardContent>
      </UICard>
    );
  }

  if (error) {
    return (
      <UICard>
        <UICardHeader>
          <UICardTitle>Последние заказы</UICardTitle>
        </UICardHeader>

        <UICardContent>
          <div className="widget__error">{error}</div>
        </UICardContent>
      </UICard>
    );
  }

  return (
    <UICard>
      <UICardHeader>
        <UICardTitle>Последние заказы</UICardTitle>
      </UICardHeader>

      <UICardContent>
        <UIWidgetList>
          {carts.map((cart) => (
            <UIWidgetItem key={cart.id}>
              <UILink to={`/carts/${cart.id}`}>
                <div className="widget-cart-recent__cart">
                  <span className="widget-cart-recent__id">#{cart.id}</span>
                  <span className="widget-cart-recent__user">Пользователь: {cart.userId}</span>
                  <span className="widget-cart-recent__total">${cart.total.toFixed(2)}</span>
                </div>
              </UILink>
            </UIWidgetItem>
          ))}
        </UIWidgetList>
      </UICardContent>
    </UICard>
  );
};
