// src/pages/News.tsx
import React from "react";
import NewsList from "@/assets/layouts/NewsList";
import Header from "@/assets/heefoo/heeder";
import Footer from "@/assets/heefoo/footer";

const News: React.FC = () => {
  return (
    <div>
      <Header />
      <NewsList />
      <Footer />
    </div>
  );
};

export default News;
