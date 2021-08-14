import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import Layout from "../../Components/Layouts/Layout";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import Loader from "../../Components/UI/Loader";
import convertRupiah from "../../utils/convertRupiah";
import {
  getUserSoldItemDetailsAction,
  postSellerConfirmBillAction,
} from "../../actions/user.actions";
import { onlyNumbers } from "../../utils/replace";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, Redirect } from "react-router-dom";

let schema = yup.object().shape({
  ongkir: yup
    .number()
    .typeError("Ongkir harus berupa angka")
    .required("Ongkir belum terisi")
    .integer("ongkir tidak mendukung karakter lain selain angka")
    .positive("Ongkir harus positif"),
});

const UserConfirmAuctionBill = props => {
  const { match, history } = props;

  const { invoiceId } = match?.params;

  const dispatch = useDispatch();

  const [loadingConfirm, setLoadingConfirm] = React.useState(false);
  const [errors, setErrors] = React.useState(null);

  const soldItemDetailsState = useSelector(state => state.userSoldItemDetails);

  React.useEffect(() => {
    dispatch(getUserSoldItemDetailsAction(invoiceId));
  }, []);

  const { loading, details, error } = soldItemDetailsState;
  const bid = details?.tawaran;
  const member = bid?.member;
  // const bidValue = convertRupiah(120000);
  const destinationAddress = details?.alamat_tujuan
    ? JSON.parse(details?.alamat_tujuan)
    : null;

  const auction = details?.lelang;

  const itemDimension = auction ? JSON.parse(auction?.dimensi_brg) : {};

  const formik = useFormik({
    validationSchema: schema,
    enableReinitialize: true,
    // validateOnBlur: false,
    // validateOnChange: false,
    initialValues: {
      id_transaksi: invoiceId,
      ongkir: "",
    },
    onSubmit: values => {
      setLoadingConfirm(true);
      return dispatch(postSellerConfirmBillAction(values))
        .then(result => {
          setLoadingConfirm(false);
          history.push("/akun/lelang?tab=sold");
        })
        .catch(err => {
          console.log(err);
          setLoadingConfirm(false);
          setErrors(err);
        });
    },
  });

  const formikValues = formik.values;
  const formikErr = formik.errors;

  // React.useEffect(() => {
  //   if (details) {
  //     if (+details.status_transaksi !== 1) {
  //       history.push("/akun/lelang?tab=sold");
  //     }
  //   }
  // }, [details]);

  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Akun", active: true },
          { title: "Lelang Saya", url: "/akun/lelang" },
          { title: "Konfirmasi Tagihan", active: true },
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
              <Redirect to="/akun/lelang?tab=sold" />
            ) : (
              <div className="pt-3">
                <h4>Konfirmasi tagihan</h4>
                <p>ID {details?.id_transaksi}</p>
                <Form className="pt-2" onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col xs={{ order: 1, span: 12 }} sm={6} md={8} lg={6}>
                      <Card className=" border-0">
                        <Card.Body className="pl-0 ">
                          <h5 className="mb-2">Kostumer</h5>
                          <div className="pl-0 border-0 ">
                            <div className="row ">
                              <div className="text-left col-sm-5 text-gray-700">
                                Nama
                              </div>
                              <div className="text-left  col-sm-7 text-black text-nowrap">
                                : {member ? member?.nama : "-"}
                              </div>
                            </div>
                            <div className="row pt-2 ">
                              <div className="text-left col-sm-5 text-gray-700">
                                Email
                              </div>
                              <div className="text-left  col-sm-7 text-black text-nowrap">
                                : {member ? member?.email : "-"}
                              </div>
                            </div>
                            <div className="row pt-2 ">
                              <div className="text-left col-sm-5 text-gray-700">
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
                    {/* <Col sm={6} md={8} lg={6}></Col> */}
                    <Col xs={{ order: 2, span: 12 }} sm={6} md={8} lg={6}>
                      <Card className="border-0 ">
                        <Card.Body className="pl-0">
                          <h5 className="mb-2">Info barang</h5>

                          <div className="row ">
                            <div className="text-left col-sm-5 text-gray-700">
                              Judul
                            </div>
                            <div className="text-left  col-sm-7 text-black text-nowrap">
                              : {auction?.judul}
                            </div>
                          </div>
                          <div className="row ">
                            <div className="text-left col-sm-5 text-gray-700">
                              Berat
                            </div>
                            <div className="text-left  col-sm-7 text-black text-nowrap">
                              : {itemDimension?.berat / 1000} Kg
                            </div>
                          </div>
                          <div className="row ">
                            <div className="text-left col-sm-5 text-gray-700">
                              Tinggi
                            </div>
                            <div className="text-left  col-sm-7 text-black text-nowrap">
                              :{" "}
                              {+itemDimension?.tinggi >= 100
                                ? +itemDimension?.tinggi / 100 + " m"
                                : +itemDimension?.tinggi + " cm"}{" "}
                            </div>
                          </div>
                          <div className="row ">
                            <div className="text-left col-sm-5 text-gray-700">
                              Panjang / Lebar
                            </div>
                            <div className="text-left  col-sm-7 text-black text-nowrap">
                              :{" "}
                              {+itemDimension?.panjang >= 100
                                ? +itemDimension?.panjang / 100 + " m"
                                : itemDimension?.panjang + " cm"}{" "}
                              /{" "}
                              {+itemDimension?.lebar >= 100
                                ? +itemDimension?.lebar / 100 + " m"
                                : itemDimension?.lebar + " cm"}{" "}
                              {+itemDimension?.lebar}
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      xs={{ order: 4, span: 12 }}
                      sm={{ span: 8, order: 4 }}
                      md={8}
                      lg={6}
                    >
                      <Card className="border-0">
                        <Card.Body className="pl-0">
                          <h5 className="mb-2">Tagihan</h5>
                          <Form.Group>
                            <Form.Label>Harga tawaran</Form.Label>
                            <Form.Control
                              type="text"
                              className={`border `}
                              defaultValue={bid?.nilai_tawaran}
                              disabled
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Biaya Packing</Form.Label>
                            <Form.Control
                              type="text"
                              className={` border`}
                              disabled
                              defaultValue={convertRupiah(
                                +auction?.biaya_packing
                              )}
                            />
                          </Form.Group>

                          <Form.Group controlId="ongkir">
                            <Form.Label>Ongkir</Form.Label>
                            <Form.Control
                              type="text"
                              className={` bg-transparent border`}
                              onChange={formik.handleChange}
                              value={formik.values.ongkir}
                              placeholder="Masukan ongkir"
                              isInvalid={formik.errors.ongkir ? true : false}
                            />
                            {formik.errors.ongkir ? (
                              <Form.Control.Feedback type="invalid">
                                {formik.errors.ongkir}
                              </Form.Control.Feedback>
                            ) : null}
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      xs={{ order: 3, span: 12 }}
                      sm={{ span: 8, order: 3 }}
                      md={{ span: 8, order: 4 }}
                      lg={6}
                      order
                    >
                      <Card className="border-0">
                        <Card.Body className="pl-0">
                          <h5 className="mb-2">Alamat pengiriman</h5>
                          <div className="row ">
                            <div className="text-left col-sm-6 text-gray-700">
                              Provinsi
                            </div>
                            <div className="text-left  col-sm-6 text-black ">
                              : {destinationAddress?.provinsi}
                            </div>
                          </div>
                          <div className="row pt-2 ">
                            <div className="text-left col-sm-6 text-gray-700">
                              Kota / Kabupaten
                            </div>
                            <div className="text-left  col-sm-6 text-black ">
                              : {destinationAddress?.kota}
                            </div>
                          </div>
                          <div className="row pt-2 ">
                            <div className="text-left col-sm-6 text-gray-700">
                              Kecamata / Kelurahan
                            </div>
                            <div className="text-left  col-sm-6 text-black ">
                              : Kec. {destinationAddress?.kecamatan} / Kel.{" "}
                              {destinationAddress?.kelurahan}
                            </div>
                          </div>
                          <div className="row pt-2 ">
                            <div className="text-left col-sm-6 text-gray-700">
                              Alamat
                            </div>
                            <div className="text-left  col-sm-6 text-black ">
                              : <span>{destinationAddress?.alamat}</span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      xs={{ order: 5, span: 12 }}
                      sm={12}
                      className="text-left text-md-right "
                    >
                      <h5>Total Harga</h5>
                      {(() => {
                        let result = 0;
                        const bidValueNum = onlyNumbers(bid?.nilai_tawaran);
                        const packingFee = auction?.biaya_packing;
                        const ongkirValues = formikValues.ongkir;
                        if (formikErr.ongkir === undefined) {
                          const sum =
                            +bidValueNum + +packingFee + +ongkirValues;
                          result = "Rp. " + convertRupiah(sum);
                        } else {
                          result = "Loading...";
                        }

                        return <h3 className="text-primary">{result}</h3>;
                      })()}
                      {/* <h4>Rp. {convertRupiah(formik.values.total_harga)}</h4> */}
                      <br />
                    </Col>
                  </Row>
                  <div className="d-flex">
                    <Link
                      to="/akun/lelang?tab=sold"
                      className="btn btn-outline-primary mr-2"
                    >
                      Batalkan
                    </Link>
                    <Button type="submit">
                      {loadingConfirm ? (
                        <>
                          <Loader variant="light" size={11} />{" "}
                          <span className="ml-2"> Mengirim</span>
                        </>
                      ) : (
                        "Konfirmasi"
                      )}
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default UserConfirmAuctionBill;
