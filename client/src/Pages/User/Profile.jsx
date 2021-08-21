import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { WarningCircle, CheckCircle } from "phosphor-react";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import InputGroupRow from "../../Components/UI/InputGroupRow";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetailsAction,
  updateUserProfileAction,
  userResetUpdateProfile,
} from "../../actions/user.actions";
import Loader from "../../Components/UI/Loader";
import { setResetAction } from "../../actions/app.actions";
import Layout from "../../Components/Layouts/Layout";
import UserBankAccount from "../../Components/UserBankAccount/UserBankAccount";
import UserProfilePicture from "../../Components/UserProfilePicture";

const updateProfileSchema = Yup.object().shape({
  nama: Yup.string().required("Nama belum terisi"),
  username: Yup.string()
    .required("Username belum terisi ")
    .min(6, "Username harus lebih dari 6 karakter"),
  noHp: Yup.number()
    .typeError("Yang diisi harus angka")
    .required("Nomor telepon belum terisi"),
  noKtp: Yup.string()
    .required("Nomor KTP belum terisi")
    .min(16, "Nomor KTP minimal 16 karakter"),
  tglLahir: Yup.string().required("Tgl Lahir belum terisi"),
  idProvinsi: Yup.string().required("Silahkan pilih provinsi"),
  idKota: Yup.string().required("Silahkan pilih kota"),
  idKec: Yup.string().required("Silahkan pilih kecamata"),
  idKelu: Yup.string().required("Silahkan pilih kelurahan"),
  alamat: Yup.string().required("Alamat belum terisi"),
  kodePos: Yup.string().required("Kode Pos belum terisi"),
});

const apiUrl = "https://dev.farizdotid.com/api/daerahindonesia";

// const formInitValues = {

// }

