import React from "react";
import { Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../../actions/categories.actions";
import FooterBottom from "./FooterBottom";
import FooterWidget from "./FooterWidget";

const Footer = () => {
  const useFullLinks = [
    {
      id: 1,
      url: "/tentang-kami",
      name: "Tentang kami",
    },
    {
      id: 3,
      url: "/term-conditions",
      name: "Syarat & Ketentuan",
    },
  ];

  const dispatch = useDispatch();
  const { categories, loading } = useSelector(state => state.categories);

  React.useEffect(() => {
    dispatch(getCategoriesAction());
    return;
  }, []);

  const transformCategories = categories
    ? categories.length !== 0
      ? categories.map(item => {
          return {
            id: item.id_kategori,
            url: "/kategori/" + item.id_kategori,
            name: item.kategori,
          };
        })
      : []
    : [];

  return (
    <footer className="footer-area bg-gray-100">
      <div className="footer-top border-bottom-4 pb-55">
        <Container className="px-md-8" fluid>
          <div className="row">
            <Col lg={4} md={4} sm={6} xs={12}>
              <FooterWidget
                categories
                title="Jelajahi"
                links={transformCategories}
              />
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
