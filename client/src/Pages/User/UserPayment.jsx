import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  Col,
  Container,
  Row,
  Card,
  Form,
  Button,
  ListGroup,
  Alert,
  Image,
} from "react-bootstrap";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import Layout from "../../Components/Layouts/Layout";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import Loader from "../../Components/UI/Loader";
import convertRupiah from "../../utils/convertRupiah";
import * as yup from "yup";
import { Link, Redirect } from "react-router-dom";
import {
  getUserPaymentDetailsAction,
  postPaymentAction,
} from "../../actions/user.purchase.actions";
import useSingleImageUploader from "../../hooks/useSingleImageUploader";

const paymentSchema = yup.object().shape({
  bukti_bayar: Yup.object().shape({}),
  bank_tujuan: Yup.object().shape({}),
});

const UserPayment = props => {
  const { match, history } = props;
  const { invoiceId } = match?.params;

  const dispatch = useDispatch();
  const paymentProof = useSingleImageUploader("");

  const [alerts, setAlerts] = React.useState({
    show: false,
    message: "",
    type: "success",
  });
  const [destinationBank, setDestinationBank] = React.useState(null);

  const postPaymentState = useSelector(state => state.userPostPayment);
  const { loading, invoice, error } = useSelector(
    state => state.userPaymentDetails
  );

  React.useEffect(() => {
    dispatch(getUserPaymentDetailsAction(invoiceId));
  }, [dispatch, invoiceId]);

  React.useEffect(() => {
    if (invoice?.id_transaksi) {
      if (+invoice.status_transaksi !== 2) {
        history.push("/akun/pembelian");
      }
    }
  }, [invoice, history]);

  const loadingConfirm = postPaymentState.loading;

  // const bid = invoice?.tawaran;
  // const member = bid?.member;
  const seller = invoice?.lelang?.penjual;
  const sellerBank = seller?.akun_bank;
  // const auction = invoice?.lelang;

  const handleSubmit = e => {
    e.preventDefault();

    paymentSchema
      .validate({
        bukti_bayar: paymentProof.image,
        bank_tujuan: destinationBank,
      })
      .then(values => {
        dispatch(postPaymentAction({ id_transaksi: invoiceId, ...values }))
          .then(() => {
            history.push("/akun/result-pembayaran");
          })
          .catch(err => {
            console.log(err);
            history.push("/akun/result-pembayaran");
            setAlerts({
              show: true,
              message: err?.message || "Opps",
              type: "danger",
            });
          });
      })
      .catch(err => {
        setAlerts({
          show: true,
          message: "Gagal melakukan pembayaran",
          type: "danger",
        });
      });
  };

  const handleChangeDestiBank = id => {
    const selectedBank = sellerBank.filter(item => item.id_akun === +id)[0];
    setDestinationBank(selectedBank);
  };

  let delivery = "Jemput ditempat";

  if (invoice?.jenis_pengiriman === "COURIER_SERVICE") {
    delivery = "Layanan kurir";
  }

  const shippingAddress = invoice?.alamat_tujuan
    ? JSON.parse(invoice?.alamat_tujuan)
    : null;

  const disabledSubmit = false;

  return (
    <>
      <Layout>
        <BreadcrumbsContainer
          items={[
            { title: "Home", url: "/" },
            { title: "Akun", active: true },
            // { title: "Lelang Saya", url: "/akun/lelang" },
            { title: "Pembayaran", active: true },
          ]}
        />

        <Container fluid className="px-md-8 py-4">
          <Row>
            <Col md={3}>
              <UserSidebarMenu />
            </Col>
            <Col md={9}>
              {loading ? (
                <div className="w-100 py-3">
                  <Loader />
                </div>
              ) : error ? (
                <Redirect to="/akun/pembelian" />
              ) : (
                <section className="">
                  {alerts.show && (
                    <div className="mt-4">
                      <Alert
                        variant={alerts.type}
                        onClose={() =>
                          setAlerts({ show: false, message: "", type: "info" })
                        }
                        dismissible
                      >
                        {alerts.message}
                      </Alert>
                    </div>
                  )}
                  <Link
                    to="/akun/pembelian"
                    size="sm"
                    className="btn btn-light mb-2 "
                  >
                    Kembali
                  </Link>
                  <Form className="pt-2" onSubmit={handleSubmit}>
                    <Card>
                      <Card.Header className=" d-flex justify-content-between  bg-transparent">
                        {" "}
                        <h4 className="text-dark">Pembayaran</h4>
                        <p>ID {invoice?.id_transaksi}</p>{" "}
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          {" "}
                          <Col xs={12} lg={7} xl={7} className="mb-3">
                            <Row>
                              <Col
                                lg={4}
                                className=" d-flex justify-content-center"
                              >
                                <Card.Img
                                  style={{
                                    objectFit: "contain",
                                  }}
                                  className="card-img-wins-auction"
                                  src={invoice?.lelang?.gambar[0]?.url}
                                />
                              </Col>
                              <Col lg={8}>
                                <h5 className=" text-uppercase text-dark text-spacing-1 font-weight-bold mb-1  ">
                                  {invoice?.lelang.judul}
                                </h5>
                                <h4 className="mt-0 text-capitalize  text-primary ">
                                  Rp. {convertRupiah(+invoice?.total_harga)}
                                </h4>
                                <p className="mb-0 mt-3 text-dark font-weight-bold">
                                  <span className="text-gray-700 font-weight-normal">
                                    Seller
                                  </span>{" "}
                                  : <br />
                                  {invoice?.lelang?.penjual?.nama}
                                </p>
                                <p className="mb-0 text-dark font-weight-bold">
                                  <span className="text-gray-700 font-weight-normal">
                                    Pengiriman
                                  </span>{" "}
                                  : <br />
                                  <span className="">{delivery}</span>
                                </p>
                              </Col>
                            </Row>
                            <hr />
                            <div>
                              <p className="mb-0 text-dark font-weight-semibold">
                                <span className="text-gray-700 font-weight-bold">
                                  Alamat
                                </span>{" "}
                                <br />
                                <span className="">
                                  {shippingAddress?.alamat}
                                </span>
                              </p>
                            </div>
                            <Row className="pt-3">
                              <Col xs={12}>
                                <Card.Title>Pembayaran</Card.Title>
                              </Col>
                              <Col
                                lg={{
                                  span: 8,
                                }}
                              >
                                <Form.Group controlId="id_provinsi">
                                  <Form.Label>Bank Tujuan</Form.Label>

                                  <Form.Control
                                    className={`  bg-transparent border`}
                                    as="select"
                                    onChange={e =>
                                      handleChangeDestiBank(e.target.value)
                                    }
                                    value={destinationBank?.id_bank}
                                  >
                                    <option value={null}>
                                      Pilih nomor rekening tujuan
                                    </option>
                                    {sellerBank &&
                                      sellerBank.length !== 0 &&
                                      sellerBank.map(bank => {
                                        return (
                                          <option
                                            key={bank?.id_akun}
                                            value={bank?.id_akun}
                                          >
                                            {bank?.nama_bank} - {bank?.no_rek}
                                          </option>
                                        );
                                      })}
                                  </Form.Control>
                                </Form.Group>
                              </Col>
                              <Col lg={8}>
                                <Form.Group controlId="bukti">
                                  <Form.Label>
                                    Upload Bukti pembayaran
                                  </Form.Label>
                                  <div
                                    className="mt-2 mb-3"
                                    style={{
                                      width: 150,
                                    }}
                                  >
                                    {paymentProof.image && (
                                      <Image
                                        className="w-100"
                                        src={paymentProof.image?.url}
                                      />
                                    )}
                                  </div>
                                  <Form.File
                                    id="bukti-file"
                                    className="bg-transparent "
                                    accept="image/*"
                                    isInvalid={!paymentProof.image?.file}
                                    // ref={fileInput}
                                    // onClick={() => fileInput.current.click()}
                                    onChange={e => {
                                      paymentProof.handleFile(e.target.files);
                                    }}
                                    // custom
                                  />
                                </Form.Group>
                                {paymentProof.image === null ? (
                                  <Form.Control.Feedback type="invalid">
                                    Upload
                                  </Form.Control.Feedback>
                                ) : null}
                              </Col>
                              {destinationBank !== null && (
                                <Col lg={12}>
                                  <Alert variant="info">
                                    <p>
                                      Silahkan lakukan pembayaran dengan
                                      mengtransfer ke No Rekening Berikut :
                                    </p>
                                    <div>
                                      <p className="mb-1 font-weight-bold">
                                        Nomor Rekening :{" "}
                                        {destinationBank.no_rek}
                                      </p>
                                      <p className="mb-1 font-weight-bold">
                                        Atas Nama : {destinationBank.nama_rek}
                                      </p>
                                      <p className="font-weight-bold">
                                        Bank : {destinationBank.nama_bank}
                                      </p>
                                    </div>
                                  </Alert>
                                </Col>
                              )}
                            </Row>
                          </Col>{" "}
                          <Col xs={12} lg={5}>
                            <Card>
                              <Card.Header className=" d-flex justify-content-between  bg-transparent">
                                <Card.Title>Ringkasan pembelian</Card.Title>
                              </Card.Header>
                              <Card.Body>
                                <ListGroup className="pl-0  ">
                                  <ListGroup.Item className="pl-0  border-0 pb-0   ">
                                    <Card.Title className="mb-1">
                                      Total
                                    </Card.Title>
                                  </ListGroup.Item>
                                  <ListGroup.Item className="pl-0 border-0 pt-0 pb-1   ">
                                    <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                                      <div className=" text-gray-600    ">
                                        Harga barang
                                      </div>
                                      <div className=" text-primary ">
                                        Rp. {invoice?.tawaran.nilai_tawaran}
                                      </div>
                                    </div>
                                  </ListGroup.Item>
                                  <ListGroup.Item className="pl-0 border-0 pt-0 pb-1   ">
                                    <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                                      <div className=" text-gray-600    ">
                                        Ongkos Kirim
                                      </div>
                                      <div className=" text-primary ">
                                        Rp. {convertRupiah(+invoice?.ongkir)}
                                      </div>
                                    </div>
                                  </ListGroup.Item>
                                  <ListGroup.Item className="pl-0 border-top-0 border-left-0 border-right-0 pt-0 pb-2   ">
                                    <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                                      <div className=" text-gray-600    ">
                                        Biaya Packing
                                      </div>
                                      <div className=" text-primary ">
                                        Rp.{" "}
                                        {convertRupiah(
                                          +invoice?.lelang.biaya_packing
                                        )}
                                      </div>
                                    </div>
                                  </ListGroup.Item>

                                  <ListGroup.Item className="pl-0 border-0 pt-2 pb-1   ">
                                    <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                                      <div className=" text-primary    ">
                                        Total
                                      </div>
                                      <div className=" text-primary ">
                                        Rp.{" "}
                                        {convertRupiah(+invoice?.total_harga)}
                                      </div>
                                    </div>
                                  </ListGroup.Item>
                                </ListGroup>
                                <div className="mt-3 d-flex">
                                  {loadingConfirm ? (
                                    <>
                                      <Button
                                        disabled
                                        type="submit"
                                        className=" d-flex justify-content-center "
                                        block
                                      >
                                        <div>
                                          <Loader variant="light" size={11} />{" "}
                                          <span className="">Mengirim</span>
                                        </div>
                                      </Button>
                                    </>
                                  ) : (
                                    <Button
                                      disabled={disabledSubmit}
                                      type="submit"
                                      block
                                    >
                                      {"Bayar Sekarang"}
                                    </Button>
                                  )}
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>{" "}
                        </Row>
                      </Card.Body>
                    </Card>
                  </Form>
                </section>
              )}
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default UserPayment;
