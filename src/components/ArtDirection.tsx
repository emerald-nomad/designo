interface ArtDirectionProps {
  alt: string;
  mobileSrc: string;
  tabletSrc: string;
  desktopSrc: string;
}

export default function ArtDirection({
  alt,
  mobileSrc,
  tabletSrc,
  desktopSrc,
}: ArtDirectionProps) {
  return (
    <picture>
      <source media="(min-width: 1400px)" srcSet={desktopSrc} />
      <source media="(min-width: 768px)" srcSet={tabletSrc} />
      <img
        alt={alt}
        src={mobileSrc}
        style={{ width: "100%", height: "auto" }}
      />
    </picture>
  );
}
