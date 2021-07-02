import React from "react";
import AdminLayout from "../../Components/AdmnLayouts/AdminLayout";
import { Users, Hand, Handshake } from "phosphor-react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { IdentificationCard } from "phosphor-react";
import { useSelector } from "react-redux";
import WidgetCard from "../../Components/UI/WidgetCard";
const Dashboard = () => {
  const { adminInfo } = useSelector(state => state.adminAuth);

  const members = [];

  for (let i = 1; i < 5; i++) {
    members.push({
      id_member: "MBR00" + i,
      nama: "unit00" + i,
      username: "im.unit" + i,
      email: `unit00${i}@gmail.com`,
    });
  }

  const latestAuctions = [
    {
      id: 1,
      title: "Meja Makan Minimalis",
      by: "dubu03",
      end: "03/07/2021",
      category: "Perlengkapan Rumah",
    },
    {
      id: 2,
      title: "Baju Putih",
      by: "dubu01",
      end: "03/05/2021",
      category: "Pakaian & Aksesoris",
    },
    {
      id: 3,
      title: "Gaming Mouse",
      by: "dubu04",
      end: "03/07/2021",
      category: "Komputer",
    },
  ];

  let no = 1;
  return (
    <AdminLayout>
      <Container fluid className="">
        <h4 className="text-dark text-spacing-1 text-capitalize font-weight-light ">
          <span className="text-black"> Hi,{adminInfo?.username}</span> Selamat
          Datang
        </h4>
        <Row className="pt-6">
          <Col md={4} className=" mt-5 mt-md-0">
            <WidgetCard
              variant="yellow"
              icon={<Users size={45} />}
              caption="Anggota"
              value="20"
            />
          </Col>
          <Col md={4} className=" mt-5 mt-md-0">
            <WidgetCard
              variant="teal"
              icon={<Hand size={45} />}
              caption="Lelang aktif"
              value="20"
            />
          </Col>
          <Col md={4} className=" mt-5 mt-md-0">
            <WidgetCard
              icon={<Handshake size={45} />}
              caption="Transaksi"
              value="20"
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
                      <th>Dari</th>
                      <th>Tgl. berakhir</th>
                      <th>Kategori</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestAuctions.length !== 0 ? (
                      latestAuctions.map(item => {
                        return (
                          <tr key={item?.id}>
                            <td>{no++}</td>
                            <td>{item?.title}</td>
                            <td>{item?.by}</td>
                            <td>{item?.end}</td>
                            <td>{item?.category}</td>
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
                    {members.length !== 0 ? (
                      members.map(mbr => {
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
