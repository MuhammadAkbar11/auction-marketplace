import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Form } from "react-bootstrap";
import BreadcrumbsContainer from "../Components/Layouts/BreadcrumbsContainer";
import ListAuctionSidebar from "../Components/ListAuctionSidebar";
import ProductCard from "../Components/ProductCard";

import { ListIcon, SquaresFourIcon } from "../Components/UI/Icons/Index";
import productsData from "../data/product";
import { getListAuctionAction } from "../actions/auctions.actions";
import Loader from "../Components/UI/Loader";

const ListAuction = () => {
  const products = productsData;
  const dispatch = useDispatch();
  const { loading, auctions } = useSelector(state => state.auctionList);

  React.useEffect(() => {
    dispatch(getListAuctionAction());
  }, []);
  return (
    <>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Daftar Lelang", url: "/lelang", active: true },
        ]}
      />

      <section className="shop-area">
        <Container fluid className="px-md-8">
          <Row className=" flex-row-reverse ">
            <Col lg={9}>
              <Row className="shop-topbar-wrapper">
                <Col className=" d-flex align-items-center">
                  <div className="shop-topbar-left">
                    <div className="view-mode d-flex">
                      <a className="active">
                        <SquaresFourIcon />
                      </a>
                      <a href="#shop-2">
                        <ListIcon />
                      </a>
                    </div>
                    <p className="text-nowrap">Showing 1 - 20 of 30 results </p>
                  </div>
                </Col>
                <Col className="h-10  py-0 d-flex align-items-center flex-nowrap ">
                  {" "}
                  <Form.Group className="d-flex h-100  w-100 align-items-center flex-nowrap my-0">
                    <Form.Label className=" text-nowrap my-auto">
                      View :
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      as="select"
                      className="bg-transparent border ml-2"
                    >
                      <option value=""> 20</option>
                      <option value=""> 23</option>
                      <option value=""> 30</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col className="h-10  py-0 d-flex align-items-center flex-nowrap ">
                  {" "}
                  <Form.Group className="d-flex h-100  w-100 align-items-center flex-nowrap my-0">
                    <Form.Label className=" text-nowrap my-auto ">
                      Sort By :
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      as="select"
                      className="bg-transparent border ml-2"
                    >
                      <option value=""> 20</option>
                      <option value=""> 23</option>
                      <option value=""> 30</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="top-bottom-area">
                {loading ? (
                  <div className=" d-flex w-100 justify-content-center ">
                    {" "}
                    <Loader variant="primary" />
                  </div>
                ) : auctions.length === 0 ? (
                  <div>
                    <h2>Belum ada lelang</h2>
                  </div>
                ) : (
                  <>
                    {auctions.map(auction => {
                      return (
                        <Col
                          key={auction.id_lelang}
                          xs={6}
                          sm={6}
                          md={6}
                          lg={3}
                          xl={3}
                        >
                          <ProductCard auction={auction} />
                        </Col>
                      );
                    })}
                  </>
                )}
              </Row>
            </Col>
            <Col lg={3}>
              <ListAuctionSidebar />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ListAuction;
