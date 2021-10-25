import React from "react";
import { Envelope, PaperPlaneTilt, Phone } from "phosphor-react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Layout from "../Components/Layouts/Layout";
import BreadcrumbsContainer from "../Components/Layouts/BreadcrumbsContainer.jsx";

const Contacts = () => {
  document.title = "Baebid - Kontak Kami";
  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Kontak Kami", active: true },
        ]}
      />
      <Container fluid className="px-md-8 pt-5 pb-8">
        <h2 className="mb-4 text-primary   ">Kontak Kami</h2>
        <Row className=" d-flex align-items-stretch  ">
          <Col sm={4}>
            <Card
              body
              className="d-flex bg-light border-0 flex-column justify-content-center align-items-center"
            >
              <div className="text-primary mb-3 text-center ">
                <PaperPlaneTilt size={40} className="mx-0" />
              </div>
              <h5 className="mb-2 text-primary text-spacing-1  text-center ">
                Alamat
              </h5>
              <p>Jl Jatiwaringin Jakarta Timur</p>
            </Card>
          </Col>
          <Col sm={4}>
            <Card
              body
              className="d-flex bg-light border-0 flex-column justify-content-center align-items-center"
            >
              <div className="text-primary mb-3 text-center ">
                <Phone size={40} className="mx-0" />
              </div>
              <h5 className="mb-2 text-primary text-spacing-1  text-center ">
                Telepon
              </h5>
              <p>(+62) 813 5644-2402 </p>
            </Card>
          </Col>
          <Col sm={4}>
            <Card
              body
              className="d-flex bg-light border-0 flex-column justify-content-center align-items-center"
            >
              <div className="text-primary mb-3 text-center ">
                <Envelope size={40} className="mx-0" />
              </div>
              <h5 className="mb-2 text-primary text-spacing-1  text-center ">
                Email
              </h5>
              <p>baebid@gmail.com </p>
            </Card>
          </Col>
        </Row>

        <Form>
          <Row className="pt-6">
            <Col xs={12}>
              <h2 className="mb-4 text-primary   ">Hubungi Kami</h2>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" placeholder="Nama anda" />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Alamat Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group className="mb-3" controlId="subject">
                <Form.Label>Subjek</Form.Label>
                <Form.Control type="text" placeholder="Subjek" />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Pesan</Form.Label>
                <Form.Control as="textarea" placeholder="Pesan anda" rows={3} />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Button variant="primary" type="submit">
                Kirim Pesan
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Layout>
  );
};

export default Contacts;
