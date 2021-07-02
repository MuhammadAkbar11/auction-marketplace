import React from "react";
import { useSelector } from "react-redux";
import { Button, Form, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MagnifyingGlassIcon, TimesIcon } from "../../../UI/Icons/Index";
import MobileMenuCategori from "./MobileMenuCategori";

const HeaderMobileMenu = ({ show, toggle }) => {
  const [categoriNavActive, setCategoriNavActive] = React.useState(false);
  const { categories } = useSelector(state => state.categories);
  const toggleCategoriNav = e => {
    e.preventDefault();

    setCategoriNavActive(prevState => (prevState ? false : true));
  };

  return (
    <div className={`mobileMenu ${show && "sidebarVisible"}`}>
      <div className="clickalbeSidebarWrap">
        <a href="/#" className="sidebarClose " onClick={toggle}>
          {" "}
          <TimesIcon size="30" />
        </a>
        <div className="mobileHeaderContentArea">
          <div className="mobileHeaderTitle mobileHeaderPaddingBorder4">
            {/* <p>
              <span>FREE SHIPPING</span> world wide for all orders over $199
            </p> */}
          </div>
          <div className="mobileSearch mobileHeaderPaddingBorder1">
            <Form
              action="#"
              className="d-flex align-items-stretch h-auto py-0 border"
            >
              <Form.Control
                type="text"
                placeholder="Search here…"
                className="h-auto my-0"
              />
              <Button variant="gray-200  border-left border-gray-400">
                <MagnifyingGlassIcon size={25} />
              </Button>
            </Form>
          </div>
          <div className=" mobileHeaderPaddingBorder2 px-0">
            <Nav
              defaultActiveKey="/home"
              className="flex-column mobileMenuNav px-0 "
            >
              <LinkContainer to="/cart" className="mobileMenuNavLink ">
                <Nav.Link> Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart" className="mobileMenuNavLink ">
                <Nav.Link> Lelang</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart" className="mobileMenuNavLink ">
                <Nav.Link> Terbaru</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart" className="mobileMenuNavLink ">
                <Nav.Link> Tentang Kami</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart" className="mobileMenuNavLink ">
                <Nav.Link> Kontak</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart" className="mobileMenuNavLink ">
                <Nav.Link> Syarat dan Kententuan</Nav.Link>
              </LinkContainer>
            </Nav>
          </div>
          <MobileMenuCategori
            categories={categories}
            open={categoriNavActive}
            toggle={toggleCategoriNav}
          />
          <div className=" mobileHeaderPaddingBorder3 px-0"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobileMenu;
