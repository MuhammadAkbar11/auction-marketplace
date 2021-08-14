import React from "react";
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
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../Components/AdmnLayouts/AdminLayout";
import { getCategoriesAction } from "../../actions/categories.actions";

const AdminKategori = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);

  const [categoryInput, setCategoryInput] = React.useState("");
  const [categoryError, setCategoryError] = React.useState(null);

  React.useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
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
          <Col sm={6} md={4}>
            <Card body className="bg-white border-0 shadow-sm py-3">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="category">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kategori"
                    name="category"
                    value={categoryInput}
                    onChange={e => setCategoryInput(e.target.value)}
                    isInvalid={!!categoryError}
                  />

                  <Form.Control.Feedback type="invalid" tooltip>
                    {categoryError}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button>Tambah Kategori</Button>
              </Form>
            </Card>
          </Col>
          <Col sm={6} md={8}>
            <Card className="pt-2  bg-white border-0 shadow-sm   ">
              <Card.Body className="d-flex ">
                <Table hover responsive size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Kategori</th>
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
                            <td>
                              <Button variant="blue" size="sm">
                                Ubah
                              </Button>
                            </td>
                            <td>
                              <Button variant="danger" size="sm">
                                Hapus
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        {" "}
                        <td colSpan={4}>Null</td>
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
