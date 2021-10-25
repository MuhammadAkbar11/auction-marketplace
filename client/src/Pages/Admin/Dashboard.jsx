import React from "react";
import AdminLayout from "../../Components/AdmnLayouts/AdminLayout";
import { Users, Hand, Handshake, Calendar, Timer } from "phosphor-react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { IdentificationCard } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import WidgetCard from "../../Components/UI/WidgetCard";
import month from "../../data/month";
import { adminGetDashboardDataAction } from "../../actions/admin/dashboard.actions";
import Loader from "../../Components/UI/Loader";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const date = new Date();
  const indoMonths = month;

  const dispatch = useDispatch();

  const { adminInfo } = useSelector(state => state.adminAuth);
  const { loading, members, auctions, invoices } = useSelector(
    state => state.adminDashboardData
  );

  const latestAuctions = auctions?.latest?.auctions;

  React.useEffect(() => {
    dispatch(adminGetDashboardDataAction());
  }, []);

  console.log(members);
  let no = 1;
  return (
    <AdminLayout>
      <Container fluid className="">
        <div className="d-flex flex-column flex-md-row align-items-center  justify-content-between">
          <h4 className="text-dark text-spacing-1 text-capitalize font-weight-light ">
            <span className="text-black"> Hi,{adminInfo?.username}</span>{" "}
            Selamat Datang
          </h4>
          <Card
            className="border-0 bg-white shadow-sm  "
            style={{
              height: "max-content",
            }}
          >
            <Card.Body className="px-2 py-1 d-flex align-items-center">
              <Calendar size={20} />
              <p className="my-0 ml-2">
                {" "}
                {date.getDate()} {indoMonths[date.getMonth() + 1]}{" "}
                {date.getFullYear()}
              </p>
            </Card.Body>
          </Card>
        </div>
        <Row className="pt-6">
          <Col md={4} className=" mt-5 mt-md-0">
            <WidgetCard
              variant="yellow"
              icon={<Users size={45} />}
              caption="Anggota"
              value={members?.length || 0}
            />
          </Col>
          <Col md={4} className=" mt-5 mt-md-0">
            <WidgetCard
              variant="teal"
              icon={<Hand size={45} />}
              caption="Lelang"
              value={auctions?.all?.count || "0"}
            />
          </Col>
          <Col md={4} className=" mt-5 mt-md-0">
            <WidgetCard
              icon={<Handshake size={45} />}
              caption="Transaksi"
              value={invoices?.count || "0"}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6} lg={7}>
            <Card className="pt-2 bg-white border-0 shadow-sm  ">
              <Card.Header className="bg-transparent border-0">
                <Card.Title>Lelang terbaru</Card.Title>
              </Card.Header>
              <Card.Body className="d-flex ">
                <Table hover responsive size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Judul</th>
                      <th>Penjual</th>
                      <th>Waktu</th>
                      <th>Kategori</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td>
                          <Loader size={25} />
                        </td>
                      </tr>
                    ) : latestAuctions?.length !== 0 ? (
                      latestAuctions?.map(item => {
                        return (
                          <tr key={item?.id_lelang}>
                            <td>{no++}</td>
                            <td className="text-nowrap">
                              {" "}
                              <Link to={`/item/${item?.id_lelang}`}>
                                {item?.judul}
                              </Link>{" "}
                            </td>
                            <td className="text-dark">
                              {item?.penjual?.username || "-"} <br />{" "}
                              <span className=" font-italic text-info ">
                                {" "}
                                {item?.penjual?.email || "-"}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex flex-nowrap flex-column">
                                <div className="text-nowrap">
                                  <Timer
                                    weight="duotone"
                                    size={20}
                                    className="text-success"
                                  />{" "}
                                  {item?.tgl_mulai}
                                </div>
                                <div className="text-nowrap mt-2">
                                  <Timer
                                    weight="duotone"
                                    size={20}
                                    className="text-danger"
                                  />{" "}
                                  {item?.tgl_selesai}
                                </div>
                              </div>
                            </td>
                            <td>{item?.kategori?.kategori}</td>
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
          <Col md={6} lg={5}>
            <Card className="pt-2 bg-white border-0 shadow-sm  ">
              <Card.Header className="bg-transparent border-0">
                <Card.Title> Member baru</Card.Title>
              </Card.Header>
              <Card.Body className="d-flex ">
                <Table hover responsive size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6}>
                          {" "}
                          <Loader size={20} />{" "}
                        </td>
                      </tr>
                    ) : (
                      <>
                        {members?.length !== 0 ? (
                          members
                            ?.splice(0, 5)
                            .reverse()
                            .map(mbr => {
                              return (
                                <tr key={mbr?.id_member}>
                                  <td>{no++}</td>
                                  <td>{mbr?.username}</td>
                                  <td>{mbr?.email}</td>
                                  <td>
                                    <Button variant="primary" size="sm">
                                      <IdentificationCard size={20} />
                                    </Button>
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
                      </>
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

export default Dashboard;
