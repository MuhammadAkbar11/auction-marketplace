import React from "react";
// import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { ListIcon } from "../../../UI/Icons/Index";
import { motion } from "framer-motion";
import { Nav } from "react-bootstrap";

const boxVariants = {
  enter: {
    height: "auto",
  },
  exit: {
    height: "auto",
  },
};

const navVariants = {
  enter: {
    zIndex: 1,
    opacity: 1,
    y: 0,
    display: "block",
    transition: {
      duration: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  exit: {
    marginBottom: "-5px",
    opacity: 0,
    zIndex: -1,

    transition: {
      delay: 0.1,
      duration: 0.1,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
    transitionEnd: {
      display: "none",

      zIndex: -1,
    },
  },
};

const navItemVariants = {
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.1,
    },
  },
};

const MobileMenuCategori = ({ open, toggle, categories }) => {
  return (
    <div className="mobileHeaderPaddingBorder3 mobileMenuCategori">
      <motion.div
        className="categoriBox h-auto"
        variants={boxVariants}
        animate={open ? "enter" : "exit"}
      >
        <a
          onClick={toggle}
          href="#/"
          style={{
            zIndex: 10,
          }}
          className=" toggle d-flex justify-content-between align-items-center"
        >
          {" "}
          <ListIcon size="20" />
          <span>All Kategori</span>
          <span
            style={{
              transform: "rotate(90deg)",
            }}
          >
            {">"}
          </span>
        </a>

        <Nav
          as={motion.nav}
          variants={navVariants}
          defaultActiveKey="/home"
          className={`flex-column mobileMenuNav menuCategoriNav px-0  pt-3 pb-0 `}
        >
          {categories.map(item => {
            return (
              <LinkContainer
                key={item.id_kategori}
                to={`/kategori/${item.slug}`}
                className="mobileMenuNavLink"
              >
                <Nav.Link as={motion.a} variants={navItemVariants}>
                  {" "}
                  {item.kategori}
                </Nav.Link>
              </LinkContainer>
            );
          })}
        </Nav>
      </motion.div>
    </div>
  );
};

export default MobileMenuCategori;
