import React from "react";
import * as yup from "yup";
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  Card,
  Row,
  Col,
  Breadcrumb,
  Form,
  Table,
  Button,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../Components/AdmnLayouts/AdminLayout";
import {
  adminCategoryResetAlertAction,
  adminDeleteCategoryAction,
  adminGetCategoriesAction,
  adminPostCategoryAction,
} from "../../actions/admin/categories.actions";
import { convertYupErrorsToObject } from "../../utils/checkObj";

const schema = yup.object().shape({
  category: yup.string().required("Kategori belum terisi"),
  slug: yup.string().required("slug belum terisi"),
});

const AdminKategori = () => {
  const dispatch = useDispatch();
  const { loading, categories, alert, error } = useSelector(
    state => state.adminCategories
  );

  const [loadingAction, setLoadingAction] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [categoryIdInput, setCategoryIdInput] = React.useState("");
  const [categoryInput, setCategoryInput] = React.useState("");
  const [slugInput, setSlugInput] = React.useState("");
  const [categoryFormErrors, setCategoryFormErrors] = React.useState(null);

  React.useEffect(() => {
    dispatch(adminGetCategoriesAction());

    return () => {
      if (alert) {
        dispatch(adminCategoryResetAlertAction());
      }
    };
  }, [alert, dispatch]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoadingAction(true);
    try {
      const values = await schema.validateSync(
        {
          category: categoryInput,
          slug: slugInput,
        },
        { abortEarly: false }
      );
      const postData = {
        ...values,
        id_kategori: categoryIdInput,
      };
      await dispatch(adminPostCategoryAction(postData, isEdit));
      dispatch(adminGetCategoriesAction());
      setIsEdit(false);
      setCategoryIdInput("");
      setCategoryInput("");
      setSlugInput("");
      setLoadingAction(false);
      setCategoryFormErrors(null);
    } catch (error) {
      // console.lo;
      const errMsg = convertYupErrorsToObject(error.inner);
      setLoadingAction(false);
      setCategoryFormErrors(errMsg);
    }
  };

  const handleDelete = id => {
    setLoadingAction(true);
    dispatch(adminDeleteCategoryAction(id)).then(() => {
      setLoadingAction(false);
      dispatch(adminGetCategoriesAction());
    });
  };

  let no = 1;
  return (
    <AdminLayout>
      <Container fluid>
        <h3 className="text-dark  font-weight-normal ">Kategori</h3>
        <Breadcrumb className="bg-white admin-breadcrumb shadow-sm">
          <LinkContainer to="/administrator/dashboard">
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </LinkContainer>

          <Breadcrumb.Item active>Kategori</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="pt-4">
          <Col sm={12}>
            {alert?.show && (
              <Alert
                variant={alert?.type}
                onClose={() => dispatch(adminCategoryResetAlertAction())}
                dismissible
              >
                <p>{alert.message}</p>
              </Alert>
            )}
          </Col>
          <Col sm={6} md={6} lg={4} className="mb-3">
            <Card body className="bg-white border-0 shadow-sm py-3">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="category">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kategori"
                    name="category"
                    value={categoryInput}
                    onChange={e => {
                      const value = e.target.value;
                      const slugValues = value
                        .split(" ")
                        .join("-")
                        .toLowerCase();
                      setCategoryInput(value);

                      setSlugInput(slugValues);
                    }}
                    isInvalid={!!categoryFormErrors?.category}
                  />

                  <Form.Control.Feedback type="invalid">
                    {categoryFormErrors?.category}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="slug">
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Slug"
                    name="category"
                    value={slugInput}
                    onChange={e => setSlugInput(e.target.value)}
                    isInvalid={!!categoryFormErrors?.slug}
                  />

                  <Form.Control.Feedback type="invalid">
                    {categoryFormErrors?.slug}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={loadingAction}>
                  {!isEdit ? "Tambah Kategori" : "Ubah Kategori"}
                </Button>
              </Form>
            </Card>
          </Col>
          <Col sm={6} md={12} lg={8}>
            <Card className="pt-2  bg-white border-0 shadow-sm   ">
              <Card.Body className="d-flex ">
                <Table hover responsive size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Kategori</th>
                      <th>Slug</th>
                      <th>Ubah</th>
                      <th>Hapus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length !== 0 ? (
                      categories.map(item => {
                        return (
                          <tr key={item.id_kategori}>
                            <td>{no++}</td>
                            <td>{item.kategori}</td>
                            <td>{item.slug}</td>
                            <td>
                              <Button
                                variant="blue"
                                onClick={e => {
                                  setIsEdit(true);
                                  setCategoryIdInput(item.id_kategori);
                                  setCategoryInput(item.kategori);
                                  setSlugInput(item.slug);
                                }}
                                size="sm"
                                disabled={loadingAction}
                              >
                                Ubah
                              </Button>
                            </td>
                            <td>
                              <Button
                                disabled={loadingAction}
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  handleDelete(item.id_kategori);
                                }}
                              >
                                Hapus
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : loading ? (
                      <tr>
                        <td colSpan={5} className="text-center">
                          Tunggu sebentar...
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
                          {error ? (
                            <Alert variant="danger">
                              <p>{error.message}</p>
                            </Alert>
                          ) : (
                            <Alert variant="info">
                              <p>Belum ada ketegori yang dibuat</p>
                            </Alert>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default AdminKategori;
