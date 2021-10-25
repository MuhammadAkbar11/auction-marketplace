import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Container, Row, Card, ListGroup } from "react-bootstrap";
import { XCircle, CheckCircle } from "phosphor-react";
import Layout from "../../Components/Layouts/Layout";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import convertRupiah from "../../utils/convertRupiah";

const UserPaymentResult = props => {
  const { invoice, success, error } = useSelector(
    state => state.userPostPayment
  );
  const proof = invoice?.bukti_transfer
    ? JSON.parse(invoice?.bukti_transfer)
    : null;
  const bankDestination = proof?.bank_tujuan;

  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Akun", active: true },
          { title: "Pembayaran", active: true },
        ]}
      />
      <Container fluid className="px-md-8 py-4">
        <Row>
          <Col xs={12} className="my-3">
            <Link to="/akun/pembelian" className="btn btn-light">
              Kembali
            </Link>
          </Col>
          <Col sm={8} md={7} lg={5} className="mx-auto">
            <Card>
              <Card.Body>
                {success ? (
                  <>
                    <div className="w-100 d-flex justify-content-center text-success flex-column align-items-center ">
                      <CheckCircle size={85} />
                      <h3 className="text-spacing-1 font-weight-normal text-success text-capitalize">
                        Pembayaran Berhasil
                      </h3>
                    </div>
                    <div className="mt-3">
                      <p className="text-gray-600">
                        Terima kasih untuk pembayarannya, bukti pembayaran anda
                        sudah terkirim dan sedang diproses oleh penjual
                      </p>
                    </div>
                    <div className="mt-4 ">
                      <ListGroup className="pl-0  ">
                        <ListGroup.Item className="pl-0 border-0 pt-0 pb-1   ">
                          <div className="d-flex  justify-content-between ">
                            <div className=" text-gray-800    ">
                              Jenis pembayaran
                            </div>
                            <div className=" text-gray-800 ">Bank Transfer</div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="pl-0 border-0 pt-0 pb-1   ">
                          <div className="d-flex  justify-content-between ">
                            <div className=" text-gray-800    ">
                              Tgl pembayaran
                            </div>
                            <div className=" text-gray-800 ">
                              {invoice?.tgl_bayar}
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="pl-0   border-0 pb-0   ">
                          <Card.Title className="mb-1">Bank Tujuan</Card.Title>
                        </ListGroup.Item>
                        <ListGroup.Item className="pl-0 border-0 pt-0 pb-1   ">
                          <div className="d-flex  justify-content-between ">
                            <div className=" text-gray-800    ">Bank</div>
                            <div className=" text-gray-800 ">
                              {bankDestination?.nama_bank}
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="pl-0 border-0 pt-0 pb-1   ">
                          <div className="d-flex  justify-content-between ">
                            <div className=" text-gray-800    ">
                              No Rekening
                            </div>
                            <div className=" text-gray-800 ">
                              {bankDestination?.no_rek}
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="pl-0 border-0 pt-0 pb-1   ">
                          <div className="d-flex  justify-content-between ">
                            <div className=" text-gray-800    ">
                              Nama Rekening
                            </div>
                            <div className=" text-gray-800 ">
                              {bankDestination?.nama_rek}
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="pl-0 border-0 mt-1 pb-1   ">
                          <div className="d-flex  justify-content-between ">
                            <div className=" text-gray-800 font-weight-bold    ">
                              Total harga
                            </div>
                            <div className=" text-gray-800 font-weight-bold ">
                              Rp. {convertRupiah(+invoice?.total_harga)}
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="pl-0 border-0 mt-1 pb-1   ">
                          <div className="d-flex  justify-content-between ">
                            <div className=" text-gray-800 font-weight-bold    ">
                              ID Transaksi
                            </div>
                            <div className=" text-gray-800 font-weight-bold ">
                              {invoice?.id_transaksi}
                            </div>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                    <div className="w-100 mt-3  d-flex justify-content-center">
                      <Link
                        className="btn btn-success mx-auto"
                        to="/akun/pembelian"
                      >
                        Close
                      </Link>
                    </div>
                  </>
                ) : error ? (
                  <>
                    <div className="w-100 d-flex justify-content-center text-danger flex-column align-items-center ">
                      <XCircle size={85} />
                      <h3 className="text-spacing-1 font-weight-normal text-danger text-capitalize">
                        Pembayaran Gagal
                      </h3>
                    </div>
                    <div className="mt-3">
                      <p className="text-gray-600">
                        Seperti anda beberapa kesalahan silahkan coba lagi.
                      </p>
                    </div>
                    <div className="w-100 mt-3 d-flex justify-content-center">
                      <Link
                        className="btn btn-danger mx-auto"
                        to="/akun/pembelian"
                      >
                        Coba lagi
                      </Link>
                    </div>
                  </>
                ) : (
                  <Redirect to="/akun/pembelian" />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default UserPaymentResult;
