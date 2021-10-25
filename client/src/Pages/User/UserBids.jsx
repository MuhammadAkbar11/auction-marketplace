import React from "react";
import { Col, Container, Row, Nav, Card, Tab, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { userResetPurchaseMessage } from "../../actions/user.purchase.actions";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import Layout from "../../Components/Layouts/Layout";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import UserMyBidsTab from "../../Components/UserMyPurchaseTabs/UserMyBidsTab";
import UserWinAuctionsTab from "../../Components/UserMyPurchaseTabs/UserWinAuctionsTab";

const MyBid = props => {
  document.title = "Baebid - Pembelian Saya";

  const { match, location } = props;

  const tabKey = new URLSearchParams(location.search).get("tab");

  const dispatch = useDispatch();
  const { message } = useSelector(state => state.userWinsAuction);
  // const message = null;
  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Akun", active: true },
          { title: "Pembelian Saya", active: true },
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
                  defaultActiveKey={`wins`}
                >
                  {/* <Nav.Item> */}
                  <LinkContainer to={`${match.path}?`}>
                    <Nav.Link eventKey="default" className="text-center">
                      Dimenangkan
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={`${match.path}?tab=mybids`}>
                    <Nav.Link eventKey="mybids" className="text-center">
                      Tawaran saya
                    </Nav.Link>
                  </LinkContainer>
                  {/* </Nav.Item> */}
                </Nav>
              </Card>
              {message.show && (
                <div className="mt-4">
                  <Alert
                    variant={message.type}
                    onClose={() => dispatch(userResetPurchaseMessage())}
                    dismissible
                  >
                    {message.text}
                  </Alert>
                </div>
              )}
              <Tab.Content>
                <Tab.Pane eventKey="default">
                  <UserWinAuctionsTab isActive={tabKey === null} />
                </Tab.Pane>
                <Tab.Pane eventKey="mybids">
                  <UserMyBidsTab isActive={tabKey === "mybids"} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default MyBid;
