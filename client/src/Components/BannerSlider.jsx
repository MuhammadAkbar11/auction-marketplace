import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
import { Button, Col, Row } from "react-bootstrap";

import imgSlider from "../assets/images/slider/hm-1-slider-1.png";

SwiperCore.use([Autoplay, Pagination]);

const BannerSlider = () => {
  return (
    <div className="bannerSliderArea bg-light  ">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={true}
        className="heroSlider  "
        slidesPerView={1}
      >
        <SwiperSlide className="singleHeroSlider">
          <Row className="h-100">
            <Col sm={6} md={6} lg={6}>
              <div className="heroSliderContent ">
                <h4 className="font-dec">New Arrivals</h4>
                <h1 className="font-dec text-capitalize">
                  Leather Simple <br />
                  Backpacks
                </h1>
                <p className="width-inc">
                  Discover our collection with leather simple backpacks. Less is
                  more never out trend.
                </p>
                <LinkContainer to="/explore">
                  <Button>Explore Now</Button>
                </LinkContainer>
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="heroSliderImg">
                <img src={imgSlider} alt="slider" />
              </div>
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide className="singleHeroSlider">
          <Row className="h-100">
            <Col sm={6} md={6} lg={6}>
              <div className="heroSliderContent ">
                <h4 className="font-dec">New Arrivals</h4>
                <h1 className="font-dec text-capitalize">
                  Leather Simple <br />
                  Backpacks
                </h1>
                <p className="width-inc">
                  Discover our collection with leather simple backpacks. Less is
                  more never out trend.
                </p>
                <LinkContainer to="/explore">
                  <Button>Explore Now</Button>
                </LinkContainer>
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="heroSliderImg">
                <img src={imgSlider} alt="slider" />
              </div>
            </Col>
          </Row>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerSlider;
