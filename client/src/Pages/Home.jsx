import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Banner from "../Components/Banner";
import LatestAuction from "../Components/LatestAuction";
import { WishListIcon } from "../Components/UI/Icons/Index";

import { io } from "socket.io-client";
import { SERVER_ENDPOINT } from "../constants/socket.constants";
import Layout from "../Components/Layouts/Layout";

import bannerImg from "../assets/images/banner/auction-banner.jpg";
let socket;

const Home = () => {
  React.useEffect(() => {
    socket = io(SERVER_ENDPOINT);
    socket.emit("auction:start", check => {
      console.log(check);
    });
    // socketClien
    return () => {
      socket.on("disconnect");
      socket.off();
    };
  }, [SERVER_ENDPOINT]);

  React.useEffect(() => {
    socket.on("auction:new", data => {
      console.log(data);
    });
  }, []);

  return (
    <Layout>
      <Banner />

      {/* <ProductCategories categories={popularCategories} /> */}
      <div className="product-area">
        <LatestAuction />
      </div>
      {/* <section className="bottom-banner-area">
        <Container fluid className="px-md-8 h-100">
          <div className="bg-image">
            <img src={bannerImg} alt="" />
          </div>
        </Container>
      </section> */}
    </Layout>
  );
};

export default Home;
