import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Col,
  Container,
  Form,
  Row,
  Card,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Check } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import CreateAuctionSteps from "./CreateAuctionSteps";

// import { _dateFormat } from "../../utils/date-format";
// import convertRupiah from "../../utils/convertRupiah";

import {
  getUserDetailsAction,
  postUserCreateAuctionAction,
  userAddAuctionDelivery,
  userResetCreateAuction,
} from "../../actions/user.actions";
import Loader from "../UI/Loader";
import userIndonesianArea from "../../hooks/useIndonesianArea";

const formikSchema = Yup.object().shape({
  id_provinsi: Yup.string().required("Silahkan pilih provinsi"),
  id_kota: Yup.string().required("Silahkan pilih kota"),
  id_kecamatan: Yup.string().required("Silahkan pilih kecamata"),
  id_kelurahan: Yup.string().required("Silahkan pilih kelurahan"),
  alamat: Yup.string().required("Alamat belum terisi"),
  panjang: Yup.number()
    .typeError("Harus Angka")
    .required("Panjang barang belum terisi"),
  lebar: Yup.number()
    .typeError("Harus Angka")
    .required("Lebar barang belum terisi"),
  tinggi: Yup.number()
    .typeError("Harus Angka")
    .required("Tinggi barang belum terisi"),
  berat: Yup.number()
    .typeError("Harus Angka")
    .required("Berat barang belum terisi"),
  kode_pos: Yup.string().required("Kode Pos belum terisi"),
  biaya_packing: Yup.number()
    .typeError("Harus Angka")
    .required("Biaya packing belum terisi"),
});

