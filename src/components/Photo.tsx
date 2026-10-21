type PhotoProps = { src?: string; alt: string; className?: string };

// Real food / stall photo. Credits: public/food/CREDITS.txt
// Paths are made relative so the page works under a GitHub Pages sub-path. No photo → shimmer skeleton.
export const Photo = ({ src, alt, className = '' }: PhotoProps) =>
  src ? (
    <img src={src.replace(/^\//, '')} alt={alt} className={`object-cover bg-orange-100 ${className}`} draggable={false} />
  ) : (
    <span role="img" aria-label={alt} className={`block skeleton ${className}`} />
  );
