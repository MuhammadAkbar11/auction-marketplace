import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Navigation } from "swiper/core";

import { Link } from "react-router-dom";

import { CaretLeftIcon, CaretRightIcon } from "./UI/Icons/Index";
import { Container } from "react-bootstrap";
import SectionTitle from "./SectionTitle";

SwiperCore.use([Navigation]);

const ProductCategories = ({ categories }) => {
  const navigationNextRef = React.useRef(null);
  const navigationPrevRef = React.useRef(null);

  const productCatRef = React.useRef(null);

  return (
    <div className="productCategoriesArea " ref={productCatRef}>
      <Container fluid className="px-md-8">
        <SectionTitle
          title="Kategori terpopuler"
          actionText="Semua  Kategori"
        />

        {categories.length === 0 ? (
          <h5>Empty</h5>
        ) : (
          <Swiper
            slidesPerGroup={1}
            loop={true}
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              575: {
                slidesPerView: 2,
              },
              767: {
                slidesPerView: 3,
              },
              991: {
                slidesPerView: 6,
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
            className="productCategoriesSlider"
            onSwiper={swiper => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {categories.map(item => {
              return (
                <SwiperSlide key={item.id} className="product-plr-1">
                  <div className="single-product-wrap">
                    <div className="product-img product-img-categories mx-auto rounded-circle  mb20">
                      <Link to={item.url}>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "images/products/product-50.png"
                          }
                          alt={item.id}
                        />
                      </Link>
                    </div>
                    <div className="product-content-categories-2 text-center">
                      <h5>
                        <Link to={item.url}>{item.name}</Link>
                      </h5>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Container>
      <div className="w-auto">
        <div
          ref={navigationPrevRef}
          className=" sliderNavigation  navigationPrev"
        >
          <CaretLeftIcon size="100%" />
        </div>
        <div
          ref={navigationNextRef}
          className=" sliderNavigation  navigatioNext"
        >
          <CaretRightIcon size="100%" />
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
