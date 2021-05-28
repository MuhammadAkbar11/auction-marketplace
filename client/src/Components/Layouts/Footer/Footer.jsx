import React from "react";
import { Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { allCategories } from "../../../data/categories";
import FooterBottom from "./FooterBottom";
import FooterWidget from "./FooterWidget";

const Footer = () => {
  const useFullLinks = [
    {
      id: 1,
      url: "my-account",
      name: "My Account",
    },
    {
      id: 2,
      url: "my-favorit",
      name: "My Favorit",
    },
    {
      id: 3,
      url: "term-conditions",
      name: "Term & Conditions",
    },
  ];
  return (
    <footer className="footer-area bg-gray-100">
      <div className="footer-top border-bottom-4 pb-55">
        <Container className="px-md-8" fluid>
          <div className="row">
            <Col lg={4} md={4} sm={6} xs={12}>
              <FooterWidget categories title="Jelajahi" links={allCategories} />
            </Col>
            <Col lg={4} md={4} sm={6} xs={12}>
              <FooterWidget title="Useful Links" links={useFullLinks} />
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
              <FooterWidget contact title="Kontak Kami" />
            </Col>
          </div>
        </Container>
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;
