import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Edit, Check, X } from "lucide-react";
import { getUser, updateUser } from "../api/users";
import type { User } from "../types";
import { UIModal } from "../components/UIModal";
import {
  UICard,
  UICardHeader,
  UICardTitle,
  UICardContent,
  UICardsGrid,
} from "../components/UICard";
import { UIPropertyList } from "../components/UIPropertyList";
import { UIBadge } from "../components/UIBadge";
import { UIAvatar } from "../components/UIAvatar";
import { UISpinner } from "../components/UISpinner";
import { useToast } from "../providers/toast";
import { UIFormGrid, UIInput } from "../components/UIInput";
import { UIButton } from "../components/UIButton";
import "./PageUser.css";

export const PageUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const data = await getUser(Number(id));
        setUser(data);
        setEditData(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateUser(user.id, editData);
      setUser({ ...user, ...editData });
      setEditModalOpen(false);
      showToast("Пользователь успешно обновлен", "success");
    } catch {
      showToast("Ошибка при обновлении пользователя", "error");
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

  if (!user) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Пользователь не найден</p>
      </div>
    );
  }

  return (
    <div className="page-user">
      <div className="page-user__header">
        <Link to="/users" className="page-user__back-btn" aria-label="Назад">
          <ArrowLeft className="page-user__back-icon" />
        </Link>
        <div className="page-user__info">
          <UIAvatar
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            size="lg"
          />
          <div>
            <h1 className="page-user__name">
              {user.firstName} {user.lastName}
            </h1>
            <p className="page-user__username">@{user.username}</p>
          </div>
        </div>
        <div className="page-user__actions">
          <UIButton
            variant="outline"
            size="sm"
            onClick={() => setEditModalOpen(true)}
          >
            <Edit width={16} height={16} className="ui-button__icon" />
            Редактировать
          </UIButton>
        </div>
      </div>

      {/* Properties */}
      <UICardsGrid columns={2}>
        <UICard>
          <UICardHeader>
            <UICardTitle>Основная информация</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <UIPropertyList
              items={[
                { label: "ID", value: user.id },
                { label: "Имя", value: user.firstName },
                { label: "Фамилия", value: user.lastName },
                { label: "Девичья фамилия", value: user.maidenName || "-" },
                { label: "Username", value: user.username },
                {
                  label: "Пол",
                  value: (
                    <UIBadge>
                      {user.gender === "male" ? "Мужской" : "Женский"}
                    </UIBadge>
                  ),
                },
                { label: "Возраст", value: user.age },
                { label: "Дата рождения", value: user.birthDate },
                {
                  label: "Роль",
                  value: (
                    <span style={{ textTransform: "capitalize" }}>
                      {user.role}
                    </span>
                  ),
                },
              ]}
            />
          </UICardContent>
        </UICard>

        <UICard>
          <UICardHeader>
            <UICardTitle>Контакты</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <UIPropertyList
              items={[
                { label: "Email", value: user.email },
                { label: "Телефон", value: user.phone },
                { label: "IP", value: user.ip },
                { label: "MAC Address", value: user.macAddress },
              ]}
            />
          </UICardContent>
        </UICard>

        <UICard>
          <UICardHeader>
            <UICardTitle>Физические параметры</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <UIPropertyList
              items={[
                { label: "Рост", value: `${user.height} см` },
                { label: "Вес", value: `${user.weight} кг` },
                { label: "Группа крови", value: user.bloodGroup },
                {
                  label: "Цвет глаз",
                  value: (
                    <span style={{ textTransform: "capitalize" }}>
                      {user.eyeColor}
                    </span>
                  ),
                },
                {
                  label: "Волосы",
                  value: (
                    <span style={{ textTransform: "capitalize" }}>
                      {user.hair.color} ({user.hair.type})
                    </span>
                  ),
                },
              ]}
            />
          </UICardContent>
        </UICard>

        <UICard>
          <UICardHeader>
            <UICardTitle>Адрес</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <UIPropertyList
              items={[
                { label: "Адрес", value: user.address.address },
                { label: "Город", value: user.address.city },
                {
                  label: "Штат",
                  value: `${user.address.state} (${user.address.stateCode})`,
                },
                { label: "Почтовый индекс", value: user.address.postalCode },
                { label: "Страна", value: user.address.country },
                {
                  label: "Координаты",
                  value: `${user.address.coordinates.lat.toFixed(4)}, ${user.address.coordinates.lng.toFixed(4)}`,
                },
              ]}
            />
          </UICardContent>
        </UICard>

        <UICard>
          <UICardHeader>
            <UICardTitle>Образование</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <UIPropertyList
              items={[{ label: "Университет", value: user.university }]}
            />
          </UICardContent>
        </UICard>

        <UICard>
          <UICardHeader>
            <UICardTitle>Работа</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <UIPropertyList
              items={[
                { label: "Компания", value: user.company.name },
                { label: "Должность", value: user.company.title },
                { label: "Департамент", value: user.company.department },
              ]}
            />
          </UICardContent>
        </UICard>

        <UICard>
          <UICardHeader>
            <UICardTitle>Банк</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <UIPropertyList
              items={[
                { label: "Тип карты", value: user.bank.cardType },
                { label: "Номер карты", value: user.bank.cardNumber },
                { label: "Срок действия", value: user.bank.cardExpire },
                { label: "Валюта", value: user.bank.currency },
                { label: "IBAN", value: user.bank.iban },
              ]}
            />
          </UICardContent>
        </UICard>

        <UICard>
          <UICardHeader>
            <UICardTitle>Криптовалюта</UICardTitle>
          </UICardHeader>
          <UICardContent>
            <UIPropertyList
              items={[
                { label: "Монета", value: user.crypto.coin },
                {
                  label: "Кошелек",
                  value: (
                    <span
                      style={{
                        fontSize: "var(--font-size-xs)",
                        wordBreak: "break-all",
                      }}
                    >
                      {user.crypto.wallet}
                    </span>
                  ),
                },
                { label: "Сеть", value: user.crypto.network },
              ]}
            />
          </UICardContent>
        </UICard>
      </UICardsGrid>

      {/* Edit Modal */}
      <UIModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Редактирование пользователя"
        footer={
          <>
            <UIButton
              variant={'outline'}
              onClick={() => setEditModalOpen(false)}
            >
              <X width={16} height={16} className="button__icon" />
              Отмена
            </UIButton>

            <UIButton
              className="button button--primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <UISpinner size="sm" />
              ) : (
                <Check width={16} height={16} className="button__icon" />
              )}
              Сохранить
            </UIButton>
          </>
        }
      >
        <UIFormGrid columns={2}>
          <UIInput
            label="Имя"
            value={editData.firstName || ""}
            onChange={(e) =>
              setEditData({ ...editData, firstName: e.target.value })
            }
          />
          <UIInput
            label="Фамилия"
            value={editData.lastName || ""}
            onChange={(e) =>
              setEditData({ ...editData, lastName: e.target.value })
            }
          />
        </UIFormGrid>

        <UIFormGrid columns={2}>
          <UIInput
            label="Username"
            value={editData.username || ""}
            onChange={(e) =>
              setEditData({ ...editData, username: e.target.value })
            }
          />
          <UIInput
            label="Email"
            type="email"
            value={editData.email || ""}
            onChange={(e) =>
              setEditData({ ...editData, email: e.target.value })
            }
          />
        </UIFormGrid>

        <UIFormGrid columns={2}>
          <UIInput
            label="Телефон"
            value={editData.phone || ""}
            onChange={(e) =>
              setEditData({ ...editData, phone: e.target.value })
            }
          />
          <UIInput
            label="Дата рождения"
            value={editData.birthDate || ""}
            onChange={(e) =>
              setEditData({ ...editData, birthDate: e.target.value })
            }
          />
        </UIFormGrid>

        <UIFormGrid columns={2}>
          <UIInput
            label="Пол"
            value={editData.gender || ""}
            onChange={(e) =>
              setEditData({ ...editData, gender: e.target.value })
            }
          />
          <UIInput
            label="Роль"
            value={editData.role || ""}
            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
          />
        </UIFormGrid>

        <UIFormGrid columns={2}>
          <UIInput
            label="Возраст"
            type="number"
            value={editData.age || ""}
            onChange={(e) =>
              setEditData({ ...editData, age: Number(e.target.value) })
            }
          />
          <UIInput
            label="Университет"
            value={editData.university || ""}
            onChange={(e) =>
              setEditData({ ...editData, university: e.target.value })
            }
          />
        </UIFormGrid>
      </UIModal>
    </div>
  );
};
