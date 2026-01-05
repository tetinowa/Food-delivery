import { ReactNode } from "react";

interface AuthPageLayoutProps {
  children: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

export function AuthPageLayout({
  children,
  imageSrc = "/misc/login.jpg",
  imageAlt = "Authentication",
}: AuthPageLayoutProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex h-fit w-fit items-center justify-center gap-10">
        <div className="flex flex-col w-104 gap-6">{children}</div>
        <img src={imageSrc} className="w-214 h-226 rounded-3xl" alt={imageAlt} />
      </div>
    </div>
  );
}
