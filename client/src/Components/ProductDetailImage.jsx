import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import { Card } from "react-bootstrap";
import dumbImages from "../data/dumbImg";
import { CaretLeftIcon, CaretRightIcon } from "./UI/Icons/Index";

SwiperCore.use([Navigation, Thumbs]);

const ProductDetailImage = () => {
  const navigationNextRef = React.useRef(null);
  const navigationPrevRef = React.useRef(null);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = dumbImages;

  return (
    <div className="product-details-tab">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        onSwiper={swiper => {
          setTimeout(() => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
        className="pro-dec-big-img-slider "
      >
        {images.map(img => {
          return (
            <SwiperSlide key={img.id}>
              <img src={img.url} alt={`not ${img.id}`} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* pagination */}
      <div className="pro-dec-small-img-wrapper mx-auto">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          // freeMode={true}
          spaceBetween={10}
          slidesPerView={4}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          watchSlidesVisibility={true}
          watchSlidesProgress={true}
          className="pro-dec-small-img-slider"
        >
          {images.map(img => {
            return (
              <SwiperSlide key={img.id} className="pro-small-img-slide ">
                <Card>
                  <Card.Img
                    className={`h-100 pointer-event `}
                    variant="top"
                    src={img.url}
                    style={{
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                  />
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          ref={navigationPrevRef}
          className="pro-dec-small-img-slider-nav prev "
        >
          <CaretLeftIcon size={20} />
        </div>

        <div
          ref={navigationNextRef}
          className="pro-dec-small-img-slider-nav next "
        >
          <CaretRightIcon size={20} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailImage;
