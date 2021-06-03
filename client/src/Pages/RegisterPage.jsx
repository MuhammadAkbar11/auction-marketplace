import React from "react";

import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import BreadcrumbContainer from "../Components/Layouts/BreadcrumbsContainer";
import InputGroupRow from "../Components/UI/InputGroupRow";
import Loader from "../Components/UI/Loader";

const RegisterPage = () => {
  const [disabledSubmit, setDisabledSubmit] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const submitHandler = e => {
    e.preventDefault();
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
                <Link to="/masuk">
                  <h4>Masuk</h4>
                </Link>
                <Link class="active" to="/daftar">
                  <h4>Daftar</h4>
                </Link>
              </div>
            </Col>
            <Col md={7} lg={7} className="mx-auto">
              <Card body className="px-md-4 py-3">
                <h5 className="text-black-50 font-weight-light text-center ">
                  registrasi pengguna
                </h5>
                <br />
                <Form onSubmit={submitHandler}>
                  <InputGroupRow
                    input1={{
                      controlId: "nama",
                      placeholder: "",
                      value: "",
                      label: "Nama*",
                    }}
                    input2={{
                      controlId: "username",
                      placeholder: "(min 6 karakter)",
                      value: "",
                      label: "Username*",
                    }}
                  />
                  <InputGroupRow
                    input1={{
                      controlId: "email",
                      type: "email",
                      value: "",
                      label: "Email*",
                    }}
                    input2={{
                      controlId: "notelp",
                      value: "",
                      label: "No Hp*",
                    }}
                  />
                  <InputGroupRow
                    input1={{
                      controlId: "password",
                      type: "password",
                      value: "",
                      placeholder: "(min 6 karakter)",
                      label: "password*",
                    }}
                    input2={{
                      controlId: "password2",
                      value: "",
                      type: "password",
                      value: "",
                      label: "Konfirmasi password*",
                    }}
                  />
                  <Form.Group controlId="term" className="pt-2 d-flex">
                    <Form.Check
                      type="checkbox"
                      label="Telah menyetujui syarat dan ketentuan"
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
                      disabled={disabledSubmit}
                    >
                      {loading ? (
                        <>
                          <Loader size={11} />{" "}
                          <span className="ml-2"> Daftar</span>
                        </>
                      ) : (
                        "Daftar"
                      )}
                    </Button>
                  </Form.Group>
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
