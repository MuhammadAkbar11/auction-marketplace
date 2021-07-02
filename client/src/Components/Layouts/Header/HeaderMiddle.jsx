import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  Badge,
  Col,
  Container,
  Nav,
  Row,
  Dropdown,
  NavLink,
} from "react-bootstrap";
import { User, Heart, UserCircle, SignOut, UserGear } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { authLogoutAuction } from "../../../actions/auth.actions";

const HeaderMiddle = () => {
  const { userInfo } = useSelector(state => state.authUser);
  const dispatch = useDispatch();

  return (
    <div className="headerMiddle">
      <Container fluid className="px-md-8 ">
        <Row>
          <Col xl={3} lg={2} className="d-flex align-items-center">
            <Link to="/" className=" display-5 mt-n2 r ">
              <h5 className="my-0 text-primary font-weight-bold">BaeBid</h5>
            </Link>
          </Col>
          <Col xl={6} lg={6}>
            <Nav className="headerMiddleNav py-4 justify-content-center flex-nowrap">
              <LinkContainer
                to="/"
                className="headerMiddleNavLink  text-uppercase"
              >
                <Nav.Link> Home</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to="/lelang"
                className="headerMiddleNavLink  text-uppercase"
              >
                <Nav.Link>Lelang</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to="/cart"
                className="headerMiddleNavLink  text-uppercase"
              >
                <Nav.Link>Terbaru</Nav.Link>
              </LinkContainer>
              {/* <LinkContainer
                to="/cart"
                className="headerMiddleNavLink  text-uppercase"
              >
                <Nav.Link> </Nav.Link>
              </LinkContainer> */}
            </Nav>
          </Col>
          <Col
            xl={3}
            lg={3}
            className="d-flex align-items-center justify-content-end "
          >
            <div className="d-flex align-items-center headerMiddleAction ">
              {userInfo ? (
                <>
                  <div className="headerMiddleActionItem  ">
                    <Link to="/akun/buat-lelang">
                      <span className="text-primary">Ingin Menjual?</span>
                    </Link>
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
                      <Heart size="32" />
                      <Badge variant="primary" className="actionBadge ">
                        3
                      </Badge>
                    </Link>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="headerMiddleActionItem userDropdownToggle"
                      variant="success"
                      id="dropdown-basic"
                      as="a"
                    >
                      <User size="32" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className=" shadow-sm ">
                      <Dropdown.Item
                        className=" d-flex align-items-center  "
                        as={Link}
                        to="/akun/dashboard"
                      >
                        <UserGear size={22} className="mr-2" /> Dashboard
                      </Dropdown.Item>
                      <Dropdown.Item
                        className=" d-flex align-items-center  "
                        as={Link}
                        to="/akun/info"
                      >
                        <UserCircle size={22} className="mr-2" /> Profile
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        className=" d-flex align-items-center  text-dark"
                        onClick={() => dispatch(authLogoutAuction())}
                      >
                        <SignOut size={22} className="mr-2" />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <div className="headerMiddleActionItem text-uppercase">
                    <Link to="/akun/daftar">Daftar</Link>
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
                  <div className="headerMiddleActionItem text-uppercase">
                    <Link to="/akun/masuk">Masuk</Link>
                  </div>
                </>
              )}
              {/* <div className="headerMiddleActionItem text-uppercase">
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
              </div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderMiddle;
