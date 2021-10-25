import React from "react";
import { Link } from "react-router-dom";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import CategoryTab from "../../Components/UserCreateAuction/CategoryTab";
import DescProductTab from "../../Components/UserCreateAuction/DescProductTab";
import PriceAndTimeTab from "../../Components/UserCreateAuction/PriceAndTimeTab";
import { useSelector } from "react-redux";
import useIsValidData from "../../hooks/useIsValidData";
import { Col, Container, Row, Modal } from "react-bootstrap";
import Layout from "../../Components/Layouts/Layout";
import Loader from "../../Components/UI/Loader";
import DeliveryTab from "../../Components/UserCreateAuction/DeliveryTab";

const CreateAuction = props => {
  const { location, history } = props;
  const { userInfo } = useSelector(state => state.authUser);
  const [activeTab, setActiveTab] = React.useState("default");

  const [showModalInfo, setShowModalInfo] = React.useState(false);

  const [isValidData, loadingValidData] = useIsValidData();

  React.useEffect(() => {
    if (!userInfo) {
      history.push("/akun/masuk");
      return;
    }
  }, [userInfo, history]);

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

  React.useEffect(() => {
    if (!isValidData) {
      setShowModalInfo(true);
    }

    return () => {
      setShowModalInfo(false);
    };
  }, [isValidData]);

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
    case "pengiriman":
      tabContent = <DeliveryTab />;
      break;
    default:
      tabContent = <CategoryTab />;
      break;
  }

  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Membuat lelang", active: true },
        ]}
      />
      <section>
        {isValidData ? (
          tabContent
        ) : (
          <Container fluid className="px-md-8 py-6">
            <Row>
              <Col md={7} className="mx-auto">
                {!loadingValidData ? (
                  <Modal
                    show={showModalInfo}
                    className="bg-gray-100  "
                    centered
                  >
                    <Modal.Header>
                      <Modal.Title className="text-dark">
                        Belum bisa membuat lelang
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Silahkan lengkapi data diri anda untuk melajutkan! </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Link to="/akun/info" className="btn btn-primary">
                        Lengkapi data diri
                      </Link>
                      {/* <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button> */}
                    </Modal.Footer>
                  </Modal>
                ) : (
                  <div
                    className="w-100 d-flex justify-content-center align-items-center "
                    style={{
                      minHeight: "250px",
                    }}
                  >
                    <Loader size={55} />
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </Layout>
  );
};

export default CreateAuction;
