import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import bannerImg14 from "../assets/images/banner/banner-mini-2.png";
import bannerImg15 from "../assets/images/banner/Banner-mini.png";
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
                <div className="bannerWrap mb30 bg-primary">
                  <div className="bannerImg">
                    <Link to="/deal">
                      <img
                        variants={bannerImgVariants}
                        src={bannerImg14}
                        alt="alt banner"
                      />
                    </Link>
                  </div>
                  {/* <div className="bannerContent   ">
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
                  </div> */}
                </div>
              </Col>
              <Col sm={6} lg={12} md={6} className="">
                <div className="bannerWrap mb30 border ">
                  <div className="bannerImg">
                    <div>
                      <img src={bannerImg15} alt="mini-banner-2" />
                    </div>
                  </div>
                  {/* <div className="bannerContent2">
                    <Badge variant="cyan" className="bannerContent2Badge ">
                      ZHnio
                    </Badge>
                    <h2 className="text-capitalize font-weight-lighter ">
                      head <br />
                      phone
                    </h2>
                    <p>new version 3.0 for new era</p>
                  </div> */}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
