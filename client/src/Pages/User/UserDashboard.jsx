import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDashAuctions } from "../../actions/user.dashboard.actions";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import Layout from "../../Components/Layouts/Layout";
import SimpleWidgetCard from "../../Components/UI/Cards/SimpleWidgetCard";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
const UserDashboard = () => {
  const { userInfo } = useSelector(state => state.authUser);
  const { auctions } = useSelector(state => state.userDashboard);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserDashAuctions());
  }, []);

  const handleHover = e => {
    const target = e.target;

    const currClassName = e.target.className;
    console.log(target, currClassName);
  };

  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Dashboard", active: true },
        ]}
      />
      <Container fluid className="px-md-8 py-4">
        <Row>
          <Col md={3}>
            <UserSidebarMenu />
          </Col>
          <Col md={9}>
            <h5 className="text-capitalize text-dark text-spacing-1">
              Hay, {userInfo?.username}
            </h5>
            <Row className="pt-3">
              <Col sm={6} md={4} className="mb-2">
                <SimpleWidgetCard
                  color="gray-300"
                  variant="outlined"
                  value={{
                    text: auctions?.all?.count,
                    className: "text-primary",
                  }}
                  caption={{
                    className: "text-gray-600",
                    text: "Total Lelang",
                  }}
                />
              </Col>
              <Col sm={6} md={4} className="mb-2">
                <SimpleWidgetCard
                  color="gray-300"
                  variant="outlined"
                  value={{
                    text: auctions?.active?.count,
                    className: "text-primary",
                  }}
                  caption={{
                    className: "text-gray-600",
                    text: "Lelang Aktf",
                  }}
                />
              </Col>
              <Col sm={6} md={4} className="mb-2">
                <SimpleWidgetCard
                  color="gray-300"
                  variant="outlined"
                  value={{
                    text: auctions?.sold_out?.count,
                    className: "text-primary",
                  }}
                  caption={{
                    className: "text-gray-600",
                    text: "Terjual",
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={6}>
                <Card body>
                  <p>Buat Lelang</p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default UserDashboard;
