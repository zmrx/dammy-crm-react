import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { Search, Trash2 } from "lucide-react";
import { getCarts, deleteCart } from "../api/carts";
import type { Cart } from "../types";
import { UITable, type SortConfig } from "../components/UITable";
import { UIPagination } from "../components/UIPagination";
import { UIButton } from "../components/UIButton";
import "./PageCarts.css";
import { UIModal } from "../components/UIModal";
import { CartFormSearch } from "../components/CartFormSearch";
import { useToast } from "../providers/toast";

export const PageCarts = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 15;

  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig | undefined>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [cartToDelete, setCartToDelete] = useState<number | null>(null);
  const [userSearchIsOpen, setUserSearchIsOpen] = useState(false);

  const { showToast } = useToast();

  const fetchCarts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCarts({
        skip,
        limit,
      });
      setCarts(data.carts);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch carts:", error);
    } finally {
      setLoading(false);
    }
  }, [skip, sortConfig]);

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  const handleSort = (config: SortConfig) => {
    setSortConfig(config);
    setSkip(0);
  };

  const handleDeleteClick = (id: number) => {
    setCartToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!cartToDelete) return;
    try {
      await deleteCart(cartToDelete);
      showToast("Корзина успешно удалена", "success");
      fetchCarts();
    } catch (error) {
      console.error("Failed to delete cart:", error);
      showToast("Ошибка при удалении корзины", "error");
    } finally {
      setDeleteModalOpen(false);
      setCartToDelete(null);
    }
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      render: (cart: Cart) => <span style={{ fontWeight: 500 }}>{cart.id}</span>,
    },
    {
      key: "userId",
      header: "Пользователь",
      render: (cart: Cart) => <Link to={`/users/${cart.userId}`}>Пользователь #{cart.userId}</Link>,
    },
    {
      key: "totalProducts",
      header: "Товары",
      render: (cart: Cart) => `${cart.totalProducts} шт.`,
    },
    {
      key: "totalQuantity",
      header: "Количество",
      render: (cart: Cart) => `${cart.totalQuantity}`,
    },
    {
      key: "total",
      header: "Сумма",
      render: (cart: Cart) => `$${cart.total.toFixed(2)}`,
    },
    {
      key: "actions",
      header: "Действия",
      render: (cart: Cart) => (
        <div className="page-carts__actions">
          <Link to={`/carts/${cart.id}`}>
            <UIButton
              variant="outline"
              size="sm"
            >
              Открыть
            </UIButton>
          </Link>
          <UIButton
            variant="outline"
            size="sm"
            onClick={() => handleDeleteClick(cart.id)}
          >
            <Trash2
              width={16}
              height={16}
              className="ui-button__icon"
            />
          </UIButton>
        </div>
      ),
    },
  ];

  return (
    <div className="page-carts">
      <div className="page-carts__header">
        <h1 className="page-carts__title">Корзины</h1>
      </div>

      <div className="page-carts__search-form">
        <UIButton
          variant="primary"
          onClick={() => setUserSearchIsOpen(true)}
        >
          <Search
            width={16}
            height={16}
            className="ui-button__icon"
          />
          Поиск корзины
        </UIButton>

        <UIModal
          isOpen={userSearchIsOpen}
          onClose={() => setUserSearchIsOpen(false)}
          title="Поиск корзины"
          bodyPadding={false}
        >
          <CartFormSearch />
        </UIModal>
      </div>

      <UITable
        columns={columns}
        data={carts}
        keyExtractor={(cart) => cart.id}
        loading={loading}
        emptyMessage="Корзины не найдены"
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

      <UIModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Удаление корзины"
      >
        <div className="page-carts__delete-modal">
          <p>Вы уверены, что хотите удалить корзину #{cartToDelete}?</p>
          <div className="page-carts__delete-actions">
            <UIButton
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
            >
              Отмена
            </UIButton>
            <UIButton
              variant="ghost"
              onClick={handleDeleteConfirm}
            >
              Удалить
            </UIButton>
          </div>
        </div>
      </UIModal>
    </div>
  );
};
