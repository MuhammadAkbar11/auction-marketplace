import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { User, Heart } from "phosphor-react";
import { ListIcon, WishListIcon } from "../../../UI/Icons/Index";

const HeaderMobile = ({ toggle }) => {
  const { userInfo } = useSelector(state => state.authUser);
  return (
    <Container fluid className=" px-3 px-sm-5 ">
      <Row className=" align-items-center flex-nowrap ">
        <Col xs={5}>
          <div className="mobileLogo">
            <Link to="/" className=" display-6 mt-n2">
              Logo
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
                  <Link to="/akun/profile">
                    <User size="32" />
                  </Link>
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
