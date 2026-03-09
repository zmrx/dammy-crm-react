import { X, Check } from "lucide-react";
import { UIButton } from "./UIButton";
import { UIFormGrid } from "./UIFormGrid";
import { UIInput } from "./UIInput";
import { UISpinner } from "./UISpinner";
import { useState, type SubmitEvent } from "react";
import type { Cart } from "../types";
import { updateCart } from "../api/carts";
import { UIInputLabel } from "../components/UIInputLabel";
import "./CartFormEdit.css";

interface CartItemEdit {
  id: number;
  quantity: number;
}

interface CartFormEditProps {
  cart: Cart;
  onSuccess?: (updatedCart: Cart) => void;
  onError?: (error: unknown) => void;
  onReject?: () => void;
}

export const CartFormEdit = ({ cart, onSuccess, onError, onReject }: CartFormEditProps) => {
  const [items, setItems] = useState<CartItemEdit[]>(
    cart.products.map((p) => ({ id: p.id, quantity: p.quantity }))
  );
  const [merge, setMerge] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await updateCart(
        cart.id,
        { merge, products: items },
        "PATCH"
      );

      if (onSuccess) onSuccess(response);
    } catch (error: unknown) {
      console.error(error);
      if (onError) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <form className="cart-form-edit" onSubmit={onSubmitHandler}>
      <div className="cart-form-edit__main">
        <div className="cart-form-edit__option">
          <UIInputLabel label="Объединить с существующими товарами">
            <UIInput
              type="checkbox"
              checked={merge}
              onChange={(e) => setMerge(e.target.checked)}
              style={{ width: "auto" }}
            />
          </UIInputLabel>
        </div>

        <div className="cart-form-edit__items">
          <h4 className="cart-form-edit__items-title">Товары в корзине</h4>
          {items.map((item) => {
            const product = cart.products.find((p) => p.id === item.id);
            return (
              <UIFormGrid key={item.id} columns={3}>
                <UIInputLabel label="Товар">
                  <UIInput value={product?.title || ""} disabled />
                </UIInputLabel>
                <UIInputLabel label="Количество">
                  <UIInput
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  />
                </UIInputLabel>
                <div className="cart-form-edit__remove">
                  <UIButton
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Удалить
                  </UIButton>
                </div>
              </UIFormGrid>
            );
          })}
        </div>
      </div>

      <div className="cart-form-edit__footer">
        <UIButton variant="outline" onClick={onReject}>
          <X width={16} height={16} className="button__icon" />
          Отмена
        </UIButton>

        <UIButton className="button button--primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <UISpinner size="sm" />
          ) : (
            <Check width={16} height={16} className="button__icon" />
          )}
          Сохранить
        </UIButton>
      </div>
    </form>
  );
};
