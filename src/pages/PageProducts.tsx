import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";
import { getProducts } from "../api";
import type { Product } from "../types";
import { UITable, type SortConfig } from "../components/UITable";
import { UIPagination } from "../components/UIPagination";
import { UIInput } from "../components/UIInput";
import { UIButton } from "../components/UIButton";
import "./PageProducts.css";

export const PageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 15;

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig | undefined>();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts({
        limit,
        skip,
        sortBy: sortConfig?.key,
        order: sortConfig?.direction,
      });
      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [skip, search, sortConfig]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = () => {
    setSkip(0);
    setSearch(searchInput);
  };

  const handleSort = (config: SortConfig) => {
    setSortConfig(config);
    setSkip(0);
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      className: "",
      sortable: true,
      render: (product: Product) => <span style={{ fontWeight: 500 }}>{product.id}</span>,
    },
    {
      key: "title",
      header: "Название",
      sortable: true,
      render: (product: Product) => <Link to={`/products/${product.id}`}>{product.title}</Link>,
    },
    {
      key: "category",
      header: "Категория",
      sortable: true,
      render: (product: Product) => (
        <span style={{ textTransform: "capitalize" }}>{product.category}</span>
      ),
    },
    {
      key: "price",
      header: "Цена",
      className: "table__text-right",
      sortable: true,
      render: (product: Product) => `$${product.price}`,
    },
    {
      key: "stock",
      header: "Остаток",
      className: "table__text-right",
      sortable: true,
      render: (product: Product) => product.stock,
    },
  ];

  return (
    <div className="page-products">
      <div className="page-products__header">
        <h1 className="page-products__title">Продукты</h1>
      </div>

      <div className="page-products__search-form">
        <UIInput
          placeholder="Поиск продуктов..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

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
        data={products}
        keyExtractor={(product) => product.id}
        loading={loading}
        emptyMessage="Продукты не найдены"
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
