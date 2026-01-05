import { FormLabel, FormDescription } from "@/components/ui/form";

interface AuthFormHeaderProps {
  title: string;
  description: string;
}

export function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <FormLabel className="text-black font-semibold text-[24px] leading-8">
        {title}
      </FormLabel>
      <FormDescription className="text-muted-foreground text-[16px] font-normal leading-6">
        {description}
      </FormDescription>
    </div>
  );
}
