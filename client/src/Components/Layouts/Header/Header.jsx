import React from "react";
import HeaderBottom from "./HeaderBottom";
import HeaderMiddle from "./HeaderMiddle";
import HeaderMobile from "./HeaderMobile/HeaderMobile";
import HeaderMobileMenu from "./HeaderMobile/HeaderMobileMenu";
import HeaderTop from "./HeaderTop";

const Header = () => {
  const [showMobileMenu, setMobileMenu] = React.useState(false);

  const toggleMobileMenu = e => {
    e.preventDefault();

    setMobileMenu(prevState => (prevState ? false : true));
  };

  return (
    <>
      <header className="headerArea ">
        <div className="headerLargeScreen">
          <HeaderTop />
          <HeaderMiddle />
          <HeaderBottom />
        </div>
        <div className="headerSmallScreen">
          <HeaderMobile toggle={toggleMobileMenu} />
        </div>
      </header>
      <HeaderMobileMenu show={showMobileMenu} toggle={toggleMobileMenu} />
    </>
  );
};

export default Header;
