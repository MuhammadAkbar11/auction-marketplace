import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = ({ children }) => {
  React.useEffect(() => {
    return () => {
      document.title = "Baebid - Loading...";
    };
  }, []);
  return (
    <div className="main-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
