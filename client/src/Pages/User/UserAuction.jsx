import React from "react";
import { Col, Container, Row, Nav, Card, Tab, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import UserActiveAuctionsTab from "../../Components/UserAuctionTabs/UserActiveAuctionsTab";
import UserPlanningAuctionsTab from "../../Components/UserAuctionTabs/UserPlanningAuctionsTab";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";

import { userAuctionResetMessageAction } from "../../actions/user.actions";

const UserAuction = props => {
  const { match, location } = props;

  const tabKey = new URLSearchParams(location.search).get("tab");
  const dispatch = useDispatch();
  const { message } = useSelector(state => state.userAuction);

  // if
  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(userAuctionResetMessageAction());
      }, 7000);
    }
  }, [message]);

  return (
    <>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Akun", active: true },
          { title: "Lelang Saya", active: true },
        ]}
      />
      <Container fluid className="px-md-8 py-4">
        <Row>
          <Col md={3}>
            <UserSidebarMenu />
          </Col>
          <Col md={9}>
            <Tab.Container defaultActiveKey={tabKey ? tabKey : "default"}>
              <Card body className="py-0">
                <Nav
                  style={{
                    gap: 5,
                  }}
                  className="px-2  w-100 justify-content-center user-auction-topnav "
                  defaultActiveKey={`direncanakan`}
                >
                  {/* <Nav.Item> */}
                  <LinkContainer to={`${match.path}?`}>
                    <Nav.Link eventKey="default" className="text-center">
                      Direncanakan
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={`${match.path}?tab=active`}>
                    <Nav.Link eventKey="active" className="text-center">
                      Aktif
                    </Nav.Link>
                  </LinkContainer>
                  {/* </Nav.Item> */}
                </Nav>
              </Card>
              {message && (
                <div className="mt-4">
                  <Alert variant={message.type}>{message.text}</Alert>
                </div>
              )}
              <Tab.Content>
                <Tab.Pane eventKey="default">
                  <UserPlanningAuctionsTab />
                </Tab.Pane>
                <Tab.Pane eventKey="active">
                  <UserActiveAuctionsTab isActive={tabKey === "active"} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
            <Link to={`/akun/buat-lelang`} className="btn btn-primary mt-3">
              Buat Lelang anda
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserAuction;
