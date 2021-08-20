import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import BreadcrumbsContainer from "../Components/Layouts/BreadcrumbsContainer";
import ListAuctionSidebar from "../Components/ListAuctionSidebar";
import ProductCard from "../Components/ProductCard";
// import { ListIcon, SquaresFourIcon } from "../Components/UI/Icons/Index";
import { getListAuctionAction } from "../actions/auctions.actions";
import Loader from "../Components/UI/Loader";
import Layout from "../Components/Layouts/Layout";

const ListAuction = () => {
  const dispatch = useDispatch();
  const {
    loading,
    loadingMore,
    auctions,
    result,
    filter,
    skip,
    totalItem,
    categoryId,
    totalShowing,
  } = useSelector(state => state.auctionList);
  const { categories } = useSelector(state => state.categories);

  const [filterValue, setFilterValue] = React.useState("all");

  const loadAuctions = ({
    isLoadMore = false,
    order = "ASC",
    sort = "_id",
    skip = 0,
    filterBy = "all",
    result = 8,
    categoryId = null,
  }) => {
    dispatch(
      getListAuctionAction(isLoadMore, {
        order,
        sort,
        skip,
        filter: filterBy,
        result,
        categoryId,
      })
    );
  };

  React.useEffect(() => {
    loadAuctions({ isLoadMore: false });
  }, []);

  const onLoadMore = () => {
    const variables = {
      result: 8,
      skip: +skip + +result,
      categoryId: categoryId,
      filter: filterValue,
    };
    dispatch(getListAuctionAction(true, variables));
  };
  const onChangeFilter = e => {
    const value = e.target.value;
    setFilterValue(value);
    loadAuctions({
      isLoadMore: false,
      result: 8,
      skip: 0,
      categoryId: categoryId,
      filterBy: value,
    });
  };

  const onSortByCategory = id => {
    if (id === "ALL") {
      loadAuctions({ isLoadMore: false });
    } else {
      loadAuctions({
        isLoadMore: false,
        result: 8,
        skip: 0,
        categoryId: [id],
        filterBy: filterValue,
      });
    }
  };

  return (
    <Layout>
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
                    {/* <div className="view-mode d-flex">
                      <a className="active">
                        <SquaresFourIcon />
                      </a>
                      <a href="#shop-2">
                        <ListIcon />
                      </a>
                    </div> */}
                    <p className="text-nowrap">
                      Showing {totalShowing} of {totalItem} results{" "}
                    </p>
                  </div>
                </Col>
                {/* <Col className="h-10  py-0 d-flex align-items-center flex-nowrap ">
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
                      <option value=""> A - Z</option>
                      <option value=""> Z - A</option>

                    </Form.Control>
                  </Form.Group>
                </Col> */}

                <Col className="h-10  py-0 d-flex align-items-center flex-nowrap ">
                  {" "}
                  <Form.Group className="d-flex h-100  w-100 align-items-center flex-nowrap my-0">
                    <Form.Label className=" text-nowrap my-auto ">
                      Filter by :
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      as="select"
                      value={filterValue}
                      className="bg-transparent border ml-2"
                      onChange={onChangeFilter}
                    >
                      <option value="all">Semua</option>
                      <option value="active">Lelang Aktif</option>
                      <option value="latest">Terbaru</option>
                      <option value="endSoon">Segera Berakhir</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="top-bottom-area">
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
            </Col>
            <Col lg={3}>
              <ListAuctionSidebar
                categories={categories}
                onSortByCategory={onSortByCategory}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default ListAuction;
