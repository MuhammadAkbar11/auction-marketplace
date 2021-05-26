import React from "react";
import { Link } from "react-router-dom";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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

const variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: 30,
  },
};
const variants2 = {
  initial: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: 30,
  },
};

const Banner = () => {
  const [mount, setMount] = React.useState(false);
  const [refRow, inView] = useInView({
    threshold: 0.2,
  });

  const [colWrap1, colInView1] = useInView({
    threshold: 0.3,
  });
  const [colWrap2, colInView2] = useInView({
    threshold: 0.3,
  });

  React.useEffect(() => {
    setMount(true);

    return () => {
      setMount(false);
    };
  }, []);

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
