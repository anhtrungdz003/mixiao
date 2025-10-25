import ContactForm from "@/assets/layouts/ContactForm";
import Header from "@/assets/heefoo/heeder";
import Footer from "@/assets/heefoo/footer";

const ContactPage: React.FC = () => {
  return (
    <div className="pt-28">
      <Header />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default ContactPage;
