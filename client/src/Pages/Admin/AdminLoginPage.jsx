import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { WarningCircle } from "phosphor-react";
import {
  Card,
  Col,
  Container,
  Row,
  Alert,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../Components/UI/Loader";
import {
  authAdminLoginAction,
  authAdminResetErrorAction,
} from "../../actions/admin/auth.actions";

const loginSchema = Yup.object().shape({
  idAdmin: Yup.string().required("Masukan alamat ID anda"),
  password: Yup.string().required("Masukan password anda"),
});

const AdminLoginPage = ({ history }) => {
  const dispatch = useDispatch();
  const { adminInfo } = useSelector(state => state.adminAuth);
  const { loading, error } = useSelector(state => state.adminLogin);

  React.useEffect(() => {
    if (adminInfo) {
      history.push("/administrator/dashboard");
    }
  }, [adminInfo, history]);

  const loginFormik = useFormik({
    validationSchema: loginSchema,
    validateOnChange: false,
    initialValues: {
      idAdmin: "",
      password: "",
    },
    onSubmit: values => {
      // dispatch(authLoginAction(values));
      dispatch(authAdminLoginAction(values));
      // history.push('/payment');
    },
  });

  const closeAlert = e => {
    dispatch(authAdminResetErrorAction());
  };

  return (
    <div className="login-wrapper">
      <Container fluid className="px-md-8 h-100 ">
        <Row className="h-100 ">
          <Col sm={11} md={12} lg={8} className="mx-auto my-auto">
            {error && !error.validation && (
              <div>
                <Alert variant="danger" onClose={closeAlert} dismissible>
                  {" "}
                  <WarningCircle size={28} className="ml-3" /> {error.message}
                </Alert>
              </div>
            )}
            <div className=" d-md-none">
              <h3>Welcome to</h3>
              <p>BaeBid Administrator</p>
            </div>
            <Card>
              <Row>
                <Col md={6}>
                  <Card.Body className="px-md-4 py-5">
                    <Card.Title as="h5">Login</Card.Title>
                    <Form onSubmit={loginFormik.handleSubmit} className="mt-1">
                      <Form.Group controlId="idAdmin">
                        <Form.Label>ID Admin</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Masukan ID anda"
                          value={loginFormik.values.idAdmin}
                          onChange={loginFormik.handleChange}
                          className=" bg-transparent border "
                          isInvalid={loginFormik.errors.idAdmin}
                        />

                        <Form.Control.Feedback type="invalid">
                          {loginFormik.errors.idAdmin}
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
                      <Form.Group className=" pt-2 d-flex justify-content-start justify-content-md-between align-items-start align-items-md-center flex-column flex-md-row ">
                        <Button
                          type="submit"
                          variant="primary"
                          className=" d-flex align-items-center mb-2 mb-md-0  "
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader variant="light" size={11} />{" "}
                              <span className="ml-2"> Login</span>
                            </>
                          ) : (
                            "Login"
                          )}
                        </Button>
                        <Link to="/admin/lupa-password">Lupa kata sandi?</Link>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Col>
                <Col
                  md={6}
                  className="bg-primary d-none d-md-flex justify-content-center "
                >
                  <div className=" h-100 d-flex text-light flex-column justify-content-center align-items-center">
                    <Card.Title as="h3">Welcome to</Card.Title>
                    <p>BaeBid Administrator</p>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLoginPage;
