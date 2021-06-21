import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
const UserDashboard = () => {
  return (
    <>
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
          <Col md={9}></Col>
        </Row>
      </Container>
    </>
  );
};

export default UserDashboard;
