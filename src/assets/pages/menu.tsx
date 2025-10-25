import Header from "@/assets/heefoo/heeder";
import Footer from "@/assets/heefoo/footer";
import BannerMenu from "../layouts/menu-cpn/BannerMenu";
import ProductGrid from "../layouts/menu-cpn/ProductGrid";
import PromoSection from "../layouts/menu-cpn/PromoSection";

const menu = () => {
  return (
    <div className="bg-pink-50 ">
      <Header />
      <BannerMenu />
      <ProductGrid />
      <PromoSection />
      <Footer />
    </div>
  );
};

export default menu;
