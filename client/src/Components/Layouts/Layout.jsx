import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="main-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
