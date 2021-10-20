import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import ProductCard from "../Components/ProductCard";
import Layout from "../Components/Layouts/Layout";
import BreadcrumbsContainer from "../Components/Layouts/BreadcrumbsContainer";
import Loader from "../Components/UI/Loader";
import SectionTitle from "../Components/SectionTitle";
import {
  getLatestAuctionAction,
  getListAuctionByCategoryAction,
} from "../actions/auctions.actions";

const ListLatestAuctionPage = props => {
  const { match, history } = props;
  const slugQuery = match.params.slug;

  const dispatch = useDispatch();
  const {
    category,
    loading,
    loadingMore,
    auctions,
    result,
    skip,
    totalItem,
    totalShowing,
  } = useSelector(state => state.auctionsLatest);

  const loadAuctions = ({
    isLoadMore = false,
    orderBy = "ASC",
    sortBy = "_id",
    skipBy = 0,
    resultBy = 12,
  }) => {
    dispatch(
      getLatestAuctionAction(isLoadMore, {
        skip: skipBy,
        result: resultBy,
        filter: "latest",
      })
    );
  };

  React.useEffect(() => {
    loadAuctions({ isLoadMore: false });
  }, []);

  const onLoadMore = () => {
    const variables = {
      resultBy: 12,
      skipBy: +skip + +result,
      isLoadMore: true,
      filter: "latest",
    };
    loadAuctions(variables);
    // dispatch(getListAuctionAction(true, variables));
  };

  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Lelang Terbaru", active: true },
        ]}
      />

      <div className="product-area">
        <Container fluid className="px-md-8 mt-6">
          <SectionTitle
            title={"Lelang Terbaru"}
            actionText="Back"
            actionLink={"/"}
          />
          <Row>
            {loading ? (
              <Col
                xs={12}
                className=" mt-4 d-flex w-100 justify-content-center "
              >
                {" "}
                <Loader variant="primary" size={50} />
              </Col>
            ) : auctions.length === 0 ? (
              <Col xs={12} className="mt-4 d-flex justify-content-center  ">
                <h5 className="text-black-50 text-capitalize text-spacing-0 ">
                  Belum ada lelang
                </h5>
              </Col>
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
                <Col xs={12} className=" my-2">
                  <p className="text-nowrap text-center">
                    Showing {totalShowing} of {totalItem} results{" "}
                  </p>
                </Col>
                {loadingMore ? (
                  <Col
                    xs={12}
                    className=" d-flex w-100 justify-content-center "
                  >
                    {" "}
                    <Loader variant="primary" size={15} />
                  </Col>
                ) : (
                  totalShowing < totalItem && (
                    <Col xs={12} className="text-center ">
                      <Button
                        onClick={onLoadMore}
                        size={"sm"}
                        variant="outline-primary"
                      >
                        Load More
                      </Button>
                    </Col>
                  )
                )}
              </>
            )}
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default ListLatestAuctionPage;
