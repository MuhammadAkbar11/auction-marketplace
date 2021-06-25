import React from "react";
import { Container, Col, Row, ListGroup, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAuctionDetailsAction } from "../actions/auctions.actions";
import BreadcrumbsContainer from "../Components/Layouts/BreadcrumbsContainer";
import ProductDetailDesc from "../Components/ProductDetailDesc";
import ProductDetailImage from "../Components/ProductDetailImage";
import ProductRelatedSlider from "../Components/ProductRelatedSlider";
import SectionTitle from "../Components/SectionTitle";
import { WishListIcon } from "../Components/UI/Icons/Index";
import Loader from "../Components/UI/Loader";

const DetailsAuction = props => {
  const { match } = props;
  const dispatch = useDispatch();
  const { auction, loading } = useSelector(state => state.auctionDetails);

  React.useEffect(() => {
    dispatch(getAuctionDetailsAction(match.params?.itemId));
  }, []);

  return (
    <>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Detail", active: true },
          { title: auction?.judul || "", active: true },
        ]}
      />

      <section className="product-details-area pt-4 pb-115">
        <Container fluid className="px-md-8">
          <Link to="/lelang" className="btn btn-light">
            Kembali
          </Link>
          <Row className="pt-4">
            <Col lg={6} md={6}>
              {loading ? (
                <div className="mt-4">
                  <Loader size={50} />
                </div>
              ) : (
                <ProductDetailImage
                  loading={loading}
                  images={auction?.gambar}
                />
              )}
            </Col>
            <Col lg={6} md={6}>
              <div className="product-details-content pro-details-content-mrg ">
                <h2 className="product-title">{auction?.judul}</h2>
                {/* <h4 className="product-subtitle">{product.subtitle}</h4> */}
                {/* <p>
                  Seamlessly predominate enterprise metrics without performance
                  based process improvements.
                </p> */}
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
                      {auction?.tgl_selesai || "..loading"}
                    </div>
                  </div>
                  <div className="pro-details-custom mb-4">
                    <span className="text-dark">Kondisi :</span>
                    <div className="pro-details-custom-content">
                      {auction?.status_brg || "...loading"}
                    </div>
                  </div>
                  {/* <div className="pro-details-custom mb-4">
                    <span className="text-dark">Lokasi :</span>
                    <div className="pro-details-custom-content">
                      Kebayoran Lama , Jakarta Selatan , DKI Jakarta , Indonesia
                      (12310)
                    </div>
                  </div> */}

                  <div className="product-details-meta mb-4">
                    <ul className=" list-unstyled pl-0 ">
                      <li>
                        <span className="text-dark mr-2">Kategori :</span>{" "}
                        <Link to={`/kategori/${auction?.id_kategori}`}>
                          {auction?.kategori || "...loading"}
                        </Link>
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
                          {" "}
                          {auction?.tawaran_saat_ini
                            ? "Rp. " + auction?.tawaran_saat_ini?.nilai_tawaran
                            : "-" || "...loading"}
                        </h3>
                      </div>
                    </Col>
                    <Col className="pro-details-custom">
                      <span className="text-dark">Bidder tertinggi:</span>
                      <div className="pro-details-custom-content ">
                        {auction?.tawaran_saat_ini
                          ? auction?.tawaran_saat_ini?.member?.username
                          : "-" || "...loading"}
                      </div>
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
      <ProductDetailDesc loading={loading} auction={auction} />
      {/* <section className="related-product">
        <Container fluid className="px-md-8">
          <SectionTitle title="Produk Terkait" actionText="See more" />
          <ProductRelatedSlider />
        </Container>
      </section> */}
    </>
  );
};

export default DetailsAuction;
