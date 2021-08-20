import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import Layout from "../../Components/Layouts/Layout";

const UserEmptyPage = () => {
  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Empty page", active: true },
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
    </Layout>
  );
};

export default UserEmptyPage;
