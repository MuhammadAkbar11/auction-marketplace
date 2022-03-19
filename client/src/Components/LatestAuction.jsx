import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { CaretLeftIcon, CaretRightIcon } from "./UI/Icons/Index";
import SectionTitle from "./SectionTitle";
import { useDispatch } from "react-redux";
import { getSliderLatestAuctionAction } from "../actions/auctions.actions";
import Loader from "./UI/Loader";
import { Triangle } from "phosphor-react";

SwiperCore.use([Navigation]);
const singleProductWrapVariants = {
  open: {
    opacity: 1,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  },
};

const productImgVariants = {
  hover: {
    scale: 1.2,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  },
};

const LatestAuction = () => {
  const navigationNextRef = React.useRef(null);
  const navigationPrevRef = React.useRef(null);

  const navigationMobileNextRef = React.useRef(null);
  const navigationMobilePrevRef = React.useRef(null);

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [latestAuction, setLatestAuction] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    dispatch(
      getSliderLatestAuctionAction({
        filter: "latest",
        result: 12,
        categoryId: null,
      })
    ).then(auction => {
      setLoading(false);
      setLatestAuction(auction);
    });
  }, [dispatch]);

  return (
    <>
      <Container fluid className="px-md-8 mt-6">
        <SectionTitle title="Lelang Terbaru" actionText="Semua Produk" />
        {loading ? (
          <div className=" d-flex w-100 justify-content-center ">
            {" "}
            <Loader variant="primary" size={28} />
          </div>
        ) : latestAuction?.length === 0 ? (
          <div className="d-flex justify-content-center w-100">
            <h5 className=" text-black-50 text-capitalize text-spacing-0 ">
              Belum ada lelang terbaru
            </h5>
          </div>
        ) : (
          <>
            {latestAuction.length <= 5 ? (
              <Row>
                {latestAuction.map(item => {
                  return (
                    <Col xs={6} md={3} className="mt-3">
                      <div className="product-plr-1">
                        <motion.div
                          variants={singleProductWrapVariants}
                          initial={false}
                          animate="open"
                          whileHover="hover"
                          className="single-product-wrap"
                        >
                          <div className="product-img product-img-latest w-100 mb15">
                            <Link to={`/item/${item.id_lelang}`}>
                              <motion.img
                                variants={productImgVariants}
                                src={item.gambar[0]?.url}
                                alt="test"
                              />
                            </Link>
                          </div>
                          <div
                            className="product-content-wrap-3 "
                            style={{ width: "100%" }}
                          >
                            <div className="product-content-categories">
                              <Link
                                className="purple"
                                to={`/kategori/${item?.kategori?.slug}`}
                              >
                                {item.kategori?.kategori}
                              </Link>
                            </div>
                            <h3>
                              <Link
                                className="purple"
                                to={`/item/${item.id_lelang}`}
                              >
                                {item.judul}
                              </Link>
                            </h3>

                            <div className="product-price-4 py-2">
                              <small className="text-dark">Bid saat ini </small>
                              <br />
                              <span className="text-primary">
                                Rp.{" "}
                                {item.tawaran.length !== 0
                                  ? item.tawaran[0].nilai_tawaran
                                  : item.hrg_awal}
                              </span>
                            </div>
                          </div>
                          <div
                            className="product-content-wrap-3 product-content-position-2 px-2"
                            style={{ width: "103%" }}
                          >
                            <div className="product-content-categories">
                              <Link
                                className="purple"
                                to={`/kategori/${item?.kategori?.slug}`}
                              >
                                {item.kategori?.kategori}
                              </Link>
                            </div>
                            <h3>
                              <Link
                                className="purple"
                                to={`/item/${item.id_lelang}`}
                              >
                                {item.judul}
                              </Link>
                            </h3>

                            <div className="product-price-4 py-2">
                              <small className="text-dark">Bid saat ini </small>
                              <br />
                              <span className="text-primary">
                                Rp.{" "}
                                {item?.tawaran.length !== 0
                                  ? item?.tawaran[0].nilai_tawaran
                                  : item.hrg_awal}
                              </span>
                            </div>
                            <div className="d-flex flex-column ">
                              <small className="">Berakhir pada</small>
                              <small className="">{item.tgl_selesai}</small>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <Swiper
                slidesPerGroup={1}
                loop={true}
                breakpoints={{
                  200: {
                    slidesPerView: 1,
                  },
                  360: {
                    slidesPerView: 1,
                  },
                  575: {
                    slidesPerView: 2,
                  },
                  767: {
                    slidesPerView: 3,
                  },
                  991: {
                    slidesPerView: 5,
                  },
                  1999: {
                    slidesPerView: 6,
                  },
                }}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                slidesPerView={6}
                onSwiper={swiper => {
                  setTimeout(() => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.params.navigation.prevEl =
                      navigationMobilePrevRef.current;
                    swiper.params.navigation.nextEl =
                      navigationMobileNextRef.current;
                    swiper.navigation.destroy();
                    swiper.navigation.init();
                    swiper.navigation.update();
                  });
                }}
                className="latest-product-slider"
              >
                {latestAuction.map(item => {
                  return (
                    <SwiperSlide
                      key={item.id_lelang}
                      className="product-plr-1 "
                    >
                      <motion.div
                        variants={singleProductWrapVariants}
                        initial={false}
                        animate="open"
                        whileHover="hover"
                        className="single-product-wrap"
                      >
                        <div className="product-img product-img-latest w-100 mb15">
                          <Link to={`/item/${item.id_lelang}`}>
                            <motion.img
                              variants={productImgVariants}
                              src={item.gambar[0]?.url}
                              alt="test"
                            />
                          </Link>
                        </div>
                        <div
                          className="product-content-wrap-3 "
                          style={{ width: "100%" }}
                        >
                          <div className="product-content-categories">
                            <Link
                              className="purple"
                              to={`/kategori/${item?.kategori?.slug}`}
                            >
                              {item.kategori?.kategori}
                            </Link>
                          </div>
                          <h3>
                            <Link
                              className="purple"
                              to={`/item/${item.id_lelang}`}
                            >
                              {item.judul}
                            </Link>
                          </h3>

                          <div className="product-price-4 py-2">
                            <small className="text-dark">Bid saat ini </small>
                            <br />
                            <span className="text-primary">
                              {item.tawaran.length !== 0
                                ? item.tawaran[0]?.nilai_tawaran
                                : item.hrg_awal}
                            </span>
                          </div>
                        </div>
                        <div
                          className="product-content-wrap-3 product-content-position-2 px-2"
                          style={{ width: "103%" }}
                        >
                          <div className="product-content-categories">
                            <Link
                              className="purple"
                              to={`/kategori/${item?.kategori?.slug}`}
                            >
                              {item.kategori?.kategori}
                            </Link>
                          </div>
                          <h3>
                            <Link
                              className="purple"
                              to={`/item/${item.id_lelang}`}
                            >
                              {item.judul}
                            </Link>
                          </h3>

                          <div className="product-price-4 py-2">
                            <small className="text-dark">Bid saat ini </small>
                            <br />
                            <span className="text-primary">
                              {item.tawaran.length !== 0
                                ? item.tawaran[0]?.nilai_tawaran
                                : item.hrg_awal}
                            </span>
                          </div>
                          <div className="d-flex flex-column ">
                            <small className="">Berakhir pada</small>
                            <small className="">{item.tgl_selesai}</small>
                          </div>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  );
                })}
                <div
                  style={{
                    gap: 8,
                  }}
                  className="d-flex justify-content-end mt-4  "
                >
                  <Button
                    size="sm"
                    variant="outline-primary"
                    ref={navigationMobilePrevRef}
                  >
                    <Triangle
                      style={{
                        transform: "rotate(-90deg)",
                      }}
                      weight="fill"
                      size={14}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    ref={navigationMobileNextRef}
                  >
                    <Triangle
                      style={{
                        transform: "rotate(90deg)",
                      }}
                      weight="fill"
                      size={14}
                    />
                  </Button>
                </div>
              </Swiper>
            )}
          </>
        )}
        {/* {} */}
      </Container>

      {/* {latestAuction.length > 5 && (
        <>
          <div
            style={{
              gap: 8,
            }}
            className="d-flex  mx-4 mt-4  "
          >
            <Button
              size="sm"
              variant="outline-primary"
              ref={navigationMobilePrevRef}
            >
              <Triangle
                style={{
                  transform: "rotate(-90deg)",
                }}
                weight="fill"
                size={16}
              />
            </Button>
            <Button
              size="sm"
              variant="outline-primary"
              ref={navigationMobileNextRef}
            >
              <Triangle
                style={{
                  transform: "rotate(90deg)",
                }}
                weight="fill"
                size={16}
              />
            </Button>
          </div>
          <div className="w-auto d-md-flex d-none">
            <div
              ref={navigationPrevRef}
              className=" sliderNavigation navigationPrev"
            >
              <CaretLeftIcon size="100%" />
            </div>
            <div
              ref={navigationNextRef}
              className=" sliderNavigation navigatioNext"
            >
              <CaretRightIcon size="100%" />
            </div>
          </div>
        </>
      )} */}
    </>
  );
};

export default LatestAuction;
