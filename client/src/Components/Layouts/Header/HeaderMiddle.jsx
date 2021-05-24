import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Badge, Col, Container, Nav, Row } from "react-bootstrap";
import { WishListIcon } from "../../UI/Icons/Index";

const HeaderMiddle = () => {
  return (
    <div className="headerMiddle">
      <Container fluid className="px-md-8 ">
        <Row>
          <Col xl={3} lg={2} className="d-flex align-items-center">
            <Link to="/" className=" display-6 mt-n2 text-pink">
              Logo
            </Link>
          </Col>
          <Col xl={6} lg={6}>
            <Nav className="headerMiddleNav py-4 justify-content-center flex-nowrap">
              <LinkContainer
                to="/cart"
                className="headerMiddleNavLink  text-uppercase"
              >
                <Nav.Link> Home</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to="/cart"
                className="headerMiddleNavLink  text-uppercase"
              >
                <Nav.Link> Daftar Lelang</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to="/cart"
                className="headerMiddleNavLink  text-uppercase"
              >
                <Nav.Link> Cart</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to="/cart"
                className="headerMiddleNavLink  text-uppercase"
              >
                <Nav.Link> Cart</Nav.Link>
              </LinkContainer>
            </Nav>
          </Col>
          <Col
            xl={3}
            lg={3}
            className="d-flex align-items-center justify-content-end "
          >
            <div className="d-flex align-items-center headerMiddleAction ">
              <div className="headerMiddleActionItem text-uppercase">
                <Link to="/daftar">Daftar</Link>
              </div>
              <div className="headerMiddleActionItem text-uppercase border-left border-gray-500">
                {" "}
                <span
                  className=" mr-n1 "
                  style={{
                    opacity: 0,
                  }}
                >
                  .
                </span>
              </div>
              <div className="headerMiddleActionItem">
                <Link to="/favorit">
                  <WishListIcon size="32" />
                  <Badge variant="primary" className="actionBadge ">
                    3
                  </Badge>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderMiddle;
