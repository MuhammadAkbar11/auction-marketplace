import React from "react";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import CategoryTab from "../../Components/UserCreateAuction/CategoryTab";
import DescProductTab from "../../Components/UserCreateAuction/DescProductTab";
import PriceAndTimeTab from "../../Components/UserCreateAuction/PriceAndTimeTab";
import { useSelector } from "react-redux";
import useIsValidData from "../../hooks/useIsValidData";
import { Card, Col, Container, Row } from "react-bootstrap";
import CardAlert from "../../Components/UI/CardAlert";
import Layout from "../../Components/Layouts/Layout";
// import { Link } from "react-router-dom";

const CreateAuction = props => {
  const { location, history } = props;
  const { userInfo } = useSelector(state => state.authUser);
  const [activeTab, setActiveTab] = React.useState("default");

  const isValidData = useIsValidData();

  console.log(isValidData);

  React.useEffect(() => {
    if (!userInfo) {
      history.push("/akun/masuk");
      return;
    } else {
    }
  }, [userInfo]);

  let tabContent = null;

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");

    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab("default");
    }
  }, [location]);

  switch (activeTab) {
    case "kategori":
      tabContent = <CategoryTab />;
      break;
    case "deskripsi":
      tabContent = <DescProductTab />;
      break;
    case "harga-dan-durasi":
      tabContent = <PriceAndTimeTab />;
      break;
    default:
      tabContent = <CategoryTab />;
      break;
  }

  if (!isValidData) {
    tabContent = (
      <Container fluid className="px-md-8 py-6">
        <Row>
          <Col md={7} className="mx-auto">
            <CardAlert
              action
              title="Belum bisa membuat lelang"
              linkAction={{ url: "/akun/info", text: "Lengkapi data diri" }}
            >
              <p>Silahkan lengkapi data diri anda untuk melajutkan! </p>
            </CardAlert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Membuat lelang", active: true },
        ]}
      />
      <section>{tabContent}</section>
    </Layout>
  );
};

export default CreateAuction;
