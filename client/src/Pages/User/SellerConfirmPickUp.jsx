import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Col, Container, Modal, Row } from "react-bootstrap";
import Layout from "../../Components/Layouts/Layout";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import Loader from "../../Components/UI/Loader";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import useIsValidData from "../../hooks/useIsValidData";
import ModalInvalidData from "../../Components/ModalInvalidData";
import {
  getShippingDetailsAction,
  sellerConfirmPickupAction,
} from "../../actions/user.actions";
import SellerConfirmPickupContent from "../../Components/UserShipping/SellerConfirmPickupContent";
import UserWrapperIsValidData from "../../Components/UserWrapperIsValidData";

const SellerConfirmPickUp = props => {
  const { match, history } = props;

  const { invoiceId } = match?.params;

  const [modalConfirm, setModalConfirm] = React.useState(false);
  const [loadingConfirm, setLoadingConfirm] = React.useState(false);
  const [errorConfirm, setErrorConfirm] = React.useState(null);

  const dispatch = useDispatch();

  const shippingDetailsState = useSelector(
    state => state.customerShippingDetails
  );

  const shipping = shippingDetailsState?.shippingDetails;
  const loading = shippingDetailsState.loading;
  const error = shippingDetailsState.error;

  React.useEffect(() => {
    dispatch(getShippingDetailsAction(invoiceId));
  }, [invoiceId]);

  const handleShowModalConfirm = () => setModalConfirm(true);

  const handleConfirm = () => {
    // setModalConfirm(true);
    setLoadingConfirm(true);

    dispatch(sellerConfirmPickupAction(invoiceId))
      .then(() => {
        setLoadingConfirm(false);
        setModalConfirm(false);
        history.push("/akun/lelang?tab=sold");
      })
      .catch(() => {
        setModalConfirm(false);
        setErrorConfirm(true);
        setLoadingConfirm(false);
      });
  };

  return +shipping?.status_transaksi > 4 ? (
    <Redirect to="/akun/lelang?tab=sold" />
  ) : (
    <>
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
              <UserWrapperIsValidData>
                {loading ? (
                  <div className="w-100 py-3">
                    <Loader />
                  </div>
                ) : error ? (
                  <>
                    <Alert variant="danger">Tidak dapat mengambil data!</Alert>
                  </>
                ) : shipping?.jenis_pengiriman === "PICKUP" ? (
                  <SellerConfirmPickupContent
                    errors={errorConfirm}
                    onCloseErrors={setErrorConfirm}
                    loading={loadingConfirm}
                    onShowModal={handleShowModalConfirm}
                    data={shipping}
                  />
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
              </UserWrapperIsValidData>
            </Col>
          </Row>
        </Container>
      </Layout>
      <Modal centered show={modalConfirm} onHide={() => setModalConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Penjemputan Barang?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!loadingConfirm ? (
            <>
              Klik <span className="font-weight-bold">Iya</span> jika barang
              telah dijemput
            </>
          ) : (
            <Loader size={45} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={loadingConfirm}
            variant="outline-primary"
            onClick={() => setModalConfirm(false)}
          >
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={loadingConfirm}
          >
            Iya
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SellerConfirmPickUp;
