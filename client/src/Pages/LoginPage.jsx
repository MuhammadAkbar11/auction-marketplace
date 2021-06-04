import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BreadcrumbContainer from "../Components/Layouts/BreadcrumbsContainer";
import Loader from "../Components/UI/Loader";
import { authLoginAction } from "../actions/auth.actions";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Masukan alamat E-mail anda")
    .email("E-mail tidak valid"),
  password: Yup.string().required("Masukan password anda"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.authUser);
  const { loading } = useSelector(state => state.authLogin);

  const loginFormik = useFormik({
    validationSchema: loginSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => {
      dispatch(authLoginAction(values));
      // history.push('/payment');
    },
  });

  React.useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

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
                <Link className="active" to="/masuk">
                  <h4>Masuk</h4>
                </Link>
                <Link to="/daftar">
                  <h4>Daftar</h4>
                </Link>
              </div>
            </Col>
            <Col sm={8} md={6} lg={6} className="mx-auto">
              <Card body className="px-md-4 py-3">
                <h5 className="text-black-50 font-weight-light text-center ">
                  login pengguna
                </h5>

                <Form onSubmit={loginFormik.handleSubmit} className="mt-1">
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Masukan email anda"
                      value={loginFormik.values.email}
                      onChange={loginFormik.handleChange}
                      className=" bg-transparent border "
                      isInvalid={loginFormik.errors.email}
                    />

                    <Form.Control.Feedback type="invalid">
                      {loginFormik.errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Masukan password anda"
                      value={loginFormik.values.password}
                      onChange={loginFormik.handleChange}
                      className=" bg-transparent border "
                      isInvalid={loginFormik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {loginFormik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className=" pt-2 d-flex justify-content-between align-items-center ">
                    <Button
                      type="submit"
                      variant="primary"
                      className=" d-flex align-items-center "
                      disabled={loading || !loginFormik.isValid}
                    >
                      {loading ? (
                        <>
                          <Loader size={11} />{" "}
                          <span className="ml-2"> Login</span>
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                    <Link to="/lupa-password">Lupa kata sandi?</Link>
                  </Form.Group>
                  <div className=" pt-2 text-spacing-0 font-weight-light text-capitalize ">
                    Belum menjadi member?{" "}
                    <Link to="/daftar">Daftar sekarang</Link>
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

export default LoginPage;
