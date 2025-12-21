import { Header } from "./_components/header";
import { HeroBanner } from "./_components/hero-banner";
import { CategorySection } from "./_components/category-section";
import { Footer } from "./_components/footer";
import {
  appetizers,
  salads,
  lunchFavorites,
  moreSalads,
} from "./_components/data";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroBanner imageSrc="/misc/Container.png" alt="Today's Offer" />
      <div className="bg-[#404040] w-full flex flex-col gap-[88px] items-center py-[88px]">
        <CategorySection title="Appetizers" items={appetizers} />
        <CategorySection title="Salads" items={salads} />
        <CategorySection title="Lunch favorites" items={lunchFavorites} />
        <CategorySection title="Salads" items={moreSalads} />
      </div>
      <Footer />
    </div>
  );
}
