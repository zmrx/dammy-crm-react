import "./UIAvatar.css";

interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

export const UIAvatar =({ src, alt, fallback, size = "md" }: AvatarProps) => {
  return (
    <div className={`ui-avatar ui-avatar--${size}`}>
      {src ? <img src={src} alt={alt} className="ui-avatar__image" /> : fallback}
    </div>
  );
}
