import React from "react";
import { Container, Col, Row, ListGroup, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BreadcrumbsContainer from "../Components/Layouts/BreadcrumbsContainer";
import ProductDetailDesc from "../Components/ProductDetailDesc";
import ProductDetailImage from "../Components/ProductDetailImage";
import ProductRelatedSlider from "../Components/ProductRelatedSlider";
import SectionTitle from "../Components/SectionTitle";
import { WishListIcon } from "../Components/UI/Icons/Index";
import productsData from "../data/product";
const ProductDetail = props => {
  const { match } = props;

  const product = productsData.filter(
    item => item.id === match.params.prodId
  )[0];

  return (
    <>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Detail", active: true },
          { title: product.title, active: true },
        ]}
      />

      <section className="product-details-area pt-4 pb-115">
        <Container fluid className="px-md-8">
          <Link to="/lelang" className="btn btn-light">
            Kembali
          </Link>
          <Row className="pt-4">
            <Col lg={6} md={6}>
              <ProductDetailImage />
            </Col>
            <Col lg={6} md={6}>
              <div className="product-details-content pro-details-content-mrg ">
                <h2 className="product-title">{product.title}</h2>
                <h4 className="product-subtitle">{product.subtitle}</h4>
                <p>
                  Seamlessly predominate enterprise metrics without performance
                  based process improvements.
                </p>
                <div
                  className="pro-details-timer mt20 mb20 d-flex align-items-end"
                  title="Waktu Tersisa"
                >
                  <h2 className="text-primary  font-weight-normal my-0 mr-2 ">
                    6 Hari, 13:45:34
                  </h2>
                </div>

                <div>
                  <div className="pro-details-custom mb-4">
                    <span className="text-dark">
                      Penawaran Berakhir Pada :{" "}
                    </span>
                    <div className="pro-details-custom-content">
                      07 Jun, 2021 - 11:00
                    </div>
                  </div>
                  <div className="pro-details-custom mb-4">
                    <span className="text-dark">Kondisi :</span>
                    <div className="pro-details-custom-content">
                      Bekas dengan kondisi baik
                    </div>
                  </div>
                  <div className="pro-details-custom mb-4">
                    <span className="text-dark">Lokasi :</span>
                    <div className="pro-details-custom-content">
                      Kebayoran Lama , Jakarta Selatan , DKI Jakarta , Indonesia
                      (12310)
                    </div>
                  </div>

                  <div className="product-details-meta mb-4">
                    <ul className=" list-unstyled pl-0 ">
                      <li>
                        <span className="text-dark mr-2">Kategori :</span>{" "}
                        <a href="#">Woman,</a> <a href="#">Dress,</a>{" "}
                        <a href="#">T-Shirt</a>
                      </li>
                    </ul>
                  </div>
                  <hr />
                  <Row className="mt30 mb-4">
                    <Col className="pro-details-custom">
                      <span className="text-dark">Bid saat ini:</span>
                      <div className="pro-details-custom-content">
                        <h3
                          style={{
                            letterSpacing: 0.4,
                          }}
                          className="text-primary font-weight-normal text-capitalize "
                        >
                          Rp. 200.000
                        </h3>
                      </div>
                    </Col>
                    <Col className="pro-details-custom">
                      <span className="text-dark">Bidder tertinggi:</span>
                      <div className="pro-details-custom-content ">Dubu</div>
                    </Col>
                  </Row>
                  <hr />
                  <div>
                    {" "}
                    <p>Masukan Bid Anda</p>
                    <Form>
                      <div className="d-flex py-3" style={{ gap: 10 }}>
                        <Button variant="danger">-</Button>
                        <Form.Control />
                        <Button variant="success">+</Button>
                      </div>
                      <small>* Kelipatan Bid 10.000</small>
                      <br />
                      <Button className="mt-3">Bid Now</Button>
                    </Form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ProductDetailDesc />
      <section className="related-product">
        <Container fluid className="px-md-8">
          <SectionTitle title="Produk Terkait" actionText="See more" />
          <ProductRelatedSlider />
        </Container>
      </section>
    </>
  );
};

export default ProductDetail;
