import AboutHistory from "../layouts/AboutHistory";
import AboutInfo from "../layouts/AboutInfo";
import AboutSection from "../layouts/AboutSection";
import Header from "@/assets/heefoo/heeder";
import Footer from "@/assets/heefoo/footer";

const about = () => {
  return (
    <div className="pt-28">
      <Header />
      <AboutInfo />
      <AboutHistory />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default about;
