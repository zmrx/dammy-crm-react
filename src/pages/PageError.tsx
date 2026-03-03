import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import "./PageError.css";
import { useLocation } from "react-router";

export const PageError = () => {
  const error = useRouteError();
  const location = useLocation();

  const isWildcardRoute =
    !isRouteErrorResponse(error) && !(error instanceof Error);

  let title = "Произошла ошибка";
  let message = "Что-то пошло не так";
  let code = "Ошибка";

  if (isWildcardRoute) {
    code = "404";
    title = "Страница не найдена";
    message = `Страница "${location.pathname}" не существует или была перемещена`;
  } else if (isRouteErrorResponse(error)) {
    code = String(error.status);

    if (error.status === 404) {
      title = "Страница не найдена";
      message = "Запрашиваемая страница не существует или была перемещена";
    } else if (error.status === 401) {
      title = "Не авторизован";
      message = "У вас нет доступа к этой странице";
    } else if (error.status === 403) {
      title = "Доступ запрещен";
      message = "У вас недостаточно прав для просмотра этой страницы";
    } else if (error.status === 500) {
      title = "Ошибка сервера";
      message = "Произошла внутренняя ошибка сервера";
    } else {
      message = error.statusText || "Произошла неизвестная ошибка";
    }
  } else if (error instanceof Error) {
    title = "Ошибка";
    message = error.message || "Произошла непредвиденная ошибка";
  }

  return (
    <div className="error-page">
      <div className="error-page__code">{code}</div>

      <h1 className="error-page__title">{title}</h1>

      <p className="error-page__text">{message}</p>

      <div className="error-page__actions">
        <button
          className="button button--outline"
          onClick={() => window.history.back()}
        >
          <ArrowLeft width={16} height={16} className="button__icon" />
          Назад
        </button>

        <Link to="/" className="button button--primary">
          <Home width={16} height={16} className="button__icon" />
          На главную
        </Link>
      </div>
    </div>
  );
};
