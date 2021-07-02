import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Col, Container, Row, Dropdown } from "react-bootstrap";
import { User, Heart, UserCircle, SignOut, UserGear } from "phosphor-react";
import { ListIcon, WishListIcon } from "../../../UI/Icons/Index";
import { authLogoutAuction } from "../../../../actions/auth.actions";

const HeaderMobile = ({ toggle }) => {
  const { userInfo } = useSelector(state => state.authUser);
  const dispatch = useDispatch();
  return (
    <Container fluid className=" px-3 px-sm-5 ">
      <Row className=" align-items-center flex-nowrap ">
        <Col xs={5}>
          <div className="mobileLogo">
            <Link to="/" className=" display-6 mt-n2">
              <h5 className="my-0 text-primary font-weight-bold">BaeBid</h5>
            </Link>
          </div>
        </Col>
        <Col xs={7}>
          <div className="d-flex flex-nowrap  justify-content-end align-items-center headerMiddleAction ">
            {userInfo ? (
              <>
                <div className="headerMiddleActionItem">
                  <Link to="/favorit">
                    <Heart size="32" />
                    <Badge variant="primary" className="actionBadge ">
                      3
                    </Badge>
                  </Link>
                </div>
                <div className="headerMiddleActionItem mr-1">
                  {/* <Link to="/akun/profile">
                    <User size="32" />
                  </Link> */}
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
                </div>
              </>
            ) : (
              <>
                <div className="headerMiddleActionItem text-uppercase">
                  <Link to="/akun/daftar">Daftar</Link>
                </div>
                <div className="headerMiddleActionItem text-uppercase border-left border-gray-500 ">
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
              </>
            )}

            <div className="headerMiddleActionItem">
              <a href="/#" onClick={toggle}>
                <ListIcon size="32" />
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderMobile;
