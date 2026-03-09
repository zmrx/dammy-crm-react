import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types";
import { UICard, UICardHeader, UICardTitle, UICardContent } from "./UICard";
import "./WidgetProductLowStock.css";
import { UILink } from "./UILink";
import { UIWidgetItem, UIWidgetList } from "./UIWidget";

export const WidgetProductLowStock = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ limit: 5, skip: 0, sortBy: "stock", order: "asc" });
        setProducts(response.products);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };

    fetchLowStockProducts();
  }, []);

  if (loading) {
    return (
      <UICard className="widget widget_product-low-stock">
        <UICardHeader>
          <UICardTitle>Низкий остаток</UICardTitle>
        </UICardHeader>
        <UICardContent>
          <div className="widget__loading">Загрузка...</div>
        </UICardContent>
      </UICard>
    );
  }

  if (error) {
    return (
      <UICard className="widget widget_product-low-stock">
        <UICardHeader>
          <UICardTitle>Низкий остаток</UICardTitle>
        </UICardHeader>
        <UICardContent>
          <div className="widget__error">{error}</div>
        </UICardContent>
      </UICard>
    );
  }

  return (
    <UICard className="widget widget_product-low-stock">
      <UICardHeader>
        <UICardTitle>Низкий остаток</UICardTitle>
      </UICardHeader>
      <UICardContent>
        {products.length === 0 ? (
          <div className="widget__empty">Все товары в наличии</div>
        ) : (
          <UIWidgetList>
            {products.map((product) => (
              <UIWidgetItem key={product.id}>
                <UILink to={`/products/${product.id}`}>
                  <div className="widget-product-low-stock__card">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="widget-product-low-stock__image"
                    />
                    <div className="widget-product-low-stock__info">
                      <span className="widget-product-low-stock__title">{product.title}</span>
                      <span className="widget-product-low-stock__stock">
                        Остаток:{" "}
                        <span className="widget-product-low-stock__stock-value widget-product-low-stock__stock-value--low">
                          {product.stock}
                        </span>
                      </span>
                    </div>
                  </div>
                </UILink>
              </UIWidgetItem>
            ))}
          </UIWidgetList>
        )}
      </UICardContent>
    </UICard>
  );
};
