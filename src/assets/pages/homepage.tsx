import Banner from "@/assets/layouts/banner";
import MenuHot from "../layouts/menuHot";
import CustomerReviews from "../layouts/CustomerReviews";
import BlogPreview from "../layouts/BlogPreview";
import PromoBanner from "../layouts/PromoBanner";
import BannerIntro from "../layouts/BannerIntro";
import Header from "@/assets/heefoo/heeder";
import Footer from "@/assets/heefoo/footer";

const homepage = () => {
  return (
    <div>
      <Header />
      <Banner />
      <MenuHot />
      <PromoBanner/>
      <BlogPreview />
      <BannerIntro/>
      <CustomerReviews />
      <Footer />
    </div>
  );
};

export default homepage;
