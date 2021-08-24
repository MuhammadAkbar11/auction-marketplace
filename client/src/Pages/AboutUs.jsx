import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../Components/Layouts/Layout";
import BreadcrumbsContainer from "../Components/Layouts/BreadcrumbsContainer.jsx";

const AboutUs = () => {
  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Tentang Kami", active: true },
        ]}
      />
      <Container fluid className="px-md-8 pt-5 pb-8">
        <Row>
          <Col md={6}>
            <img
              src="/images/logo.png"
              className=" "
              style={{ width: "50%" }}
              alt=""
            />
            <div className="pt-4">
              <p>
                BaeBid adalah platform lelang online terbaru di indonesia yang
                menawarkan aktivitas lelang yang seru dari beragam barang unik
                dan menarik.
              </p>
              <p>
                Berbeda dengan platform lelang online yang lain, BaeBid
                menawarkan keamanan serta kemudahan bagi para penggunanya.
                Aktivitas lelang di fasilitasi langsung oleh baebid, bersama
                metode pengiriman barang yang cepat dan terpercaya oleh jasa
                kurir terpecayai dari BeeBid. Dengan keunggulan tersebut, para
                pengguna kini dapat mengikuti keseluruhan lelang barang online
                dengan rasa aman, serta mendapatkan nilai optimal atas pelanggan
                barang miliknya.
              </p>
              <p>
                Segera bergabung, dan alami sendiri keseruan lelang online di
                BaeBid !!!
              </p>
            </div>
          </Col>
          <Col md={6} className="px-md-4">
            <img src="/images/about.jpg" className="w-100" alt="" />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AboutUs;
