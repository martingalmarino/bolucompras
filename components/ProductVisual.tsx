"use client";

import Image from "next/image";
import { useState } from "react";

const AMAZON_HOST = "https://m.media-amazon.com/";

export function ProductVisual({
  nombre,
  emoji,
  imagenUrl,
  emojiClassName,
  priority = false,
  sizes = "(max-width: 700px) 80vw, 480px",
}: {
  nombre: string;
  emoji: string;
  imagenUrl: string;
  emojiClassName: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(imagenUrl) && !failed;

  if (!showImage) {
    return (
      <span className={emojiClassName} role="img" aria-label={nombre}>
        {emoji || "🛒"}
      </span>
    );
  }

  if (imagenUrl.startsWith(AMAZON_HOST)) {
    return (
      <Image
        src={imagenUrl}
        alt={nombre}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain p-6"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imagenUrl}
      alt={nombre}
      className="h-full max-h-full w-full object-contain p-6"
      onError={() => setFailed(true)}
    />
  );
}
