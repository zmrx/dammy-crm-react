import { useState } from "react";
import "./UIGallery.css";

interface GalleryProps {
  images: string[];
  title: string;
}

export function UIGallery({ images, title }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const validImages = images.length > 0 ? images : [];

  return (
    <div className="ui-gallery">
      <div className="ui-gallery__main">
        <img
          src={validImages[selectedIndex] || "/placeholder.png"}
          alt={`${title} - изображение ${selectedIndex + 1}`}
          className="ui-gallery__main-image"
        />
      </div>

      {validImages.length > 1 && (
        <div className="ui-gallery__thumbnails">
          {validImages.map((image, index) => (
            <button
              key={index}
              className={`ui-gallery__thumbnail ${index === selectedIndex ? "ui-gallery__thumbnail--active" : ""}`}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Показать изображение ${index + 1}`}
            >
              <img
                src={image}
                alt={`${title} - миниатюра ${index + 1}`}
                className="ui-gallery__thumbnail-image"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
