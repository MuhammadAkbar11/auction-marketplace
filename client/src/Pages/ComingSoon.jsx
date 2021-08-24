import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Components/Layouts/Header/HeaderMiddle";

const ComingSoon = () => {
  return (
    <main className="coming-soon-wrapper">
      <Header />
      <Container fluid className="h-100 ">
        <Row className="h-100  justify-content-center align-items-center">
          <Col md={8} lg={8} className="mx-auto">
            <h1 className=" coming-soon-title text-primary font-weight-bolder text-center ">
              Coming Soon
            </h1>
            <h5 className="text-center text-primary text-gray-700 font-weight-normal text-capitalize  ">
              Halaman Ini Sedang Tahap Pembuatan
            </h5>
            <div className="w-100 text-center ">
              <Link to="/" className="mt-3 mx-auto btn btn-primary">
                Ke Beranda
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ComingSoon;
