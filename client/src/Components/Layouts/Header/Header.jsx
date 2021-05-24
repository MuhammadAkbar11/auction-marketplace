import React from "react";
import HeaderBottom from "./HeaderBottom";
import HeaderMiddle from "./HeaderMiddle";
import HeaderTop from "./HeaderTop";

const Header = () => {
  return (
    <header className="headerArea ">
      <div className="headerLargeScreen">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </div>
    </header>
  );
};

export default Header;
