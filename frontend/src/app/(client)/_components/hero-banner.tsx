import Image from "next/image";

interface HeroBannerProps {
  imageSrc: string;
  alt?: string;
}

export function HeroBanner({ imageSrc, alt = "Hero Banner" }: HeroBannerProps) {
  return (
    <div className="w-full relative h-[260px] overflow-hidden">
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
