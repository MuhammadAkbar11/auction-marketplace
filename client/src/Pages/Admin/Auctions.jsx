import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../Components/AdmnLayouts/AdminLayout";
import {
  Container,
  Card,
  Row,
  Col,
  Breadcrumb,
  Table,
  Alert,
  Badge,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Info, Timer } from "phosphor-react";
import { Link } from "react-router-dom";
import { adminGetListAuctionsAction } from "../../actions/admin/auctions.actions";
import Loader from "../../Components/UI/Loader";

const AdminAuctions = () => {
  const dispatch = useDispatch();

  const fullStore = useSelector(state => state);

  console.log(fullStore);
  const { auctions, loading } = useSelector(state => state.adminListAuction);

  React.useEffect(() => {
    dispatch(adminGetListAuctionsAction());
  }, [dispatch]);

  return (
    <AdminLayout>
      <Container fluid>
        <h3 className="text-dark  font-weight-normal ">Anggota</h3>
        <Row>
          <Col xs={12}>
            <Breadcrumb className="bg-white admin-breadcrumb shadow-sm">
              <LinkContainer to="/administrator/dashboard">
                <Breadcrumb.Item className="bg-white">
                  Dashboard
                </Breadcrumb.Item>
              </LinkContainer>
              <Breadcrumb.Item active>Lelang</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col xs={12}>
            <Card className="pt-2  bg-white border-0 shadow-sm d-flex position-relative ">
              <Card.Body>
                <Table
                  responsive
                  style={{
                    overflowX: "scroll",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Judul Lelang</th>
                      <th>Penjual</th>
                      <th>Waktu</th>
                      <th>Total Bids</th>
                      <th>Penawaran tertinggi</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="text-center">
                          <Loader size={20} />
                        </td>
                      </tr>
                    ) : auctions?.length === 0 ? (
                      <tr>
                        <td colSpan={7}>
                          <Alert variant="info" className="text-center">
                            <Info size={24} /> Belum ada lelang untuk saat ini.
                          </Alert>
                        </td>
                      </tr>
                    ) : (
                      auctions.map(ac => {
                        let status = (
                          <Badge
                            variant="primary"
                            className=" font-weight-light px-3 py-1 "
                          >
                            Aktif
                          </Badge>
                        );

                        if (ac.status_lelang >= 2) {
                          status = (
                            <Badge
                              variant="danger"
                              className=" font-weight-light px-3 py-1 "
                            >
                              Berakhir
                            </Badge>
                          );
                        }

                        return (
                          <tr key={ac.id_lelang}>
                            <td className="text-nowrap">
                              <Link to={`/item/${ac.id_lelang}`}>
                                {ac.judul}
                              </Link>
                            </td>
                            <td className="text-nowrap">
                              {ac.penjual?.username}
                            </td>
                            <td>
                              {" "}
                              <div className="d-flex flex-nowrap flex-column">
                                <div className="text-nowrap">
                                  <Timer
                                    weight="duotone"
                                    size={23}
                                    className="text-success"
                                  />{" "}
                                  {ac?.tgl_mulai}
                                </div>
                                <div className="text-nowrap mt-2">
                                  <Timer
                                    weight="duotone"
                                    size={23}
                                    className="text-danger"
                                  />{" "}
                                  {ac?.tgl_selesai}
                                </div>
                              </div>
                            </td>
                            <td className="text-success text-nowrap">
                              {ac?.tawaran.length} Tawaran
                            </td>
                            <td className="  font-weight-normal text-black-50 ">
                              {ac?.tawaran.length !== 0 ? (
                                <>
                                  <span className="text-primary">
                                    Rp. {ac?.tawaran[0].nilai_tawaran}
                                  </span>{" "}
                                  <br />
                                  (By {ac?.tawaran[0]?.member?.username})
                                </>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>{status}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="w-100"></div>
      </Container>
    </AdminLayout>
  );
};

export default AdminAuctions;
