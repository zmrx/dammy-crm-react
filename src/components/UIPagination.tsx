import { ChevronLeft, ChevronRight } from "lucide-react";
import "./UIPagination.css";
import "./UIButton.css";

interface PaginationProps {
  skip: number;
  total: number;
  limit: number;
  onSkipChange: (page: number) => void;
}

export function UIPagination({
  skip,
  limit,
  total,
  onSkipChange,
}: PaginationProps) {
  // вычисление кол-ва страниц, с округлением в большую сторону
  const totalPages = Math.ceil(total / limit);
  // теущая страница
  const currentPage = skip / limit + 1;

  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * 10 + 1;
  const end = Math.min(currentPage * 10, total);

  return (
    <div className="ui-pagination">
      <span className="ui-pagination__info">
        Показано {start}-{end} из {total}
      </span>

      <div className="ui-pagination__controls">
        <button
          className="ui-button ui-button--outline ui-button--icon"
          onClick={() => onSkipChange(skip - limit)}
          disabled={currentPage === 1}
          aria-label="Предыдущая страница"
        >
          <ChevronLeft width={16} height={16} />
        </button>

        <span className="ui-pagination__text">
          {currentPage} / {totalPages}
        </span>

        <button
          className="ui-button ui-button--outline ui-button--icon"
          onClick={() => onSkipChange(skip + limit)}
          disabled={currentPage === totalPages}
          aria-label="Следующая страница"
        >
          <ChevronRight width={16} height={16} />
        </button>
      </div>
    </div>
  );
}
