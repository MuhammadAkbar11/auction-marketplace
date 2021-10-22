import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Nav, Card, Tab, Alert } from "react-bootstrap";
import Layout from "../../Components/Layouts/Layout";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import useIsValidData from "../../hooks/useIsValidData";
import { getUserTrackShippingAction } from "../../actions/user.purchase.actions";
import UserWrapperIsValidData from "../../Components/UserWrapperIsValidData";
import Loader from "../../Components/UI/Loader";
import UserCourierService from "../../Components/UserShipping/UserCourierService";
import UserPickupService from "../../Components/UserShipping/UserPickupService";

const UserTrackOrder = ({ match }) => {
  const { invoiceId } = match.params;

  const [modalInValidData, setModalInValidData] = React.useState(false);

  const dispatch = useDispatch();
  const [isValidData, loadingValidData] = useIsValidData();
  const trackShippingState = useSelector(state => state.userTrackShipping);
  const shippingData = trackShippingState.details;

  React.useEffect(() => {
    if (!isValidData) {
      setModalInValidData(true);
    }

    return () => {
      setModalInValidData(false);
    };
  }, [isValidData]);

  React.useEffect(() => {
    dispatch(getUserTrackShippingAction(invoiceId));
  }, []);

  let content = <UserCourierService data={shippingData} />;
  let breadcrumbText = "Lihat Pengiriman";

  if (shippingData?.jenis_pengiriman === "PICKUP") {
    content = <UserPickupService data={shippingData} />;
    breadcrumbText = "Lihat Penjemputan";
  }

  console.log(shippingData);

  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Akun", active: true },
          { title: "Pembelian Saya", url: "/akun/pembelian" },
          { title: breadcrumbText, active: true },
        ]}
      />

      <Container fluid className="px-md-8 py-4">
        <Row>
          <Col md={3}>
            <UserSidebarMenu />
          </Col>
          <Col md={9}>
            <UserWrapperIsValidData>
              {trackShippingState.loading ? (
                <Loader size={40} />
              ) : trackShippingState.error ? (
                <Alert variant="danger">
                  Terjadi kesalahan server silakan coba lagi!
                </Alert>
              ) : trackShippingState.details ? (
                content
              ) : (
                <Alert variant="danger">Data tidak dapat ditemukan</Alert>
              )}
            </UserWrapperIsValidData>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default UserTrackOrder;
