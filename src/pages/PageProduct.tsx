import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Edit, Check, X } from "lucide-react";
import { getProductById, updateProduct } from "../api/products";
import type { Product } from "../types";
import { UIModal } from "../components/UIModal";
import { UIGallery } from "../components/UIGallery";
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
import { UIFormGrid } from "../components/UIFormGrid";
import { UIInput } from "../components/UIInput";
import { UITextarea } from "../components/UITextarea";
import { UIButton } from "../components/UIButton";
import "./PageProduct.css";
import { UIInputLabel } from "../components/UIInputLabel";

export function PageProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<Product>>({});
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
        setEditData(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSave = async () => {
    if (!product) return;
    setSaving(true);
    try {
      await updateProduct(product.id, editData);
      setProduct({ ...product, ...editData });
      setEditModalOpen(false);
      showToast("Продукт успешно обновлен", "success");
    } catch {
      showToast("Ошибка при обновлении продукта", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <UISpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Продукт не найден</p>
      </div>
    );
  }

  return (
    <div className="page-product">
      <div className="page-product__header">
        <Link
          to="/products"
          className="page-product__back-btn"
          aria-label="Назад"
        >
          <ArrowLeft className="page-product__back-icon" />
        </Link>
        <h1 className="page-product__title">{product.title}</h1>
        <div className="page-product__actions">
          <UIButton
            variant="outline"
            size="sm"
            onClick={() => setEditModalOpen(true)}
          >
            <Edit
              width={16}
              height={16}
              className="ui-button__icon"
            />
            Редактировать
          </UIButton>
        </div>
      </div>

      {/* Gallery */}
      <UICard className="page-product__gallery">
        <UICardContent>
          <UIGallery
            images={product.images}
            title={product.title}
          />
        </UICardContent>
      </UICard>

      {/* Properties */}
      <UICardsGrid columns={2}>
        <UICard>
          <UICardHeader>
            <UICardTitle>Основная информация</UICardTitle>
          </UICardHeader>

          <UICardContent>
            <UIPropertyList
              items={[
                { label: "ID", value: product.id },
                { label: "Название", value: product.title },
                {
                  label: "Категория",
                  value: <span style={{ textTransform: "capitalize" }}>{product.category}</span>,
                },
                { label: "Бренд", value: product.brand || "-" },
                { label: "SKU", value: product.sku },
                { label: "Теги", value: product.tags.join(", ") },
              ]}
            />
          </UICardContent>
        </UICard>

        <UICard>
          <UICardHeader>
            <UICardTitle>Цены и наличие</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <UIPropertyList
              items={[
                { label: "Цена", value: `$${product.price}` },
                { label: "Скидка", value: `${product.discountPercentage}%` },
                { label: "Рейтинг", value: product.rating },
                { label: "Остаток", value: `${product.stock} шт.` },
                { label: "Статус", value: product.availabilityStatus },
                {
                  label: "Мин. заказ",
                  value: `${product.minimumOrderQuantity} шт.`,
                },
              ]}
            />
          </UICardContent>
        </UICard>

        <UICard>
          <UICardHeader>
            <UICardTitle>Характеристики</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <UIPropertyList
              items={[
                { label: "Вес", value: `${product.weight} кг` },
                {
                  label: "Размеры",
                  value: `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`,
                },
                { label: "Гарантия", value: product.warrantyInformation },
                { label: "Доставка", value: product.shippingInformation },
                { label: "Возврат", value: product.returnPolicy },
              ]}
            />
          </UICardContent>
        </UICard>

        <UICard>
          <UICardHeader>
            <UICardTitle>Описание</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <p className="page-product__description">{product.description}</p>
          </UICardContent>
        </UICard>
      </UICardsGrid>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <UICard className="page-product__section">
          <UICardHeader>
            <UICardTitle>Отзывы</UICardTitle>
          </UICardHeader>
          <UICardContent>
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="review"
              >
                <div className="review__header">
                  <span className="review__author">{review.reviewerName}</span>
                  <span className="review__rating">⭐ {review.rating}/5</span>
                </div>
                <p className="review__text">{review.comment}</p>
                <p className="review__date">{new Date(review.date).toLocaleDateString("ru-RU")}</p>
              </div>
            ))}
          </UICardContent>
        </UICard>
      )}

      {/* Edit Modal */}
      <UIModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Редактирование продукта"
        footer={
          <>
            <UIButton
              variant="outline"
              onClick={() => setEditModalOpen(false)}
            >
              <X
                width={16}
                height={16}
                className="ui-button__icon"
              />
              Отмена
            </UIButton>
            <UIButton
              variant="primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <UISpinner size="sm" />
              ) : (
                <Check
                  width={16}
                  height={16}
                  className="ui-button__icon"
                />
              )}
              Сохранить
            </UIButton>
          </>
        }
      >
        <UIFormGrid columns={2}>
          <UIInputLabel label="Название">
            <UIInput
              value={editData.title || ""}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
          </UIInputLabel>
          <UIInputLabel label="Категория">
            <UIInput
              value={editData.category || ""}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            />
          </UIInputLabel>
        </UIFormGrid>
        <UIInputLabel label="Описание">
          <UITextarea
            value={editData.description || ""}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            rows={3}
          />
        </UIInputLabel>
        <UIFormGrid columns={3}>
          <UIInputLabel label="Цена">
            <UIInput
              type="number"
              value={editData.price || ""}
              onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
            />
          </UIInputLabel>
          <UIInputLabel label="Скидка %">
            <UIInput
              type="number"
              value={editData.discountPercentage || ""}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  discountPercentage: Number(e.target.value),
                })
              }
            />
          </UIInputLabel>
          <UIInputLabel label="Остаток">
            <UIInput
              type="number"
              value={editData.stock || ""}
              onChange={(e) => setEditData({ ...editData, stock: Number(e.target.value) })}
            />
          </UIInputLabel>
        </UIFormGrid>
        <UIFormGrid columns={2}>
          <UIInputLabel label="Бренд">
            <UIInput
              value={editData.brand || ""}
              onChange={(e) => setEditData({ ...editData, brand: e.target.value })}
            />
          </UIInputLabel>
          <UIInputLabel label="SKU">
            <UIInput
              value={editData.sku || ""}
              onChange={(e) => setEditData({ ...editData, sku: e.target.value })}
            />
          </UIInputLabel>
        </UIFormGrid>
        <UIInputLabel label="Гарантия">
          <UIInput
            value={editData.warrantyInformation || ""}
            onChange={(e) => setEditData({ ...editData, warrantyInformation: e.target.value })}
          />
        </UIInputLabel>
        <UIInputLabel label="Доставка">
          <UIInput
            value={editData.shippingInformation || ""}
            onChange={(e) => setEditData({ ...editData, shippingInformation: e.target.value })}
          />
        </UIInputLabel>
        <UIInputLabel label="Политика возврата">
          <UIInput
            value={editData.returnPolicy || ""}
            onChange={(e) => setEditData({ ...editData, returnPolicy: e.target.value })}
          />
        </UIInputLabel>
      </UIModal>
    </div>
  );
}