const DeliveryTab = () => {
  const history = useHistory();

  const createAuctionState = useSelector(state => state.userCreateAuction);
  const userDetailsState = useSelector(state => state.userDetails);
  const userDetailsData = userDetailsState.details;

  const success = createAuctionState.success;
  const timePriceState = createAuctionState?.regular;
  const deliveryState = createAuctionState?.delivery;

  const dispatch = useDispatch();

  const [followUserAddress, setFollowUserAddress] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (success) {
        dispatch(userResetCreateAuction());
      }
    };
  }, [success, dispatch]);

  React.useEffect(() => {
    dispatch(getUserDetailsAction());
  }, [dispatch]);

  const formik = useFormik({
    validationSchema: formikSchema,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      id_provinsi: deliveryState?.id_provinsi || "",
      id_kota: deliveryState?.id_kota || "",
      id_kecamatan: deliveryState?.id_kecamatan || "",
      id_kelurahan: deliveryState?.id_kelurahan || "",
      alamat: deliveryState?.alamat || "",
      kode_pos: deliveryState?.kode_pos || "",
      jenis_pengiriman: deliveryState?.jenis_pengiriman || {
        pickup: false,
        courier_service: false,
      },
      panjang: deliveryState?.dimensi_brg?.panjang || "",
      lebar: deliveryState?.dimensi_brg?.lebar || "",
      tinggi: deliveryState?.dimensi_brg?.tinggi || "",
      berat: deliveryState?.dimensi_brg?.berat || "",
      biaya_packing: deliveryState?.biaya_packing || "",
    },
    onSubmit: values => {
      // console.log(values);
      dispatch(postUserCreateAuctionAction(values)).then(result => {
        history.push("/akun/lelang");
      });
    },
  });

  const idProv = formik.values.id_provinsi;
  const idKota = formik.values.id_kota;
  const idKec = formik.values.id_kecamatan;

  const indonesiaArea = userIndonesianArea(idProv, idKota, idKec);

  const handleCheckedByUserAddress = e => {
    setFollowUserAddress(e.currentTarget.checked);

    if (e.currentTarget.checked) {
      formik.setFieldValue("alamat", userDetailsData?.alamat);
      indonesiaArea.loadProvinsi();
      indonesiaArea.loadKota(userDetailsData?.id_provinsi);
      indonesiaArea.loadKecamatan(userDetailsData?.id_kota);
      indonesiaArea.loadKelurahan(userDetailsData?.id_kecamatan);

      formik.setFieldValue("id_provinsi", userDetailsData?.id_provinsi);
      formik.setFieldValue("id_kota", userDetailsData?.id_kota);
      formik.setFieldValue("id_kecamatan", userDetailsData?.id_kecamatan);
      formik.setFieldValue("id_kelurahan", userDetailsData?.id_kelurahan);
      formik.setFieldValue("kode_pos", userDetailsData?.kode_pos);
    }
  };

  const handleChangeTypeDeliery = e => {
    const name = e.target.name;

    const obj = formik.values.jenis_pengiriman;

    const newObj = {
      ...obj,
      [name]: e.currentTarget.checked,
    };

    formik.setFieldValue("jenis_pengiriman", newObj);
  };

  const handleChangeProvinsi = e => {
    formik.setFieldValue("id_provinsi", e.target.value);
    indonesiaArea.loadKota(e.target.value, true, result => {
      formik.setFieldValue("id_kota", result[0]?.id);
    });
    indonesiaArea.loadKecamatan(formik.values.id_kota, true, result => {
      formik.setFieldValue("id_kecamatan", result[0]?.id);
    });
    indonesiaArea.loadKelurahan(formik.values.id_kecamatan, true, result => {
      formik.setFieldValue("id_kelurahan", result[0]?.id);
    });
  };

  const handleChangeKota = e => {
    formik.setFieldValue("id_kota", e.target.value);
    indonesiaArea.loadKecamatan(e.target.value, true, result => {
      formik.setFieldValue("id_kecamatan", result[0]?.id);
    });
    indonesiaArea.loadKelurahan(formik.values.id_kec, true, result => {
      formik.setFieldValue("id_kelurahan", result[0]?.id);
    });
  };

  const handleChangeKecamatan = e => {
    formik.setFieldValue("id_kecamatan", e.target.value);
    indonesiaArea.loadKecamatan(formik.values.id_kota, true, result => {
      formik.setFieldValue("id_kecamatan", result[0]?.id);
    });
    indonesiaArea.loadKelurahan(e.target.value, true, result => {
      formik.setFieldValue("id_kelurahan", result[0]?.id);
    });
  };

  return !timePriceState ? (
    <Redirect to="/akun/buat-lelang?tab=harga-dan-durasi" />
  ) : (
    <Container fluid className=" px-md-8">
      <Row>
        <Col xs={12}>
          <CreateAuctionSteps step1 step2 step3 step4 currentStep="step4" />
        </Col>
      </Row>
      <Form onSubmit={formik.handleSubmit}>
        {/* <input type="text" /> */}
        <Row>
          <Col xs={12}>
            <div className="d-flex justify-content-end mb-3 ">
              {" "}
              <Button
                onClick={() => {
                  dispatch(userAddAuctionDelivery(formik.values));
                  history.push("/akun/buat-lelang?tab=harga-dan-durasi");
                }}
                className="btn btn-primary"
              >
                Kembali
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="ml-2"
                disabled={createAuctionState.loading}
              >
                {createAuctionState.loading ? (
                  <>
                    <Loader variant="light" size={11} />{" "}
                    <span className="ml-2"> Buat Lelang</span>
                  </>
                ) : (
                  "Buat Lelang"
                )}
              </Button>
              {/* <Button type="submit" className="ml-2" dis>
                Next
              </Button> */}
            </div>
            <Card body className="pt-3 pb-5 mb-5">
              <Row>
                <Col sm={6} className="mb-5 mb-md-0">
                  <Card.Title>Alamat Pengambilan</Card.Title>

                  <ButtonGroup toggle className=" mb-3 mt-3">
                    <ToggleButton
                      type="checkbox"
                      // variant="success"

                      className="p-0 d-flex bg-white border border-gray-400 shadow-none  rounded-sm "
                      checked={followUserAddress}
                      value="1"
                      onChange={e => handleCheckedByUserAddress(e)}
                    >
                      <div
                        className={`px-2 py-2 ${
                          followUserAddress ? "bg-success" : "bg-gray-400"
                        }  text-white`}
                      >
                        {followUserAddress ? (
                          <Check size={18} />
                        ) : (
                          <Check
                            style={{
                              opacity: 0,
                            }}
                            size={18}
                          />
                        )}
                      </div>
                      <span
                        className={`px-3  py-2 ${
                          followUserAddress ? "text-gray-600" : "text-gray-700"
                        } font-weight-lighter  text-capitalize `}
                      >
                        Menurut Alamat terdaftar
                      </span>
                    </ToggleButton>
                  </ButtonGroup>
                  <Form.Group controlId="alamat">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      as="textarea"
                      className={` ${
                        !followUserAddress && "bg-transparent"
                      }  border`}
                      disabled={followUserAddress}
                      onChange={formik.handleChange}
                      rows={3}
                      value={formik.values.alamat}
                      isInvalid={formik.errors.alamat ? true : false}
                    />
                    {formik.errors.alamat ? (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.alamat}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                  {/*  */}
                  <Form.Group controlId="id_provinsi">
                    <Form.Label>Provinsi</Form.Label>
                    <Form.Control
                      className={` ${
                        !followUserAddress && "bg-transparent"
                      }  border`}
                      disabled={followUserAddress}
                      as="select"
                      onChange={handleChangeProvinsi}
                      onBlur={formik.handleBlur}
                      value={formik.values.id_provinsi}
                      isInvalid={formik.errors.id_provinsi ? true : false}
                    >
                      {indonesiaArea.provinsi.map(prov => {
                        return (
                          <option key={prov.id} value={prov.id}>
                            {prov.nama}
                          </option>
                        );
                      })}
                    </Form.Control>
                    {formik.errors.id_provinsi ? (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.id_provinsi}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                  {/*  start */}
                  <Form.Group controlId="id_kota">
                    <Form.Label>Kota</Form.Label>
                    <Form.Control
                      className={` ${
                        !followUserAddress && "bg-transparent"
                      }  border`}
                      as="select"
                      onChange={handleChangeKota}
                      onBlur={formik.handleBlur}
                      value={formik.values.id_kota}
                      disabled={followUserAddress}
                      isInvalid={formik.errors.id_kota ? true : false}
                    >
                      {indonesiaArea.kota.map(kota => {
                        return (
                          <option key={kota.id} value={kota.id}>
                            {kota.nama}
                          </option>
                        );
                      })}
                    </Form.Control>
                    {formik.errors.id_kota ? (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.id_kota}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                  {/* end */}

                  {/*  start */}
                  <Form.Group controlId="id_kecamatan">
                    <Form.Label>Kecamatan</Form.Label>
                    <Form.Control
                      className={` ${
                        !followUserAddress && "bg-transparent"
                      }  border`}
                      as="select"
                      disabled={followUserAddress}
                      onChange={handleChangeKecamatan}
                      onBlur={formik.handleBlur}
                      value={formik.values.id_kecamatan}
                      isInvalid={formik.errors.id_kecamatan ? true : false}
                    >
                      {indonesiaArea.kecamatan.map(kec => {
                        return (
                          <option key={kec.id} value={kec.id}>
                            {kec.nama}
                          </option>
                        );
                      })}
                    </Form.Control>
                    {formik.errors.id_kecamatan ? (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.id_kecamatan}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                  {/* end */}
                  {/*  start */}
                  <Form.Group controlId="id_kelurahan">
                    <Form.Label>Kelurahan</Form.Label>
                    <Form.Control
                      className={` ${
                        !followUserAddress && "bg-transparent"
                      }  border`}
                      as="select"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={followUserAddress}
                      value={formik.values.id_kelurahan}
                      isInvalid={formik.errors.id_kelurahan ? true : false}
                    >
                      {indonesiaArea.kelurahan.map(kelurahan => {
                        return kelurahan.id === formik.values.id_kelurahan ? (
                          <option
                            selected
                            key={kelurahan.id}
                            value={kelurahan.id}
                          >
                            {kelurahan.nama}
                          </option>
                        ) : (
                          <option key={kelurahan.id} value={kelurahan.id}>
                            {kelurahan.nama}
                          </option>
                        );
                      })}
                    </Form.Control>
                    {formik.errors.id_kelurahan ? (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.id_kelurahan}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                  {/* end */}
                  <Form.Group controlId="kode_pos">
                    <Form.Label>Kode Pos</Form.Label>
                    <Form.Control
                      type="text"
                      className={` ${
                        !followUserAddress && "bg-transparent"
                      }  border`}
                      disabled={followUserAddress}
                      onChange={formik.handleChange}
                      value={formik.values.kode_pos}
                      isInvalid={formik.errors.kode_pos ? true : false}
                    />
                    {formik.errors.kode_pos ? (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.kode_pos}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Card.Title>Jenis Pengiriman</Card.Title>
                  <div className="d-flex flex-column flex-md-row mb-5 ">
                    <ButtonGroup toggle className=" mb-3 mt-3 mr-md-4">
                      <ToggleButton
                        type="checkbox"
                        // variant="success"
                        name="pickup"
                        className="p-0 d-flex bg-white border border-gray-400 shadow-none  rounded-sm "
                        checked={formik.values?.jenis_pengiriman?.pickup}
                        value={1}
                        onChange={e => handleChangeTypeDeliery(e)}
                      >
                        <div
                          className={`px-2 py-2 ${
                            formik.values?.jenis_pengiriman?.pickup
                              ? "bg-success"
                              : "bg-gray-400"
                          }  text-white`}
                        >
                          {formik.values?.jenis_pengiriman?.pickup ? (
                            <Check size={18} />
                          ) : (
                            <Check
                              style={{
                                opacity: 0,
                              }}
                              size={18}
                            />
                          )}
                        </div>
                        <span
                          className={`px-3  py-2 ${
                            formik.values?.jenis_pengiriman?.pickup
                              ? "text-gray-600"
                              : "text-gray-700"
                          } font-weight-lighter  text-capitalize `}
                        >
                          Pick up
                        </span>
                      </ToggleButton>
                    </ButtonGroup>
                    <ButtonGroup toggle className="mr-md-4 mb-3 mt-3">
                      <ToggleButton
                        type="checkbox"
                        // variant="success"
                        name="courier_service"
                        className="p-0 d-flex bg-white border border-gray-400 shadow-none  rounded-sm "
                        checked={
                          formik.values?.jenis_pengiriman?.courier_service
                        }
                        value={1}
                        onChange={e => handleChangeTypeDeliery(e)}
                      >
                        <div
                          className={`px-2 py-2 ${
                            formik.values?.jenis_pengiriman?.courier_service
                              ? "bg-success"
                              : "bg-gray-400"
                          }  text-white`}
                        >
                          {formik.values?.jenis_pengiriman?.courier_service ? (
                            <Check size={18} />
                          ) : (
                            <Check
                              style={{
                                opacity: 0,
                              }}
                              size={18}
                            />
                          )}
                        </div>
                        <span
                          className={`px-3  py-2 ${
                            formik.values?.jenis_pengiriman?.courier_service
                              ? "text-gray-600"
                              : "text-gray-700"
                          } font-weight-lighter  text-capitalize `}
                        >
                          Courier Service
                        </span>
                      </ToggleButton>
                    </ButtonGroup>
                    {/* start
                    <ButtonGroup toggle className=" mb-3 mt-3">
                      <ToggleButton
                        type="checkbox"
                        // variant="success"
                        name="bySeller"
                        className="p-0 d-flex bg-white border border-gray-400 shadow-none  rounded-sm "
                        checked={formik.values?.jenis_pengiriman?.bySeller}
                        value={1}
                        onChange={e => handleChangeTypeDeliery(e)}
                      >
                        <div
                          className={`px-2 py-2 ${
                            formik.values?.jenis_pengiriman?.bySeller
                              ? "bg-success"
                              : "bg-gray-400"
                          }  text-white`}
                        >
                          {formik.values?.jenis_pengiriman?.bySeller ? (
                            <Check size={18} />
                          ) : (
                            <Check
                              style={{
                                opacity: 0,
                              }}
                              size={18}
                            />
                          )}
                        </div>
                        <span
                          className={`px-3  py-2 ${
                            formik.values?.jenis_pengiriman?.bySeller
                              ? "text-gray-600"
                              : "text-gray-700"
                          } font-weight-lighter  text-capitalize `}
                        >
                          Diantar penjual
                        </span>
                      </ToggleButton>
                    </ButtonGroup> */}
                  </div>
                  <Card.Title>Estimasi Dimensi Packing Barang</Card.Title>
                  <Form.Group className="mt-4">
                    <Form.Label>Dimensi Barang (cm)</Form.Label>
                    <Form.Row>
                      <Col>
                        <Form.Group controlId="panjang">
                          <Form.Control
                            type="text"
                            className="bg-transparent border"
                            placeholder="Panjang"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.panjang}
                            isInvalid={formik.errors.panjang ? true : false}
                          />
                          {formik.errors.panjang ? (
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.panjang}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="lebar">
                          <Form.Control
                            className="bg-transparent border"
                            type="text"
                            placeholder="Lebar"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lebar}
                            isInvalid={formik.errors.lebar ? true : false}
                          />
                          {formik.errors.lebar ? (
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.lebar}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="tinggi">
                          <Form.Control
                            type="text"
                            className="bg-transparent border"
                            placeholder="Tinggi"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.tinggi}
                            isInvalid={formik.errors.tinggi ? true : false}
                          />
                          {formik.errors.tinggi ? (
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.tinggi}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group controlId="berat">
                    <Form.Label>Berat Barang (gram)</Form.Label>
                    <Form.Control
                      type="text"
                      className="bg-transparent border"
                      placeholder="Berat"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.berat}
                      isInvalid={formik.errors.berat ? true : false}
                    />
                    {formik.errors.berat ? (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.berat}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="biaya_packing">
                    <Form.Label>Biaya Packing</Form.Label>
                    <Form.Control
                      type="text"
                      className="bg-transparent border"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.biaya_packing}
                      isInvalid={formik.errors.biaya_packing ? true : false}
                    />
                    {formik.errors.biaya_packing ? (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.biaya_packing}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
            </Card>{" "}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default DeliveryTab;
