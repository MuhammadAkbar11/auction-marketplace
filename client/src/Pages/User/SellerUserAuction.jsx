import React from "react";
import { Col, Container, Row, Nav, Card, Tab, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import UserActiveAuctionsTab from "../../Components/UserAuctionTabs/UserActiveAuctionsTab";
import UserPlanningAuctionsTab from "../../Components/UserAuctionTabs/UserPlanningAuctionsTab";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import Layout from "../../Components/Layouts/Layout";
import UserSoldOutTab from "../../Components/UserAuctionTabs/UserSoldOutAuctionsTab";
import UserPaymentProofTab from "../../Components/UserAuctionTabs/UserPaymentProofTab";
import {
  getUserAuctionAction,
  getUserAuctionsActiveAction,
  userAuctionCloseAction,
  userAuctionDeleteAction,
  userAuctionResetMessageAction,
} from "../../actions/user.actions";
import UserCompleteListAuctionTab from "../../Components/UserAuctionTabs/UserCompleteListAuctionTab";

const UserAuction = props => {
  document.title = "Baebid - Lelang Saya";

  const { match, location } = props;

  const tabKey = new URLSearchParams(location.search).get("tab");
  const dispatch = useDispatch();
  const { details } = useSelector(state => state.userDetails);
  const { message } = useSelector(state => state.userAuction);
  const userAuctionState = useSelector(state => state.userAuction);
  const planAuctions = userAuctionState?.planning;
  const activeAuctions = userAuctionState?.active;

  const deleteAuction = useSelector(state => state.userDeleteAuction);
  const closeAuctionState = useSelector(state => state.userCloseAuction);

  React.useEffect(() => {
    if (tabKey === "active") {
      dispatch(getUserAuctionsActiveAction());
    }

    dispatch(getUserAuctionAction());
  }, [tabKey, dispatch]);

  // if
  React.useEffect(() => {
    if (message) {
      if (tabKey === "active") {
        dispatch(getUserAuctionsActiveAction());
      }

      dispatch(getUserAuctionAction());
      setTimeout(() => {
        dispatch(userAuctionResetMessageAction());
      }, 7000);
    }
  }, [message, tabKey, dispatch]);

  const handleDelete = id => {
    // console.log(object);
    dispatch(userAuctionDeleteAction(id));
  };

  const handleClose = id => {
    dispatch(userAuctionCloseAction(id));
  };

  return (
    <Layout>
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
                  <LinkContainer to={`${match.path}?tab=complete`}>
                    <Nav.Link eventKey="complete" className="text-center">
                      Selesai
                    </Nav.Link>
                  </LinkContainer>
                  {/* <LinkContainer to={`${match.path}?tab=shipping`}>
                    <Nav.Link eventKey="pengiriman" className="text-center">
                      Pengirimain
                    </Nav.Link>
                  </LinkContainer> */}
                  <LinkContainer to={`${match.path}?tab=sold`}>
                    <Nav.Link eventKey="sold" className="text-center">
                      Barang Terjual
                    </Nav.Link>
                  </LinkContainer>
                  {/* </Nav.Item> */}
                </Nav>
              </Card>
              {details?.akun_bank?.length === 0 && (
                <Alert className="my-4" variant="warning">
                  Silahkan tambahkan akun rekening anda di halaman info akun,
                  agar dapat melakukan konfirmasi pemenang
                </Alert>
              )}
              {message && (
                <div className="mt-4">
                  <Alert variant={message.type}>{message.text}</Alert>
                </div>
              )}
              <Tab.Content>
                <Tab.Pane eventKey="default">
                  <UserPlanningAuctionsTab
                    auctions={planAuctions}
                    delLoading={deleteAuction.loading}
                    handleDelete={handleDelete}
                  />
                  <Link
                    to={`/akun/buat-lelang`}
                    className="btn btn-primary mt-3"
                  >
                    Buat Lelang anda
                  </Link>
                </Tab.Pane>
                <Tab.Pane eventKey="active">
                  <UserActiveAuctionsTab
                    auctions={activeAuctions}
                    isActive={tabKey === "active"}
                    delLoading={deleteAuction.loading}
                    closeLoading={closeAuctionState.loading}
                    handleDelete={handleDelete}
                    handleClose={handleClose}
                  />
                  <Link
                    to={`/akun/buat-lelang`}
                    className="btn btn-primary mt-3"
                  >
                    Buat Lelang anda
                  </Link>
                </Tab.Pane>
                <Tab.Pane eventKey="complete">
                  <UserCompleteListAuctionTab
                    isActive={tabKey === "complete"}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="shipping">
                  <UserPaymentProofTab
                    isActive={tabKey === "shipping"}
                    closeLoading={closeAuctionState.loading}
                    handleClose={handleClose}
                  />
                </Tab.Pane>

                <Tab.Pane eventKey="sold">
                  <UserSoldOutTab
                    // auctions={soldOut}
                    isActive={tabKey === "sold"}
                    closeLoading={closeAuctionState.loading}
                    handleClose={handleClose}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default UserAuction;
