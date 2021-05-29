import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { CaretLeftIcon, CaretRightIcon, WishListIcon } from "./UI/Icons/Index";
import SectionTitle from "./SectionTitle";
import productsData from "../data/product";

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

const productActionWrapVariants = {
  hover: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.2,
      staggerChildren: 0.07,
      // delayChildren: 0.2,
    },
  },
};

const productActionVariants = {
  open: {
    opacity: 0,
    y: -10,
    transition: {
      type: "linear",
      duration: 0.1,
    },
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      type: "linear",
      duration: 0.1,
    },
  },
};

const LatestAuction = () => {
  const navigationNextRef = React.useRef(null);
  const navigationPrevRef = React.useRef(null);
  const latestAuction = productsData;
  return (
    <>
      <Container fluid className="px-md-8">
        <SectionTitle title="Lelang Terbaru" actionText="Semua Produk" />
        {latestAuction.length === 0 ? (
          <div>
            <h2>Empty</h2>
          </div>
        ) : (
          <Swiper
            slidesPerGroup={1}
            loop={true}
            breakpoints={{
              360: {
                slidesPerView: 2,
              },
              575: {
                slidesPerView: 2,
              },
              767: {
                slidesPerView: 4,
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
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            className="latest-product-slider"
          >
            {latestAuction.map(item => {
              return (
                <SwiperSlide key={item.id} className="product-plr-1 ">
                  <motion.div
                    variants={singleProductWrapVariants}
                    initial={false}
                    animate="open"
                    whileHover="hover"
                    className="single-product-wrap"
                  >
                    <div className="product-img product-img-latest w-100 mb15">
                      <Link to="product-details.html">
                        <motion.img
                          variants={productImgVariants}
                          src={
                            process.env.PUBLIC_URL +
                            "/images/products/product-41.jpg"
                          }
                          alt="test"
                        />
                      </Link>

                      <motion.div
                        variants={productActionWrapVariants}
                        className="product-action-2 "
                      >
                        <Button
                          as={motion.button}
                          variants={productActionVariants}
                          size="sm"
                          title="Wishlist"
                        >
                          <WishListIcon size="100%" />
                        </Button>
                        <Button
                          as={motion.button}
                          variants={productActionVariants}
                          size="sm"
                          title="Wishlist"
                        >
                          <WishListIcon size="100%" />
                        </Button>
                        <Button
                          as={motion.button}
                          variants={productActionVariants}
                          size="sm"
                          title="Wishlist"
                        >
                          <WishListIcon size="100%" />
                        </Button>
                      </motion.div>
                    </div>
                    <div className="product-content-wrap-3">
                      <div className="product-content-categories">
                        <a className="purple" href="shop.html">
                          {item.categori}
                        </a>
                      </div>
                      <h3 className="my-1">
                        <Link to="product-details.html">{item.title}</Link>
                      </h3>
                      <small className="mb-2">{item.endsOn}</small>
                      <div className="product-price-4 text-dark">
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Container>
      <div className="w-auto">
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
  );
};

export default LatestAuction;
