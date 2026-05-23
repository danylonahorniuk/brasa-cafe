import HeroSlider from "@/components/home/HeroSlider";
import CategoryGrid from "@/components/home/CategoryGrid";
import PromoCards from "@/components/home/PromoCards";
import PopularScroll from "@/components/home/PopularScroll";
import NewItems from "@/components/home/NewItems";
import BookingBanner from "@/components/home/BookingBanner";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <PromoCards />
      <PopularScroll />
      <NewItems />
      <CategoryGrid />
      <BookingBanner />
    </>
  );
}
