import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import Layout from "../../Components/Layouts/Layout";
import { convertYupErrorsToObject } from "../../utils/checkObj";
import { useDispatch } from "react-redux";
import { userChangePasswordAction } from "../../actions/user.actions";

const schema = Yup.object().shape({
  currPassword: Yup.string().required("Password saat ini belum di isi"),
  newPassword: Yup.string().required("Password baru belum tersisi"),
  newPassword2: Yup.string()
    .required("Ulangi password baru anda")
    .oneOf([Yup.ref("newPassword"), null], "Password tidak sama"),
});

const UserChangPassword = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [forms, setForms] = React.useState({
    values: {
      currPassword: "",
      newPassword: "",
      newPassword2: "",
    },
    errors: null,
  });
  const [alert, setAlert] = React.useState(null);

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setForms(prevState => {
      return {
        values: {
          ...prevState.values,
          [name]: value,
        },
        errors: null,
      };
    });
  };

  const resetForms = () => {
    setForms({
      values: {
        currPassword: "",
        newPassword: "",
        newPassword2: "",
      },
      errors: null,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const values = await schema.validateSync(
        { ...forms.values },
        { abortEarly: false }
      );

      await dispatch(userChangePasswordAction(values));
      setAlert({
        type: "success",
        message: "Password berhasil diubah",
      });
      resetForms();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.inner) {
        const errors = convertYupErrorsToObject(err.inner);

        setForms(prevState => {
          return {
            values: prevState.values,
            errors: errors,
          };
        });
        return;
      }

      setAlert({
        type: "danger",
        message: err?.message || "Gagal mengubah password",
      });

      console.log(err);
    }
  };

  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Profle", url: "/akun/info" },
          { title: "Ubah Password", active: true },
        ]}
      />
      <Container fluid className="px-md-8 py-4">
        <Row>
          <Col md={3}>
            <UserSidebarMenu />
          </Col>
          <Col md={9}>
            <div className="pb-3">
              <Link to={"/akun/info"} className="btn btn-light">
                Kembali
              </Link>
            </div>

            {alert && (
              <div className="mb-3">
                <Alert
                  variant={alert?.type}
                  onClose={() => setAlert(null)}
                  dismissible
                >
                  <p>{alert?.message}</p>
                </Alert>
              </div>
            )}

            <Card>
              <Card.Header className="bg-transparent ">
                <Card.Title className="my-auto text-uppercase ">
                  Ubah Password
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={8} lg={6}>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="">
                        <Form.Label>Password Saat Ini</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password saat ini"
                          name="currPassword"
                          className="bg-transparent border"
                          value={forms.values.currPassword}
                          onChange={handleChange}
                          isInvalid={!!forms.errors?.currPassword}
                        />

                        <Form.Control.Feedback type="invalid">
                          {forms.errors?.currPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="">
                        <Form.Label>Password Baru</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password saat ini"
                          name="newPassword"
                          className="bg-transparent border"
                          value={forms.values.newPassword}
                          onChange={handleChange}
                          isInvalid={!!forms.errors?.newPassword}
                        />

                        <Form.Control.Feedback type="invalid">
                          {forms.errors?.newPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="">
                        <Form.Label>Ulangi Password Baru</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password saat ini"
                          name="newPassword2"
                          className="bg-transparent border"
                          value={forms.values.newPassword2}
                          onChange={handleChange}
                          isInvalid={!!forms.errors?.newPassword2}
                        />

                        <Form.Control.Feedback type="invalid">
                          {forms.errors?.newPassword2}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="">
                        <Button
                          type="submit"
                          disabled={loading}
                          variant="outline-primary"
                        >
                          Ubah password
                        </Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default UserChangPassword;
