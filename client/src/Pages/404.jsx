import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const PageNotFound = () => {
  return (
    <main className="page-404-main">
      <Container fluid className="h-100 ">
        <Row className="h-100  justify-content-center align-items-center">
          <Col md={8} lg={8} className="mx-auto">
            <h1 className=" page-404-title text-primary font-weight-bolder text-center ">
              404
            </h1>
            <h2 className="text-center">Halaman Tidak Dapat Ditemukan</h2>
            <div className="w-100 text-center ">
              <Link to="/" className="mt-3 mx-auto btn btn-outline-primary">
                Ke Beranda
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default PageNotFound;
