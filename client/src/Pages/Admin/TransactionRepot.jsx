import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  Card,
  Row,
  Col,
  Breadcrumb,
  Table,
  Button,
  Dropdown,
  Form,
} from "react-bootstrap";
import { Trash, Info, SquaresFour } from "phosphor-react";
// import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../Components/AdmnLayouts/AdminLayout";
import transactionReports from "../../data/transactionReports";
// import { getCategoriesAction } from "../../actions/categories.actions";

const TransactionRepot = () => {
  // const dispatch = useDispatch();

  const reports = transactionReports;

  const members = [];

  // React.useEffect(() => {
  //   dispatch(getCategoriesAction());
  // }, []);
  let no = 1;
  return (
    <AdminLayout>
      <Container fluid className=" ">
        <h3 className="text-dark  font-weight-normal ">
          Laporan Transaksi Lelang
        </h3>
        <Breadcrumb className="bg-white admin-breadcrumb shadow-sm">
          <LinkContainer to="/administrator/dashboard">
            <Breadcrumb.Item className="bg-white">Dashboard</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>Laporan Transaksi Lelang</Breadcrumb.Item>
        </Breadcrumb>
        <Row noGutters className="pt-4 w-100">
          <Col sm={12} md={12}>
            <Card className="pt-2  bg-white border-0 shadow-sm  ">
              {/* <Card.Header className="bg-transparent">
                <Row>
                  <Col sm={3}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Example select</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Header> */}
              <Card.Body>
                <Table hover responsive size="sm">
                  <thead className=" text-nowrap ">
                    <tr>
                      <th>#</th>
                      <th>Waktu</th>
                      <th>Invoice</th>
                      <th>Pelanggan</th>
                      <th>Pembuat</th>
                      <th>Judul</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Menu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.length !== 0 ? (
                      reports.map(rp => {
                        return (
                          <tr key={rp?.invoice}>
                            <td>{no++}</td>
                            <td>{rp?.date}</td>
                            <td>{rp?.invoice}</td>
                            <td>{rp?.costumer}</td>
                            <td>{rp?.authors}</td>
                            <td>{rp?.title}</td>
                            <td>{rp?.status}</td>
                            <td>{rp?.total}</td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  size="sm"
                                  variant="primary"
                                  id="users-actions"
                                  className="toggle-caret-0"
                                >
                                  <SquaresFour size={20} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="py-0 border-0 shadow-sm">
                                  <Dropdown.Item
                                    as="button"
                                    className=" py-2 text-capitalize"
                                  >
                                    <Trash weight="fill" size={20} />
                                    <span className="ml-2">Hapus</span>
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    as="button"
                                    className=" py-2 text-capitalize"
                                  >
                                    <Info weight="fill" size={20} />
                                    <span className="ml-2">Detail</span>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        {" "}
                        <td colSpan={6}>Null</td>
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

export default TransactionRepot;
