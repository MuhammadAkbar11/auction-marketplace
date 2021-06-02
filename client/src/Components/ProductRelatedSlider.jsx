import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import productsData from "../data/product";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";

SwiperCore.use([Navigation]);

const ProductRelatedSlider = () => {
  let relatedProducts = productsData;
  relatedProducts = relatedProducts.slice(0, 6);

  let realtedProductsContent = (
    <Row>
      {relatedProducts.map(product => {
        return (
          <Col key={product.id} xs={6} sm={6} md={6} lg={3}>
            <ProductCard product={product} />
          </Col>
        );
      })}
    </Row>
  );

  if (relatedProducts.length > 4) {
    realtedProductsContent = (
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
        navigation={false}
        slidesPerView={6}
        className="related-product-slider"
      >
        {relatedProducts.map(product => {
          return (
            <SwiperSlide key={product.id} className="product-plr-1 ">
              <ProductCard product={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }

  return realtedProductsContent;
};

export default ProductRelatedSlider;
