import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";

export const metadata: Metadata = {
  title: "Brasa — Кафе з доставкою",
  description: "Піца на дровах, роли, бургери та авторські коктейлі. Замов з доставкою або забронюй столик онлайн.",
};
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
