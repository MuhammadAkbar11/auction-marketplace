import React from "react";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import { WishListIcon } from "./UI/Icons/Index";
import { Link } from "react-router-dom";
const singleProductWrapVariants = {
  open: {
    opacity: 1,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  },
};

const productImgVariants = {
  hover: {
    scale: 1.2,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  },
};

const productActionWrapVariants = {
  hover: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.2,
      staggerChildren: 0.07,
      // delayChildren: 0.2,
    },
  },
};

const productActionVariants = {
  open: {
    opacity: 0,
    y: -10,
    transition: {
      type: "linear",
      duration: 0.1,
    },
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      type: "linear",
      duration: 0.1,
    },
  },
};

const ProductCard = ({ product }) => {
  return (
    <motion.div
      variants={singleProductWrapVariants}
      initial={false}
      animate="open"
      whileHover="hover"
      className="single-product-wrap mb35"
    >
      <div className="product-img product-img-zoom mb15 bg-light">
        <Link to={`/detail/${product.id}`}>
          <motion.img
            variants={productImgVariants}
            src={product.image}
            alt="test"
          />
        </Link>
        <motion.div
          variants={productActionWrapVariants}
          className="product-action-2 "
        >
          <Button
            as={motion.button}
            variants={productActionVariants}
            size="sm"
            title="Wishlist"
          >
            <WishListIcon size="100%" />
          </Button>
        </motion.div>
      </div>
      <div className="product-content-wrap-2 text-center">
        <div className="product-content-categories">
          <Link to={`/kategori/${product.categori}`}>{product.categori}</Link>
        </div>
        <h3>
          <Link to={`/detail/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="product-price-2 text-primary py-2">
          <small className="text-dark mb-0 ">Bid saat ini</small>
          <br />
          <span>{product.price}</span>
        </div>
      </div>
      <div className="product-content-wrap-2 product-content-position text-center">
        <div className="product-content-categories text-gray-800">
          <a href="shop.html">{product.categori}</a>
        </div>
        <h3>
          <a href="product-details.html">{product.title}</a>
        </h3>
        <div className="product-price-2 text-primary py-2">
          <small className="text-dark mb-0 ">Bid saat ini</small>
          <br />
          <span>$20.50</span>
        </div>
        <div className="d-flex flex-column justify-content-between align-items-center">
          <small className="">Berakhir pada</small>
          <small className="">{product.endsOn}</small>
        </div>
      </div>
    </motion.div>
  );
};

ProductCard.defaultProps = {
  product: {
    title: "No Title",
    categori: "Categori",
    image: process.env.PUBLIC_URL + "/images/products/product-13.jpg",
    price: 0,
    endsOn: "11 January, 2001 - 11.00",
  },
};

export default ProductCard;
