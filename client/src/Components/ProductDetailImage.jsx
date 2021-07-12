import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import { Card } from "react-bootstrap";
import dumbImages from "../data/dumbImg";
import { CaretLeftIcon, CaretRightIcon } from "./UI/Icons/Index";

SwiperCore.use([Navigation, Thumbs]);

const ProductDetailImage = ({ images, loading }) => {
  const navigationNextRef = React.useRef(null);
  const navigationPrevRef = React.useRef(null);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="product-details-tab">
      {images.length > 1 ? (
        <>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            loop={true}
            thumbs={{ swiper: thumbsSwiper }}
            onSwiper={swiper => {
              // setTimeout(() => {
              // if (!loading) {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              // }
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
              // });
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
          <div className="pro-dec-small-img-wrapper mx-auto">
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              // freeMode={true}
              spaceBetween={10}
              slidesPerView={images.length > 3 ? 4 : images.length}
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
                  <SwiperSlide
                    key={img.id}
                    className="pro-small-img-slide border "
                  >
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
        </>
      ) : (
        <div className="pro-dec-big-img-slider ">
          {images.map(img => {
            return (
              <div key={img.id} className="pro-small-img-slide  ">
                <Card className="h-100">
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
              </div>
            );
          })}
        </div>
      )}

      {/* pagination */}
    </div>
  );
};

ProductDetailImage.defaultProps = {
  images: [],
};

export default ProductDetailImage;
