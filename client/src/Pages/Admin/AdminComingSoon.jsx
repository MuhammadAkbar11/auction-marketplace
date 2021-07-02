import React from "react";
import AdminLayout from "../../Components/AdmnLayouts/AdminLayout";
// import { Users, Hand, Handshake } from "phosphor-react";
import { Container, Row, Col } from "react-bootstrap";
const AdminComingSoon = () => {
  return (
    <AdminLayout>
      <Container fluid>
        <Row className="pt-6">
          <Col sm={10} className="mx-auto text-center ">
            <h4>Coming Soon</h4>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default AdminComingSoon;
