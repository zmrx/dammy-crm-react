import { type ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";
import "./UIModal.css";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  bodyPadding?: boolean;
}

export function UIModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  bodyPadding = true,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="ui-modal-overlay"
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="ui-modal">
        <div className="ui-modal__header">
          {title && <h2 className="ui-modal__title">{title}</h2>}

          <button
            className="ui-modal__close"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <X
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className={clsx({ "ui-modal__body": true, "ui-modal__body_padding": bodyPadding })}>
          {children}
        </div>

        {footer && <div className="ui-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
