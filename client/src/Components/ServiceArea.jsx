import React from "react";

const ServiceArea = () => {
  return (
    <div className="serviceArea pt10">
      <Container fluid className="px-md-8">
        <div className="serviceWrap border">
          <Row>
            <Col xs={12} sm={6} md={6} lg={3} className="serviceColBorder">
              <div className="singleServiceWrap mb30">
                <div className="serviceIcon text-gray-500 ">
                  <WishListIcon size={40} />
                </div>
                <div className="serviceContent">
                  <h3>Free Shipping</h3>
                  <p>Oders over $99</p>
                </div>
              </div>
            </Col>
            <Col
              xs={12}
              sm={6}
              md={6}
              lg={3}
              className="serviceColBorder serviceColBorderNoneMd"
            >
              <div className="singleServiceWrap mb30">
                <div className="serviceIcon text-gray-500 ">
                  <WishListIcon size={40} />
                </div>
                <div className="serviceContent">
                  <h3>90 Days Return</h3>
                  <p>For any problems</p>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3} className="serviceColBorder">
              <div className="singleServiceWrap mb30">
                <div className="serviceIcon text-gray-500 ">
                  <WishListIcon size={40} />
                </div>
                <div className="serviceContent">
                  <h3>Secure Payment</h3>
                  <p>100% Guarantee</p>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <div className="singleServiceWrap mb30">
                <div className="serviceIcon text-gray-500 ">
                  <WishListIcon size={40} />
                </div>
                <div className="serviceContent">
                  <h3>24h Support</h3>
                  <p>Dedicated support</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ServiceArea;
