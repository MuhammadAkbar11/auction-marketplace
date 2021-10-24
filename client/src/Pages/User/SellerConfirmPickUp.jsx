import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Container, Row } from "react-bootstrap";
import Layout from "../../Components/Layouts/Layout";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import Loader from "../../Components/UI/Loader";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import useIsValidData from "../../hooks/useIsValidData";
import ModalInvalidData from "../../Components/ModalInvalidData";
import { getShippingDetailsAction } from "../../actions/user.actions";
import SellerConfirmPickupContent from "../../Components/UserShipping/SellerConfirmPickupContent";

const SellerConfirmPickUp = props => {
  const { match, history } = props;

  const { invoiceId } = match?.params;

  const [showModalInfo, setShowModalInfo] = React.useState(false);

  const [isValidData, loadingValidData] = useIsValidData();
  const dispatch = useDispatch();

  const shippingDetailsState = useSelector(
    state => state.customerShippingDetails
  );

  const shipping = shippingDetailsState?.shippingDetails;
  const loading = shippingDetailsState.loading;
  const error = shippingDetailsState.error;

  React.useEffect(() => {
    if (!isValidData) {
      setShowModalInfo(true);
    }

    return () => {
      setShowModalInfo(false);
    };
  }, [isValidData]);

  React.useEffect(() => {
    dispatch(getShippingDetailsAction(invoiceId));
  }, []);

  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Akun", active: true },
          { title: "Konfirmasi Pengiriman", active: true },
        ]}
      />

      <Container fluid className="px-md-8 py-4">
        <Row>
          <Col md={3}>
            <UserSidebarMenu />
          </Col>
          <Col md={9} className="pb-8">
            {isValidData ? (
              loading ? (
                <div className="w-100 py-3">
                  <Loader />
                </div>
              ) : error ? (
                <>
                  <Alert variant="danger">Tidak dapat mengambil data!</Alert>
                </>
              ) : shipping?.jenis_pengiriman === "COURIER_SERVICE" ? (
                <SellerConfirmPickupContent data={shipping} />
              ) : (
                <Redirect to="/akun/lelang?tab=sold" />
              )
            ) : !loadingValidData ? (
              <ModalInvalidData />
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
    </Layout>
  );
};

export default SellerConfirmPickUp;
