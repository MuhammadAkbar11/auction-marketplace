import React from "react";

import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeaderTop = () => {
  return (
    <div className="headerTop  ">
      <Container fluid className="px-md-8">
        <Row className="align-items-center ">
          <Col xl={8} lg={7} md={6}>
            <div className="headerOfferWrap2 mrg-none">
              <p>
                {/* <span>FREE SHIPPING</span> world wide for all orders over $199 */}
              </p>
            </div>
          </Col>
          <Col xl={4} lg={5} md={6}>
            <div className="d-flex justify-content-end  ">
              <Link to="/kontak" className="my-0 text-dark mr-2">
                <small>Kontak kami</small>
              </Link>
              <Link to="/tenteng-kami" className="my-0 text-dark ">
                <small> Tentang</small>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderTop;
