import React from "react";
import { Link } from "react-router-dom";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import bannerImg14 from "../assets/images/banner/banner-14.jpg";
import bannerImg15 from "../assets/images/banner/banner-15.jpg";
import BannerSlider from "./BannerSlider";

const bannerImgVariants = {
  hover: {
    scale: 1.2,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  },
};

const Banner = () => {
  return (
    <div className=" sliderBannerArea">
      <Container fluid className="px-md-8 py-3">
        <Row>
          <Col lg={8} className=" pb-0 mb-4 mb-lg-0">
            <BannerSlider />
          </Col>
          <Col lg={4}>
            <Row className=" h-100  ">
              <Col sm={6} lg={12} md={6} className="mb-4 mb-sm-0 mb-lg-4 ">
                <motion.div whileHover="hover" className="bannerWrap mb30">
                  <div className="bannerImg">
                    <Link to="/detail">
                      <motion.img
                        variants={bannerImgVariants}
                        src={bannerImg14}
                        alt="alt banner"
                      />
                    </Link>
                  </div>
                  <div className="bannerContent  ">
                    <div>
                      <span>20x absorbs</span>
                      <h2>
                        Triple <br />
                        guards
                      </h2>
                      <div className="productAvailableWrap">
                        <div className="singleProductAvailable">
                          <h3>6</h3>
                          <span>pack</span>
                        </div>
                        <div className="singleProductAvailable">
                          <h3>124</h3>
                          <span>diapers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Col>
              <Col sm={6} lg={12} md={6}>
                <motion.div whileHover="hover" className="bannerWrap mb30 ">
                  <div className="bannerImg">
                    <Link to="/product">
                      <motion.img
                        variants={bannerImgVariants}
                        src={bannerImg15}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="bannerContent2">
                    <Badge variant="cyan" className="bannerContent2Badge ">
                      ZHnio
                    </Badge>
                    <h2 className="text-capitalize font-weight-lighter ">
                      head <br />
                      phone
                    </h2>
                    <p>new version 3.0 for new era</p>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
