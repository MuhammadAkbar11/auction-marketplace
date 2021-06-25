import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { WarningCircle } from "phosphor-react";
import { Link } from "react-router-dom";
import BreadcrumbContainer from "../Components/Layouts/BreadcrumbsContainer";
import InputGroupRow from "../Components/UI/InputGroupRow";
import Loader from "../Components/UI/Loader";
import {
  authRegisterAction,
  authResetErrorAction,
} from "../actions/auth.actions";

const registerSchema = Yup.object().shape({
  nama: Yup.string().required("Nama belum terisi"),
  username: Yup.string()
    .required("Username belum terisi ")
    .min(6, "Username harus lebih dari 6 karakter"),
  email: Yup.string()
    .required("Alamat E-mail belum terisi")
    .email("Alamat E-mail tidak valid"),
  noHp: Yup.number()
    .typeError("Yang diisi harus angka")
    .required("Nomor telepon belum terisi"),
  password: Yup.string().required("Password belum tersisi"),
  password2: Yup.string()
    .required("Ulangi password anda")
    .oneOf([Yup.ref("password"), null], "Password tidak sama"),
});

const RegisterPage = () => {
  let disableButton = false;

  const [agreeTermCond, setAgreeTermCond] = React.useState(false);

  const dispatch = useDispatch();

  const { loading, error } = useSelector(state => state.authRegister);

  const registerFormik = useFormik({
    validationSchema: registerSchema,
    validateOnChange: false,

    initialValues: {
      nama: "",
      username: "",
      email: "@gmail.com",
      noHp: "",
      password: "",
      password2: "",
    },
    onSubmit: values => {
      dispatch(authRegisterAction(values));

      // history.push('/payment');
    },
  });

  if (agreeTermCond) {
    disableButton = false;
  } else {
    disableButton = true;
  }

  const spesificIsInvalid = {
    username: {
      isInvalid: registerFormik.errors.username
        ? true
        : false || error?.validation?.username,
      message:
        registerFormik.errors.username ||
        error?.validation?.username?.message[0],
    },
    email: {
      isInvalid: registerFormik.errors.email
        ? true
        : false || error?.validation?.email,
      message:
        registerFormik.errors.email || error?.validation?.email?.message[0],
    },
  };

  return (
    <>
      <BreadcrumbContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Masuk", active: true },
        ]}
      />
      <section className="login-register-area pt-115 pb-120">
        <Container fluid className="px-md-8">
          <Row>
            <Col xs={12}>
              <div className="login-register-tab-list nav">
                <Link to="/akun/masuk">
                  <h4>Masuk</h4>
                </Link>
                <Link className="active" to="/akun/daftar">
                  <h4>Daftar</h4>
                </Link>
              </div>
            </Col>
            <Col sm={11} md={10} lg={7} className="mx-auto">
              {error && !error.validation && (
                <Alert
                  variant="danger"
                  onClose={() => dispatch(authResetErrorAction("login"))}
                  dismissible
                >
                  {" "}
                  <WarningCircle size={28} className="ml-3" /> {error.message}
                </Alert>
              )}
              <Card body className="px-md-4 py-3">
                <h5 className="text-black-50 font-weight-light text-center ">
                  registrasi pengguna
                </h5>
                <br />

                <Form onSubmit={registerFormik.handleSubmit}>
                  <InputGroupRow
                    input1={{
                      controlid: "nama",
                      placeholder: "",
                      value: registerFormik.values.nama,
                      onChange: registerFormik.handleChange,
                      isInvalid: registerFormik.errors.nama ? true : false,
                      errormessage: registerFormik.errors.nama,
                      label: "Nama*",
                    }}
                    input2={{
                      controlid: "username",
                      placeholder: "(min 6 karakter)",
                      value: registerFormik.values.username,
                      onChange: registerFormik.handleChange,
                      isInvalid: spesificIsInvalid.username?.isInvalid,
                      errormessage: spesificIsInvalid.username?.message,
                      label: "Username*",
                    }}
                  />
                  <InputGroupRow
                    input1={{
                      controlid: "email",
                      type: "email",
                      value: registerFormik.values.email,
                      onChange: registerFormik.handleChange,
                      isInvalid: spesificIsInvalid.email.isInvalid,
                      errormessage: spesificIsInvalid.email.message,
                      label: "Email*",
                    }}
                    input2={{
                      controlid: "noHp",
                      value: registerFormik.values.noHp,
                      onChange: registerFormik.handleChange,
                      isInvalid: registerFormik.errors.noHp ? true : false,
                      errormessage: registerFormik.errors.noHp,
                      placeholder: "(Hanya angka)",
                      label: "No Hp*",
                    }}
                  />
                  <InputGroupRow
                    input1={{
                      controlid: "password",
                      type: "password",
                      value: registerFormik.values.password,
                      onChange: registerFormik.handleChange,
                      isInvalid: registerFormik.errors.password ? true : false,
                      errormessage: registerFormik.errors.password,
                      placeholder: "(min 6 karakter)",
                      label: "password*",
                    }}
                    input2={{
                      controlid: "password2",
                      value: registerFormik.values.password2,
                      onChange: registerFormik.handleChange,
                      isInvalid: registerFormik.errors.password2 ? true : false,
                      errormessage: registerFormik.errors.password2,
                      type: "password",
                      label: "Konfirmasi password*",
                    }}
                  />
                  <Form.Group controlId="term" className="pt-2 d-flex">
                    <Form.Check
                      type="checkbox"
                      label="Telah menyetujui syarat dan ketentuan"
                      onChange={() =>
                        setAgreeTermCond(prevState =>
                          !prevState ? true : false
                        )
                      }
                    />
                    <Link to="syarat-ketentuan" className="ml-1">
                      Syarat dan ketentuan
                    </Link>
                  </Form.Group>
                  <Form.Group className=" pt-2 d-flex justify-content-between align-items-center ">
                    <Button
                      type="submit"
                      variant="primary"
                      className=" d-flex align-items-center "
                      disabled={disableButton}
                    >
                      {loading ? (
                        <>
                          <Loader variant="light" size={11} />{" "}
                          <span className="ml-2"> Daftar</span>
                        </>
                      ) : (
                        "Daftar"
                      )}
                    </Button>
                  </Form.Group>
                  <div className=" pt-2 text-spacing-0 font-weight-light text-capitalize ">
                    Sudah menjadi member? <Link to="/akun/masuk">Masuk</Link>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default RegisterPage;
