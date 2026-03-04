import { type ReactNode } from "react";
import "./UITable.css";
import "./UISpinner.css";
import { UISpinner } from "./UISpinner";
import clsx from "clsx";

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  loading?: boolean;
  emptyMessage?: string;
}

export const UITable = <T extends object>({
  columns,
  data,
  keyExtractor,
  loading,
  emptyMessage = "Нет данных",
}: TableProps<T>) => {
  return (
    <div className="ui-table">
      <table className="ui-table__table">
        <thead>
          <tr className="ui-table__tr">
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx("ui-table__th", col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr className="ui-table__tr">
              <td
                colSpan={columns.length}
                className="ui-table__td ui-table__center ui-table__loader"
              >
                <UISpinner />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr className="ui-table__tr">
              <td
                colSpan={columns.length}
                className="ui-table__td ui-table__center"
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
