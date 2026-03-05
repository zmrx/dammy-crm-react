import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  // Edit,
  Trash2,
} from "lucide-react";
import { getCartById, deleteCart } from "../api/carts";
import type { Cart } from "../types";
import { UIModal } from "../components/UIModal";
import {
  UICard,
  UICardHeader,
  UICardTitle,
  UICardContent,
  UICardsGrid,
} from "../components/UICard";
import { UIPropertyList } from "../components/UIPropertyList";
import { UISpinner } from "../components/UISpinner";
import { useToast } from "../providers/toast";

import { UIButton } from "../components/UIButton";
import { CartFormEdit } from "../components/CartFormEdit";
import "./PageCart.css";

export const PageCart = () => {
  const { id } = useParams();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { showToast } = useToast();

  const onCartEditSuccess = (newCart: Cart) => {
    setEditModalOpen(false);
    setCart(newCart);
    showToast("Корзина успешно обновлена", "success");
  };

  const onCartEditError = () => {
    showToast("Ошибка при обновлении корзины", "error");
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteCart(Number(id));
      showToast("Корзина успешно удалена", "success");
      window.location.href = "/carts";
    } catch (error) {
      console.error("Failed to delete cart:", error);
      showToast("Ошибка при удалении корзины", "error");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!id) return;
      try {
        const data = await getCartById(Number(id));
        setCart(data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <UISpinner size="lg" />
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Корзина не найдена</p>
      </div>
    );
  }

  return (
    <div className="page-cart">
      <div className="page-cart__header">
        <Link
          to="/carts"
          className="page-cart__back-btn"
          aria-label="Назад"
        >
          <ArrowLeft className="page-cart__back-icon" />
        </Link>
        <div className="page-cart__info">
          <h1 className="page-cart__title">Корзина #{cart.id}</h1>
          <p className="page-cart__subtitle">
            Пользователь #{cart.userId} • {cart.totalProducts} товаров
          </p>
        </div>
        <div className="page-cart__actions">
          {/* <UIButton
            variant="outline"
            size="sm"
            onClick={() => setEditModalOpen(true)}
          >
            <Edit width={16} height={16} className="ui-button__icon" />
            Редактировать
          </UIButton> */}

          <UIButton
            variant="outline"
            size="sm"
            onClick={() => setDeleteModalOpen(true)}
          >
            <Trash2
              width={16}
              height={16}
              className="ui-button__icon"
            />
            Удалить
          </UIButton>
        </div>
      </div>

      {/* Products List */}
      <UICard>
        <UICardHeader>
          <UICardTitle>Товары в корзине</UICardTitle>
        </UICardHeader>

        <UICardContent>
          <div className="page-cart__products">
            {cart.products.map((product) => (
              <div
                key={product.id}
                className="page-cart__product"
              >
                <Link
                  to={`/products/${product.id}`}
                  className="page-cart__product-link"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="page-cart__product-thumbnail"
                  />
                  <div className="page-cart__product-info">
                    <h3 className="page-cart__product-title">{product.title}</h3>
                    <p className="page-cart__product-price">
                      ${product.price.toFixed(2)} × {product.quantity} = ${product.total.toFixed(2)}
                    </p>
                    {product.discountPercentage > 0 && (
                      <p className="page-cart__product-discount">
                        Скидка: {product.discountPercentage.toFixed(2)}%
                      </p>
                    )}
                  </div>
                </Link>
                <div className="page-cart__product-total">
                  <span className="page-cart__product-total-label">Итого со скидкой:</span>
                  <span className="page-cart__product-total-value">
                    ${product.discountedTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </UICardContent>
      </UICard>

      {/* Summary */}
      <UICardsGrid columns={2}>
        <UICard>
          <UICardHeader>
            <UICardTitle>Сводка</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <UIPropertyList
              items={[
                { label: "Всего товаров", value: cart.totalProducts },
                { label: "Общее количество", value: cart.totalQuantity },
                { label: "Сумма", value: `$${cart.total.toFixed(2)}` },
                {
                  label: "Сумма со скидкой",
                  value: `$${cart.discountedTotal.toFixed(2)}`,
                },
              ]}
            />
          </UICardContent>
        </UICard>

        <UICard>
          <UICardHeader>
            <UICardTitle>Информация</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <UIPropertyList
              items={[
                { label: "ID корзины", value: cart.id },
                {
                  label: "Пользователь",
                  value: <Link to={`/users/${cart.userId}`}>Пользователь #{cart.userId}</Link>,
                },
              ]}
            />
          </UICardContent>
        </UICard>
      </UICardsGrid>

      <UIModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Редактирование корзины"
      >
        <CartFormEdit
          cart={cart}
          onSuccess={onCartEditSuccess}
          onError={onCartEditError}
          onReject={() => setEditModalOpen(false)}
        />
      </UIModal>

      <UIModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Удаление корзины"
      >
        <div className="page-cart__delete-modal">
          <p>Вы уверены, что хотите удалить корзину #{cart.id}?</p>
          <div className="page-cart__delete-actions">
            <UIButton
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
            >
              Отмена
            </UIButton>
            <UIButton
              variant="ghost"
              onClick={handleDelete}
            >
              Удалить
            </UIButton>
          </div>
        </div>
      </UIModal>
    </div>
  );
};
