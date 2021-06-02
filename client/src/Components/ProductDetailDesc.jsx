import React from "react";
import { Col, Container, Row, Tabs, Tab, Nav } from "react-bootstrap";

const ProductDetailDesc = () => {
  const [key, setKey] = React.useState("home");
  return (
    <section className="description-review-wrapper ">
      <Container fluid className="px-md-8">
        <Row>
          <Col lg={12}>
            <Tab.Container
              id="description-tabs"
              defaultActiveKey="des-details1"
            >
              <Nav className="dec-review-topbar flex-nowrap  ">
                <Nav.Link eventKey="des-details1">Informasi Produk</Nav.Link>
                <Nav.Link eventKey="des-details2">Riwayat Penawaran</Nav.Link>
                <Nav.Link eventKey="des-details3">Diskusi produk </Nav.Link>
                <Nav.Link eventKey="des-details4">Aturan Main </Nav.Link>
              </Nav>
              <Tab.Content className="dec-review-bottom">
                <Tab.Pane eventKey="des-details1">
                  <h4 className=" font-weight-light ">Deskripsi</h4>
                </Tab.Pane>
                <Tab.Pane eventKey="des-details2">
                  <h4 className=" font-weight-light ">Riwayat Penawaran</h4>
                </Tab.Pane>
                <Tab.Pane eventKey="des-details3">
                  <h4 className=" font-weight-light ">Diskusi produk</h4>
                </Tab.Pane>
                <Tab.Pane eventKey="des-details4">
                  <h5 className=" font-weight-light ">Aturan Main</h5>
                  <div className="pt-3">
                    <ul>
                      <li>
                        Bid and Run akan di suspend dan jika berulang akan
                        banned permanen.
                      </li>
                      <li>
                        Jika pemenang bid and run maka pemenang jatuh kepada
                        bidder yang mendekati.
                      </li>
                      <li>
                        Setiap kegiatan lelang (kalah bid, lelang mau selesai,
                        dll) akan ada notifikasi.
                      </li>
                      <li>
                        Pemenang bid adalah pemenang yang melakukan bid
                        tertinggi.
                      </li>
                    </ul>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetailDesc;
