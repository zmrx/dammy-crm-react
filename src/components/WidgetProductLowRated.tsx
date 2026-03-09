import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types";
import { UICard, UICardHeader, UICardTitle, UICardContent } from "./UICard";
import "./WidgetProductLowRated.css";
import { UILink } from "./UILink";
import { UIWidgetItem, UIWidgetList } from "./UIWidget";

export const WidgetProductLowRated = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLowRatedProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ limit: 5, skip: 0, sortBy: "rating", order: "asc" });
        setProducts(response.products);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };

    fetchLowRatedProducts();
  }, []);

  if (loading) {
    return (
      <UICard className="widget">
        <UICardHeader>
          <UICardTitle>Товары с низким рейтингом</UICardTitle>
        </UICardHeader>

        <UICardContent>
          <div className="widget__loading">Загрузка...</div>
        </UICardContent>
      </UICard>
    );
  }

  if (error) {
    return (
      <UICard className="widget">
        <UICardHeader>
          <UICardTitle>Товары с низким рейтингом</UICardTitle>
        </UICardHeader>

        <UICardContent>
          <div className="widget__error">{error}</div>
        </UICardContent>
      </UICard>
    );
  }

  return (
    <UICard className="widget">
      <UICardHeader>
        <UICardTitle>Товары с низким рейтингом</UICardTitle>
      </UICardHeader>

      <UICardContent>
        <UIWidgetList>
          {products.map((product) => (
            <UIWidgetItem key={product.id}>
              <UILink to={`/products/${product.id}`}>
                <div className="widget-product-low-rated__card">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="widget-product-low-rated__image"
                  />
                  <div className="widget-product-low-rated__info">
                    <span className="widget-product-low-rated__title">{product.title}</span>
                    <span className="widget-product-low-rated__category">{product.category}</span>
                  </div>
                  <div className="widget-product-low-rated__rating">
                    <span className="widget-product-low-rated__rating-value">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="widget-product-low-rated__rating-stars">★</span>
                  </div>
                </div>
              </UILink>
            </UIWidgetItem>
          ))}
        </UIWidgetList>
      </UICardContent>
    </UICard>
  );
};
