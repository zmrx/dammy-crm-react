import { type ReactNode } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import "./UITable.css";
import "./UISpinner.css";
import { UISpinner } from "./UISpinner";
import clsx from "clsx";

export type SortDirection = "asc" | "desc";

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
  sortable?: boolean;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  loading?: boolean;
  emptyMessage?: string;
  sortConfig?: SortConfig;
  onSortChange?: (config: SortConfig) => void;
}

export const UITable = <T extends object>({
  columns,
  data,
  keyExtractor,
  loading,
  emptyMessage = "Нет данных",
  sortConfig,
  onSortChange,
}: TableProps<T>) => {
  const handleSort = (key: string) => {
    if (!onSortChange) return;

    const currentDirection = sortConfig?.key === key ? sortConfig.direction : null;

    const newDirection: SortDirection =
      currentDirection === "asc" ? "desc" : "asc";

    onSortChange({ key, direction: newDirection });
  };

  const getSortIcon = (col: Column<T>) => {
    const isActive = sortConfig?.key === col.key;
    const direction = sortConfig?.direction;

    if (!isActive) {
      return <ChevronsUpDown className="ui-table__sort-icon ui-table__sort-icon--inactive" size={14} />;
    }

    return direction === "asc"
      ? <ChevronUp className="ui-table__sort-icon" size={14} />
      : <ChevronDown className="ui-table__sort-icon" size={14} />;
  };

  return (
    <div className="ui-table">
      <table className="ui-table__table">
        <thead>
          <tr className="ui-table__tr">
            {columns.map((col) => {
              const isSortable = col.sortable && onSortChange;
              const isActive = sortConfig?.key === col.key;

              return (
                <th
                  key={col.key}
                  className={clsx(
                    "ui-table__th",
                    col.className,
                    isSortable && "ui-table__th--sortable",
                    isActive && "ui-table__th--sorted"
                  )}
                  onClick={isSortable ? () => handleSort(col.key) : undefined}
                  role={isSortable ? "button" : undefined}
                  tabIndex={isSortable ? 0 : undefined}
                  aria-sort={
                    isActive
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  <span className="ui-table__th-content">
                    {col.header}
                    {isSortable && getSortIcon(col)}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr className="ui-table__tr">
              <td
                colSpan={columns.length}
                className="ui-table__td ui-table__loader"
              >
                <UISpinner />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr className="ui-table__tr">
              <td
                colSpan={columns.length}
                className="ui-table__td ui-table__empty-message"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="ui-table__tr"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={clsx("ui-table__td", col.className)}
                  >
                    {col.render
                      ? col.render(item)
                      : ((item as Record<string, unknown>)[col.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
