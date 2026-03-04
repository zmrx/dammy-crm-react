import { X, Check } from "lucide-react";
import { UIButton } from "./UIButton";
import { UIFormGrid } from "./UIFormGrid";
import { UIInput } from "./UIInput";
import { UISpinner } from "./UISpinner";
import { useState, type SubmitEvent } from "react";
import type { User } from "../types";
import { updateUser } from "../api/users";
import { UIInputLabel } from "../components/UIInputLabel";
import "./UserFormEdit.css";

interface UserFormEdit {
  user: User;
  onSucces?: (updatedUser: User) => void;
  onError?: (error: unknown) => void;
  onReject?: () => void;
}

export const UserFormEdit = ({ user, onError, onSucces, onReject }: UserFormEdit) => {
  const [editData, setEditData] = useState<User>({ ...user });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await updateUser(editData.id, editData);

      if (onSucces) onSucces(response);
    } catch (error: unknown) {
      console.error(error);
      if (onError) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="user-form-edit"
      onSubmit={onSubmitHandler}
    >
      <div className="user-form-edit__main">
        <UIFormGrid columns={2}>
          <UIInputLabel label="Имя">
            <UIInput
              value={editData.firstName || ""}
              onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
            />
          </UIInputLabel>

          <UIInputLabel label="Фамилия">
            <UIInput
              value={editData.lastName || ""}
              onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
            />
          </UIInputLabel>
        </UIFormGrid>

        <UIFormGrid columns={2}>
          <UIInputLabel label="Username">
            <UIInput
              value={editData.username || ""}
              onChange={(e) => setEditData({ ...editData, username: e.target.value })}
            />
          </UIInputLabel>

          <UIInputLabel label="Email">
            <UIInput
              type="email"
              value={editData.email || ""}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            />
          </UIInputLabel>
        </UIFormGrid>

        <UIFormGrid columns={2}>
          <UIInputLabel label="Телефон">
            <UIInput
              value={editData.phone || ""}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
            />
          </UIInputLabel>

          <UIInputLabel label="Дата рождения">
            <UIInput
              value={editData.birthDate || ""}
              onChange={(e) => setEditData({ ...editData, birthDate: e.target.value })}
            />
          </UIInputLabel>
        </UIFormGrid>

        <UIFormGrid columns={2}>
          <UIInputLabel label="Пол">
            <UIInput
              value={editData.gender || ""}
              onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
            />
          </UIInputLabel>

          <UIInputLabel label="Роль">
            <UIInput
              value={editData.role || ""}
              onChange={(e) => setEditData({ ...editData, role: e.target.value })}
            />
          </UIInputLabel>
        </UIFormGrid>

        <UIFormGrid columns={2}>
          <UIInputLabel label="Возраст">
            <UIInput
              type="number"
              value={editData.age || ""}
              onChange={(e) => setEditData({ ...editData, age: Number(e.target.value) })}
            />
          </UIInputLabel>

          <UIInputLabel label="Университет">
            <UIInput
              value={editData.university || ""}
              onChange={(e) => setEditData({ ...editData, university: e.target.value })}
            />
          </UIInputLabel>
        </UIFormGrid>
      </div>

      <div className="user-form-edit__footer">
        <UIButton
          variant={"outline"}
          onClick={onReject}
        >
          <X
            width={16}
            height={16}
            className="button__icon"
          />
          Отмена
        </UIButton>

        <UIButton
          className="button button--primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <UISpinner size="sm" />
          ) : (
            <Check
              width={16}
              height={16}
              className="button__icon"
            />
          )}
          Сохранить
        </UIButton>
      </div>
    </form>
  );
};
