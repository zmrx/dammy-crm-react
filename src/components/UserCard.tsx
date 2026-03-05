import type { User } from '../types/User';
import { UIAvatar } from './UIAvatar';
import './UserCard.css';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      <div className="user-card__avatar">
        <UIAvatar src={user.image} alt={`${user.firstName} ${user.lastName}`} size="lg" />
      </div>
      <div className="user-card__info">
        <h3 className="user-card__name">
          {user.firstName} {user.lastName}
        </h3>
        {user.maidenName && (
          <p className="user-card__maiden-name">({user.maidenName})</p>
        )}
        <p className="user-card__username">@{user.username}</p>
        <p className="user-card__email">{user.email}</p>
      </div>
    </div>
  );
};