const Profile = ({ history }) => {
  const { userInfo } = useSelector(state => state.authUser);
  const userDetailsState = useSelector(state => state.userDetails);
  const userDetails = userDetailsState.details;
  const userDetailsError = userDetailsState.error;
  const userDetailsLoading = userDetailsState.loading;
  const { loading, error, success } = useSelector(
    state => state.userUpdateProfile
  );

  const dispatch = useDispatch();

  const [listProvinsi, setListProvinsi] = React.useState([]);
  const [listKota, setListKota] = React.useState([]);
  const [listKecamatan, setListKecamatan] = React.useState([]);
  const [listKelurahan, setListKelurahan] = React.useState([]);

  React.useEffect(() => {
    if (!userInfo) {
      history.push("/akun/masuk");
      return;
    } else {
      dispatch(getUserDetailsAction());
    }
  }, [userInfo]);

  const updateProfileFormik = useFormik({
    validationSchema: updateProfileSchema,
    enableReinitialize: true,
    initialValues: {
      nama: userDetails?.nama || "",
      username: userDetails?.username || "",
      noHp: userDetails?.no_hp || "",
      tglLahir: userDetails?.tgl_lahir || "1996-05-28",
      noKtp: userDetails?.no_ktp || "0802020202101022",
      alamat: userDetails?.alamat || "",
      idProvinsi: userDetails?.id_provinsi || "11",
      idKota: userDetails?.id_kota || "",
      idKec: userDetails?.id_kecamatan || "",
      idKelu: userDetails?.id_kelurahan || "",
      kodePos: userDetails?.kode_pos || "",
    },
    onSubmit: values => {
      // dispatch(authRegisterAction(values));

      dispatch(updateUserProfileAction(values));
      // history.push('/payment');
    },
  });

  const idProv = updateProfileFormik.values.idProvinsi;
  const idKota = updateProfileFormik.values.idKota;
  const idKec = updateProfileFormik.values.idKec;

  const loadProvinsi = async () => {
    const result = await axios
      .get(`${apiUrl}/provinsi`)
      .then(res => res.data.provinsi);
    setListProvinsi(result);
  };

  const loadKota = async (query, setVal = false) => {
    const result = await axios
      .get(`${apiUrl}/kota?id_provinsi=${query}`)
      .then(res => res.data.kota_kabupaten);
    setListKota(result);
    if (setVal) {
      updateProfileFormik.setFieldValue("idKota", result[0]?.id);
    }
  };

  const loadKecamatan = async (query, setVal = false) => {
    const result = await axios
      .get(`${apiUrl}/kecamatan?id_kota=${query}`)
      .then(res => res.data.kecamatan);
    setListKecamatan(result);
    if (setVal) {
      updateProfileFormik.setFieldValue("idKec", result[0]?.id);
    }
  };

  const loadKelurahan = async (query, setVal = false) => {
    const result = await axios
      .get(`${apiUrl}/kelurahan?id_kecamatan=${query}`)
      .then(res => res.data.kelurahan);

    setListKelurahan(result);
    if (setVal) {
      updateProfileFormik.setFieldValue("idKelu", result[0]?.id);
    }
  };

  React.useEffect(() => {
    loadProvinsi();
    loadKota(idProv);
    loadKecamatan(idKota);
    loadKelurahan(idKec);
  }, [idProv, idKota, idKec]);

  const spesificIsInvalid = {
    username: {
      isInvalid: updateProfileFormik.errors.username
        ? true
        : false || error?.validation?.username,
      message:
        updateProfileFormik.errors.username ||
        error?.validation?.username?.message[0],
    },
  };

  const handleChangeProvinsi = e => {
    updateProfileFormik.setFieldValue("idProvinsi", e.target.value);
    loadKota(e.target.value, true);
    loadKecamatan(updateProfileFormik.values.idKota, true);
    loadKelurahan(updateProfileFormik.values.idKec, true);
  };

  const handleChangeKota = e => {
    updateProfileFormik.setFieldValue("idKota", e.target.value);
    loadKecamatan(e.target.value, true);
    loadKelurahan(updateProfileFormik.values.idKec, true);
  };
  const handleChangeKecamatan = e => {
    updateProfileFormik.setFieldValue("idKec", e.target.value);

    loadKelurahan(e.target.value, true);
  };

  // Contents

  const handleLoadProfile = () => {
    dispatch(getUserDetailsAction());
  };

  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Profile", active: true },
        ]}
      />
      <Container fluid className="px-md-8 py-4">
        <Row>
          <Col md={3}>
            <UserSidebarMenu />
          </Col>
          <Col md={9}>
            <Card>
              <Card.Header className="bg-transparent text-dark text-uppercase font-weight-bold d-flex justify-content-between">
                Informasi Akun{" "}
                <Link
                  to="/akun/ubah-password"
                  className="text-spacing-0 text-capitalize  font-weight-normal "
                >
                  Ubah password
                </Link>
              </Card.Header>
              <Card.Body>
                {" "}
                {userDetailsError ? (
                  <>
                    <div className=" py-2 d-flex flex-column align-items-center justify-content-center ">
                      <WarningCircle size={50} className="text-danger " />{" "}
                      <h5 className="text-center text-capitalize text-spacing-0 mt-1 text-danger ">
                        Opps!
                      </h5>
                      <p className="text-center mt-1">
                        Sepertinya ada kesalahan server, silahkan refresh
                        halaman atau logout, kemudian login lagi
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {error && !error.validation && (
                      <div className="mb-2">
                        <Alert variant="danger" className="px-1">
                          {" "}
                          <WarningCircle size={28} className="ml-3" />{" "}
                          {error.message}
                        </Alert>
                      </div>
                    )}
                    {success && (
                      <div className="mb-2">
                        <Alert
                          variant="success"
                          className="px-1"
                          dismissible
                          onClose={() => dispatch(userResetUpdateProfile())}
                        >
                          {" "}
                          <CheckCircle size={28} className="ml-3" />{" "}
                          {success.message}
                        </Alert>
                      </div>
                    )}
                    <UserProfilePicture
                      loadingProfile={userDetailsLoading}
                      image={userDetails.foto}
                      username={userDetails?.username}
                      dateJoin={userDetails?.tgl_dibuat}
                    />
                    <Form onSubmit={updateProfileFormik.handleSubmit}>
                      <InputGroupRow
                        labelClass="text-dark font-weight-bold "
                        input1={{
                          controlid: "nama",
                          placeholder: "Nama...",
                          value: updateProfileFormik.values.nama,
                          onChange: updateProfileFormik.handleChange,
                          isInvalid: updateProfileFormik.errors.nama
                            ? true
                            : false,
                          errormessage: updateProfileFormik.errors.nama,
                          label: "Nama",
                        }}
                        input2={{
                          controlid: "username",
                          placeholder: "Username..",
                          value: updateProfileFormik.values.username,
                          onChange: updateProfileFormik.handleChange,
                          isInvalid: spesificIsInvalid.username?.isInvalid,
                          errormessage: spesificIsInvalid.username?.message,
                          label: "Username",
                        }}
                      />

                      <InputGroupRow
                        labelClass="text-dark font-weight-bold "
                        input1={{
                          controlid: "email",
                          placeholder: "Alamat email...",
                          value: userDetails?.email || "",
                          readOnly: true,
                          label: "email",
                        }}
                        input2={{
                          controlid: "noHp",
                          placeholder: "Nomor telepon...",
                          value: updateProfileFormik.values.noHp,
                          onChange: updateProfileFormik.handleChange,
                          isInvalid: spesificIsInvalid.noHp?.isInvalid
                            ? true
                            : false,
                          errormessage: spesificIsInvalid.noHp?.message,
                          label: "No Telpon",
                        }}
                      />

                      <InputGroupRow
                        labelClass="text-dark font-weight-bold "
                        input1={{
                          controlid: "noKtp",
                          placeholder: "Nomor Ktp...",
                          value: updateProfileFormik.values.noKtp,
                          onChange: updateProfileFormik.handleChange,
                          isInvalid: updateProfileFormik.errors.noKtp
                            ? true
                            : false,
                          errormessage: updateProfileFormik.errors.noKtp,
                          label: "no ktp",
                        }}
                        input2={{
                          controlid: "tglLahir",
                          placeholder: "",
                          value: updateProfileFormik.values.tglLahir,
                          onChange: updateProfileFormik.handleChange,
                          isInvalid: updateProfileFormik.errors.tglLahir
                            ? true
                            : false,
                          errormessage: updateProfileFormik.errors.tglLahir,
                          type: "date",
                          label: "Tanggal Lahir",
                        }}
                      />
                      <Row>
                        <Col xs={12}>
                          <Form.Group controlId="alamat">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control
                              as="textarea"
                              className=" bg-transparent border "
                              onChange={updateProfileFormik.handleChange}
                              rows={3}
                              value={updateProfileFormik.values.alamat}
                              isInvalid={
                                updateProfileFormik.errors.alamat ? true : false
                              }
                            />
                            {updateProfileFormik.errors.alamat ? (
                              <Form.Control.Feedback type="invalid">
                                {updateProfileFormik.errors.alamat}
                              </Form.Control.Feedback>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={6}>
                          <Form.Group controlId="idProvinsi">
                            <Form.Label>Provinsi</Form.Label>
                            <Form.Control
                              className="bg-transparent border"
                              as="select"
                              onChange={handleChangeProvinsi}
                              onBlur={updateProfileFormik.handleBlur}
                              value={updateProfileFormik.values.idProvinsi}
                              isInvalid={
                                updateProfileFormik.errors.idProvinsi
                                  ? true
                                  : false
                              }
                            >
                              {listProvinsi.map(prov => {
                                return (
                                  <option key={prov.id} value={prov.id}>
                                    {prov.nama}
                                  </option>
                                );
                              })}
                            </Form.Control>
                            {updateProfileFormik.errors.idProvinsi ? (
                              <Form.Control.Feedback type="invalid">
                                {updateProfileFormik.errors.idProvinsi}
                              </Form.Control.Feedback>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group controlId="idKota">
                            <Form.Label>Kota</Form.Label>
                            <Form.Control
                              className="bg-transparent border"
                              as="select"
                              onChange={handleChangeKota}
                              value={updateProfileFormik.values.idKota}
                              isInvalid={
                                updateProfileFormik.errors.idKota ? true : false
                              }
                            >
                              {listKota.map(kota => {
                                return (
                                  <option key={kota.id} value={kota.id}>
                                    {kota.nama}
                                  </option>
                                );
                              })}
                            </Form.Control>
                            {updateProfileFormik.errors.idKota ? (
                              <Form.Control.Feedback type="invalid">
                                {updateProfileFormik.errors.idKota}
                              </Form.Control.Feedback>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={6}>
                          <Form.Group controlId="idKec">
                            <Form.Label>Kecamatan</Form.Label>
                            <Form.Control
                              className="bg-transparent border"
                              as="select"
                              onChange={handleChangeKecamatan}
                              value={updateProfileFormik.values.idKec}
                              isInvalid={
                                updateProfileFormik.errors.idKec ? true : false
                              }
                            >
                              {listKecamatan.map(kec => {
                                return (
                                  <option key={kec.id} value={kec.id}>
                                    {kec.nama}
                                  </option>
                                );
                              })}
                            </Form.Control>
                            {updateProfileFormik.errors.idKec ? (
                              <Form.Control.Feedback type="invalid">
                                {updateProfileFormik.errors.idKec}
                              </Form.Control.Feedback>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group controlId="idKelu">
                            <Form.Label>Kelurahan</Form.Label>
                            <Form.Control
                              className="bg-transparent border"
                              as="select"
                              onChange={updateProfileFormik.handleChange}
                              value={updateProfileFormik.values.idKelu}
                              isInvalid={
                                updateProfileFormik.errors.idKelu ? true : false
                              }
                            >
                              {listKelurahan.map(kelurahan => {
                                return kelurahan.id ===
                                  updateProfileFormik.values.idKelu ? (
                                  <option
                                    selected
                                    key={kelurahan.id}
                                    value={kelurahan.id}
                                  >
                                    {kelurahan.nama}
                                  </option>
                                ) : (
                                  <option
                                    key={kelurahan.id}
                                    value={kelurahan.id}
                                  >
                                    {kelurahan.nama}
                                  </option>
                                );
                              })}
                            </Form.Control>
                            {updateProfileFormik.errors.idKelu ? (
                              <Form.Control.Feedback type="invalid">
                                {updateProfileFormik.errors.idKelu}
                              </Form.Control.Feedback>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={6}>
                          <Form.Group controlId="kodePos">
                            <Form.Label>Kode Pos</Form.Label>
                            <Form.Control
                              className=" bg-transparent border "
                              onChange={updateProfileFormik.handleChange}
                              value={updateProfileFormik.values.kodePos}
                              isInvalid={
                                updateProfileFormik.errors.kodePos
                                  ? true
                                  : false
                              }
                            />
                            {updateProfileFormik.errors.kodePos ? (
                              <Form.Control.Feedback type="invalid">
                                {updateProfileFormik.errors.kodePos}
                              </Form.Control.Feedback>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group>
                        <Button
                          type="submit"
                          variant="primary"
                          className=" d-flex align-items-center "
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader size={11} className="text-light" />{" "}
                              <span className="ml-2">Manambah</span>
                            </>
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </Form.Group>
                    </Form>{" "}
                  </>
                )}
              </Card.Body>
            </Card>
            <section className="mt-5">
              <UserBankAccount
                accounts={userDetails?.akun_bank}
                onLoadProfile={handleLoadProfile}
                loadingProfile={loading}
              />
            </section>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Profile;
