import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AuthFormActionsProps {
  buttonText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref?: string;
  onFooterLinkClick?: () => void;
}

export function AuthFormActions({
  buttonText,
  footerText,
  footerLinkText,
  footerLinkHref,
  onFooterLinkClick,
}: AuthFormActionsProps) {
  return (
    <div className="flex flex-col gap-3">
      <Button type="submit" className="bg-black text-white w-full h-12 px-6">
        {buttonText}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <p className="text-sm text-center text-muted-foreground">
        {footerText}{" "}
        {footerLinkHref ? (
          <a href={footerLinkHref} className="text-black underline cursor-pointer">
            {footerLinkText}
          </a>
        ) : (
          <span
            onClick={onFooterLinkClick}
            className="text-black underline cursor-pointer"
          >
            {footerLinkText}
          </span>
        )}
      </p>
    </div>
  );
}
