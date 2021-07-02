import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
import { Button, Col, Row } from "react-bootstrap";

import imgSlider2 from "../assets/images/slider/slider-2.png";
import imgSlider1 from "../assets/images/slider/slider-1.png";
import { Link } from "react-router-dom";
SwiperCore.use([Autoplay, Pagination]);

const BannerSlider = () => {
  return (
    <div className="bannerSliderArea bg-light w-100  ">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={true}
        className="heroSlider  "
        slidesPerView={1}
      >
        <SwiperSlide className="singleHeroSlider ">
          <Row className="h-100">
            <Col sm={6} md={6} lg={6}>
              <div className="heroSliderContent  ">
                <h4 className="font-dec mt-md-10">BaeBid</h4>
                <h1 className="font-dec text-capitalize">
                  Beli, Jual dan Temukan <br /> Segalanya Disini
                </h1>
                {/* <p className="width-inc">
                  BaeBid tempat lelang mudah dan terpecaya
                </p> */}
                <div className="">
                  {" "}
                  <Link className="btn btn-primary" to="/lelang">
                    {" "}
                    Explore Now
                  </Link>
                </div>
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="heroSliderImg">
                <img src={imgSlider2} alt="slider" />
              </div>
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide className="singleHeroSlider ">
          <Row className="h-100">
            <Col sm={6} md={6} lg={6}>
              <div className="heroSliderContent ">
                <h4 className="font-dec">BaeBid</h4>
                <h1 className="font-dec text-capitalize">
                  Selalu pantau barang Inceran <br />
                  anda
                </h1>
                <p className="width-inc">Branded, Murah dan berkualitas</p>
                <LinkContainer to="/lelang">
                  <Button>Explore Now</Button>
                </LinkContainer>
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="heroSliderImg">
                <img src={imgSlider1} alt="slider" />
              </div>
            </Col>
          </Row>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerSlider;
