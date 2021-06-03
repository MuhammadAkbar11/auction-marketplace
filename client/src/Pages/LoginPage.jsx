import React from "react";

import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import BreadcrumbContainer from "../Components/Layouts/BreadcrumbsContainer";
import Loader from "../Components/UI/Loader";

const LoginPage = () => {
  const [disabledSubmit, setDisabledSubmit] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const submitHandler = e => {
    e.preventDefault();
    // alert("confirm");
    setLoading(true);
    setDisabledSubmit(true);

    setTimeout(() => {
      setDisabledSubmit(false);
      setLoading(false);
    }, 5000);
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
              <div class="login-register-tab-list nav">
                <Link class="active" to="/masuk">
                  <h4>Masuk</h4>
                </Link>
                <Link to="/daftar">
                  <h4>Daftar</h4>
                </Link>
              </div>
            </Col>
            <Col lg={6} className="mx-auto">
              <Card body className="px-md-4 py-3">
                <h5 className="text-black-50 font-weight-light text-center ">
                  login pengguna
                </h5>

                <Form onSubmit={submitHandler} className="mt-1">
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Masukan email anda"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        setDisabledSubmit(false);
                      }}
                      className=" bg-transparent border "
                      // isInvalid={!!error?.validation?.email}
                    />

                    {/* {error?.validation?.email ? (
                      <Form.Control.Feedback type="invalid">
                        {error.validation.email.message[0]}
                      </Form.Control.Feedback>
                    ) : null} */}
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Kata Sandi</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Masukan password anda"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                        setDisabledSubmit(false);
                      }}
                      className=" bg-transparent border "
                      // isInvalid={!!error?.validation?.password}
                    />
                    {/* {error?.validation?.password ? (
                      <Form.Control.Feedback type="invalid">
                        {error.validation.password.message[0]}
                      </Form.Control.Feedback>
                    ) : null} */}
                  </Form.Group>
                  <Form.Group className=" pt-2 d-flex justify-content-between align-items-center ">
                    <Button
                      type="submit"
                      variant="primary"
                      className=" d-flex align-items-center "
                      disabled={disabledSubmit}
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
