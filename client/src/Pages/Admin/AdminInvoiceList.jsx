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
  Alert,
  Badge,
  Modal,
} from "react-bootstrap";
import { Trash, Info, SquaresFour } from "phosphor-react";
import AdminLayout from "../../Components/AdmnLayouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { adminGetInvoicesAction } from "../../actions/admin/invoices.actions";
import Loader from "../../Components/UI/Loader";
import { Link } from "react-router-dom";
import convertRupiah from "../../utils/convertRupiah";

const AdminInvoiceList = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = React.useState(false);
  const { invoices, loading, error } = useSelector(
    state => state.adminInvoices
  );

  React.useEffect(() => {
    dispatch(adminGetInvoicesAction());
  }, []);
  let no = 1;

  return (
    <>
      <AdminLayout>
        <Container fluid className=" ">
          <h3 className="text-dark  font-weight-normal ">Laporan Transaksi</h3>
          <Breadcrumb className="bg-white admin-breadcrumb shadow-sm">
            <LinkContainer to="/administrator/dashboard">
              <Breadcrumb.Item className="bg-white">Dashboard</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>Laporan Transaksi </Breadcrumb.Item>
          </Breadcrumb>
          <Row noGutters className="pt-4 w-100">
            <Col sm={12} md={12}>
              <Card className="pt-2  bg-white border-0 shadow-sm  ">
                <Card.Body>
                  <Table hover responsive size="sm">
                    <thead className=" text-nowrap ">
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Invoice</th>
                        <th>Tgl dibuat</th>
                        <th>Pelaku Lelang</th>
                        <th>Lelang</th>
                        <th>Total</th>
                        <th>Menu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={8}>
                            <Loader size={20} />
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan={8}>
                            <Alert variant="danger" className="text-center">
                              Gagal mengambil data!
                            </Alert>
                          </td>
                        </tr>
                      ) : invoices?.length !== 0 ? (
                        invoices?.map(inv => {
                          let statusContent = (
                            <Badge
                              variant="info"
                              className=" font-weight-light px-3 py-1 "
                            >
                              Baru
                            </Badge>
                          );
                          const status = +inv.status;

                          if (status === 1) {
                            statusContent = (
                              <Badge
                                variant="warning"
                                className=" font-weight-light px-3 py-1 "
                              >
                                Sedang proses
                              </Badge>
                            );
                          }

                          if (status >= 2) {
                            statusContent = (
                              <Badge
                                variant="success"
                                className=" font-weight-light px-3 py-1 "
                              >
                                Selesai
                              </Badge>
                            );
                          }

                          if (status)
                            return (
                              <tr key={inv?.id_detail_transaksi}>
                                <td>{no++}</td>
                                <td>{statusContent}</td>
                                <td>{inv?.id_detail_transaksi}</td>
                                <td>{inv?.tgl_dibuat}</td>
                                <td>
                                  <div>
                                    <div className="text-capitalize ">
                                      <h6 className="text-dark font-weight-bold text-nowrap">
                                        Seller :
                                      </h6>
                                      <small>{inv?.lelang?.seller?.nama}</small>{" "}
                                      <br />
                                      <small>
                                        {inv?.lelang?.seller?.email}
                                      </small>
                                    </div>
                                    <div className="text-capitalize mt-2 ">
                                      <h6 className="text-dark font-weight-bold">
                                        Bidder :
                                      </h6>{" "}
                                      <small>
                                        {inv?.tawaran?.member?.nama}
                                      </small>{" "}
                                      <br />
                                      <small>
                                        {inv?.tawaran?.member?.email}
                                      </small>
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <Link to={`/item/${inv?.lelang?.id_lelang}`}>
                                    {inv?.lelang?.judul}
                                  </Link>
                                  <br />
                                  <small className="text-success">
                                    Rp{" "}
                                    {convertRupiah(
                                      +inv?.tawaran?.nilai_tawaran
                                    )}
                                  </small>
                                </td>

                                <td>
                                  Rp.{" "}
                                  {convertRupiah(+inv?.transaksi?.total_harga)}
                                </td>
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
                                        onClick={e => setModal(true)}
                                      >
                                        <Trash weight="fill" size={20} />
                                        <span className="ml-2">Hapus</span>
                                      </Dropdown.Item>
                                      <Dropdown.Item
                                        as="button"
                                        className=" py-2 text-capitalize"
                                        onClick={e => setModal(true)}
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
                          <td colSpan={6}>
                            <Alert variant="info" className="text-center">
                              Belum ada laporan{" "}
                            </Alert>
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
      <Modal show={modal} centered onHide={() => setModal(false)}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="d-none border-0">Informasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="py-3 text-center">
            <h2 className=" font-weight-bold text-primary ">Comming Soon</h2>
            <p>Fitur ini akan segera dibuat!</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 text-center">
          <Button
            variant="outline-primary"
            className="mx-auto"
            onClick={() => setModal(false)}
          >
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminInvoiceList;
