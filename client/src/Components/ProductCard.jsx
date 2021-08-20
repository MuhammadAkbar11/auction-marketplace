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

const ProductCard = ({ auction }) => {
  return (
    <motion.div
      variants={singleProductWrapVariants}
      initial={false}
      animate="open"
      whileHover="hover"
      className="single-product-wrap mb35"
    >
      <div className="product-img product-img-zoom mb15 bg-light">
        <Link to={`/item/${auction.id_lelang}`}>
          <motion.img
            variants={productImgVariants}
            src={auction?.gambar[0]?.url}
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
          <Link to={`/kategori/${auction.kategori?.slug}`}>
            {auction.kategori?.kategori}
          </Link>
        </div>
        <h3>
          <Link to={`/item/${auction.id_lelang}`}>{auction.judul}</Link>
        </h3>
        <div className="product-price-2 text-primary py-2">
          <small className="text-dark mb-0 ">Bid saat ini</small>
          <br />
          <span>
            Rp.{" "}
            {auction.tawaran.length !== 0
              ? auction.tawaran[0].nilai_tawaran
              : auction?.hrg_awal}
          </span>
        </div>
      </div>
      <div className="product-content-wrap-2 product-content-position text-center">
        <div className="product-content-categories text-gray-800">
          <Link to={`/kategori/${auction.kategori?.slug}`}>
            {auction.kategori?.kategori}
          </Link>
        </div>
        <h3>
          <Link to={`/item/${auction.id_lelang}`}>{auction.judul}</Link>
        </h3>
        <div className="product-price-2 text-primary py-2">
          <small className="text-dark mb-0 ">Bid saat ini</small>
          <br />
          <span>
            Rp.{" "}
            {auction.tawaran.length !== 0
              ? auction.tawaran[0].nilai_tawaran
              : auction?.hrg_awal}
          </span>
        </div>
        <div className="d-flex flex-column justify-content-between align-items-center">
          <small className="">Berakhir pada</small>
          {auction?.telah_selesai ? (
            <small className="text-primary">Ditutup</small>
          ) : (
            <small>{auction.tgl_selesai}</small>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
