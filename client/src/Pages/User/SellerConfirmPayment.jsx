import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layouts/Layout";
import {
  Col,
  Container,
  Row,
  Alert,
  Modal,
  Card,
  Form,
  ListGroup,
  Button,
} from "react-bootstrap";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import Loader from "../../Components/UI/Loader";
import convertRupiah from "../../utils/convertRupiah";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import useIsValidData from "../../hooks/useIsValidData";
import {
  getCustomerPaymentDetailsAction,
  postConfirmCustomerPaymentAction,
} from "../../actions/user.actions";

const SellerConfirmPayment = props => {
  const { match, history } = props;

  const { invoiceId } = match?.params;

  const [showModalInfo, setShowModalInfo] = React.useState(false);
  const [modalPaymentProof, setModalPaymentProof] = React.useState(false);
  const [modalConfirm, setModalConfirm] = React.useState({
    show: false,
    type: "ACCEPT",
  });

  const [isValidData, loadingValidData] = useIsValidData();

  const dispatch = useDispatch();

  const [loadingConfirm, setLoadingConfirm] = React.useState(false);
  const [errors, setErrors] = React.useState(null);

  const paymentDetailsState = useSelector(
    state => state.customerPaymentDetails
  );

  const invoice = paymentDetailsState?.invoice;
  const member = invoice?.tawaran?.member;
  const loading = paymentDetailsState.loading;
  const error = paymentDetailsState.error;

  React.useEffect(() => {
    if (!isValidData) {
      setShowModalInfo(true);
    }

    return () => {
      setShowModalInfo(false);
    };
  }, [isValidData]);

  React.useEffect(() => {
    dispatch(getCustomerPaymentDetailsAction(invoiceId));
  }, [invoiceId, dispatch]);

  const handleSubmit = async () => {
    setLoadingConfirm(true);
    try {
      await dispatch(
        postConfirmCustomerPaymentAction(invoiceId, modalConfirm.type)
      );
      setLoadingConfirm(false);
      setModalConfirm({ show: false, type: "ACCEPT" });
      return history.push("/akun/lelang?tab=sold");
    } catch (error) {
      setErrors(error);
      setModalConfirm({ show: false, type: "ACCEPT" });
      setLoadingConfirm(false);
      return;
    }
  };

  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Akun", active: true },
          { title: "Konfirmasi Pembayaran", active: true },
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
                <Redirect to="/akun/lelang?tab=sold" />
              ) : (
                <main>
                  <section className="my-3">
                    {errors && (
                      <Alert
                        variant="danger"
                        onClose={() => setErrors(null)}
                        dismissible
                      >
                        <Alert.Heading>Maaf, anda gagal!</Alert.Heading>
                        <p>Silahkan coba lagi</p>
                      </Alert>
                    )}
                  </section>
                  <h4>Konfirmasi pembayaran </h4>
                  <p>ID {invoice?.id_transaksi}</p>
                  <Form className="" onSubmit={handleSubmit}>
                    <Row>
                      <Col lg={6}>
                        <Card className=" border-0 ">
                          <Card.Body className="pl-0 ">
                            <h5 className="mb-2">Pelanggan</h5>
                            <div className="pl-0 border-0 ">
                              <div className="row ">
                                <div className="text-left col-sm-4 text-gray-700">
                                  Nama
                                </div>
                                <div className="text-left  col-sm-7 text-black text-nowrap">
                                  : {member ? member?.nama : "-"}
                                </div>
                              </div>
                              <div className="row pt-2 ">
                                <div className="text-left col-sm-4 text-gray-700">
                                  Email
                                </div>
                                <div className="text-left  col-sm-7 text-black text-nowrap">
                                  : {member ? member?.email : "-"}
                                </div>
                              </div>
                              <div className="row pt-2 ">
                                <div className="text-left col-sm-4 text-gray-700">
                                  No Telepon
                                </div>
                                <div className="text-left  col-sm-7 text-black text-nowrap">
                                  : {member ? member?.no_hp : "-"}
                                </div>
                              </div>
                            </div>
                            <h5 className="mb-2 mt-3">Bank Tujuan</h5>
                            <div className="pl-0 border-0 ">
                              <div className="row ">
                                <div className="text-left col-sm-4 text-gray-700">
                                  Bank
                                </div>
                                <div className="text-left  col-sm-7 text-black text-nowrap">
                                  : {invoice?.bank_tujuan?.nama_bank}
                                </div>
                              </div>
                              <div className="row pt-2 ">
                                <div className="text-left col-sm-4 text-gray-700">
                                  Email
                                </div>
                                <div className="text-left  col-sm-7 text-black text-nowrap">
                                  : {member ? member?.email : "-"}
                                </div>
                              </div>
                              <div className="row pt-2 ">
                                <div className="text-left col-sm-4 text-gray-700">
                                  No Telepon
                                </div>
                                <div className="text-left  col-sm-7 text-black text-nowrap">
                                  : {member ? member?.no_hp : "-"}
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col lg={6}>
                        <Card>
                          <Card.Header className=" d-flex justify-content-between  bg-transparent">
                            <Card.Title>Ringkasan Pembayaran</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <ListGroup className="pl-0  ">
                              <ListGroup.Item className="pl-0 border-0 pt-0 pb-1   ">
                                <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                                  <div className=" text-gray-600    ">
                                    Jenis pembayaran
                                  </div>
                                  <div className=" text-primary ">
                                    {invoice?.jenis_pembayaran}
                                  </div>
                                </div>
                              </ListGroup.Item>
                              <ListGroup.Item className="pl-0 border-0 pt-0 pb-1   ">
                                <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                                  <div className=" text-gray-600    ">
                                    Tgl pembayaran
                                  </div>
                                  <div className=" text-primary ">
                                    {invoice?.tgl_bayar}
                                  </div>
                                </div>
                              </ListGroup.Item>

                              <ListGroup.Item className="pl-0  border-0 pb-0   ">
                                <Card.Title className="mb-1">Total</Card.Title>
                              </ListGroup.Item>
                              <ListGroup.Item className="pl-0 border-0 pt-0 pb-1   ">
                                <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                                  <div className=" text-gray-600">
                                    Harga barang
                                  </div>
                                  <div className=" text-primary ">
                                    Rp. {invoice?.tawaran?.nilai_tawaran}
                                  </div>
                                </div>
                              </ListGroup.Item>
                              <ListGroup.Item className="pl-0 border-0 pt-1 pb-1   ">
                                <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                                  <div className=" text-gray-600    ">
                                    Ongkos Kirim
                                  </div>
                                  <div className=" text-primary ">
                                    Rp. {convertRupiah(+invoice?.ongkir)}
                                  </div>
                                </div>
                              </ListGroup.Item>
                              <ListGroup.Item className="pl-0 border-top-0 border-left-0 border-right-0 pt-1 pb-2   ">
                                <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                                  <div className=" text-gray-600    ">
                                    Biaya Packing
                                  </div>
                                  <div className=" text-primary ">
                                    Rp.{" "}
                                    {convertRupiah(
                                      +invoice?.lelang?.biaya_packing
                                    )}
                                  </div>
                                </div>
                              </ListGroup.Item>

                              <ListGroup.Item className="pl-0 border-0 pt-2 pb-1   ">
                                <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                                  <div className=" text-primary font-weight-bold">
                                    Total
                                  </div>
                                  <div className=" text-primary font-weight-bold">
                                    Rp. {convertRupiah(+invoice?.total_harga)}
                                  </div>
                                </div>
                              </ListGroup.Item>
                            </ListGroup>
                            <div className="w-100 mt-2">
                              {" "}
                              <Button
                                block
                                onClick={e => setModalPaymentProof(true)}
                              >
                                Bukti pembayaran
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xs={12} className="mt50 ">
                        <Button
                          variant="danger mr-3"
                          onClick={() => {
                            setModalConfirm({ show: true, type: "DECLINE" });
                          }}
                          disabled={loadingConfirm}
                        >
                          Tolak
                        </Button>
                        <Button
                          variant="success"
                          disabled={loadingConfirm}
                          onClick={() => {
                            setModalConfirm({ show: true, type: "ACCEPT" });
                          }}
                        >
                          Setujui
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </main>
              )
            ) : !loadingValidData ? (
              <Modal show={showModalInfo} className="bg-gray-100" centered>
                <Modal.Header>
                  <Modal.Title className="text-dark">
                    Tidak dapat melakukan konfirmasi!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Silahkan lengkapi data diri anda untuk melajutkan! </p>
                </Modal.Body>
                <Modal.Footer>
                  <Link to="/akun/info" className="btn btn-outline-primary">
                    Lengkapi data diri
                  </Link>
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
      <Modal
        show={modalPaymentProof}
        scrollable
        centered
        size="xl"
        onHide={() => setModalConfirm({ show: false, type: "ACCEPT" })}
      >
        <Modal.Header>
          <Modal.Title className="text-dark">Bukti pembayaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="w-100" src={invoice?.bukti_transfer} alt="" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalPaymentProof(false)}>Tutup</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal confirm */}
      <Modal
        show={modalConfirm.show}
        scrollable
        centered
        onHide={() => setModalConfirm({ show: false, type: "ACCEPT" })}
      >
        <Modal.Body className="py-5">
          {modalConfirm.type === "ACCEPT" ? (
            <div className="text-center">
              <div className="my-2">
                <Modal.Title className="text-dark">Anda yakin ?</Modal.Title>
              </div>
              <p>Anda yakin untuk menyetujui pembayaran ini?</p>
              <div className="pt-3">
                <Button
                  variant="outline-success"
                  onClick={() =>
                    setModalConfirm({ show: false, type: "ACCEPT" })
                  }
                >
                  Tutup
                </Button>
                <Button
                  variant="success"
                  className="ml-3 "
                  onClick={() => handleSubmit()}
                  disabled={loadingConfirm}
                >
                  Iya, Setuju
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="my-2">
                <Modal.Title className="text-dark">Anda yakin ?</Modal.Title>
              </div>
              <p>Anda yakin untuk menolak pembayaran ini?</p>
              <div className="pt-3">
                <Button
                  variant="outline-danger"
                  onClick={() =>
                    setModalConfirm({ show: false, type: "ACCEPT" })
                  }
                >
                  Tutup
                </Button>
                <Button
                  variant="danger"
                  className="ml-3 "
                  disabled={loadingConfirm}
                  onClick={() => handleSubmit()}
                >
                  Iya, Tolak
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default SellerConfirmPayment;
