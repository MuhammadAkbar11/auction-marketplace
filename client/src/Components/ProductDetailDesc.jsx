import React from "react";
import { Col, Container, Row, Tab, Tabs, Nav, Table } from "react-bootstrap";
import convertRupiah from "../utils/convertRupiah";
import DiscussionRoom from "./DiscussionRoom/DiscussionRoom";

const ProductDetailDesc = ({ auction, listBid }) => {
  const [key, setKey] = React.useState("home");
  const seen = new Set();
  return (
    <section className="description-review-wrapper ">
      <Container fluid className="px-md-8">
        <Row>
          <Col lg={12}>
            <Tab.Container
              id="description-tabs"
              defaultActiveKey="des-details1"
            >
              <Nav className="dec-review-topbar   ">
                <Nav.Link onSelect={k => setKey(k)} eventKey="des-details1">
                  Informasi Produk
                </Nav.Link>
                <Nav.Link onSelect={k => setKey(k)} eventKey="des-details2">
                  Riwayat Penawaran
                </Nav.Link>
                <Nav.Link onSelect={k => setKey(k)} eventKey="des-details3">
                  Diskusi produk{" "}
                </Nav.Link>
                <Nav.Link onSelect={k => setKey(k)} eventKey="des-details4">
                  Aturan Main{" "}
                </Nav.Link>
              </Nav>
              <Tab.Content className="dec-review-bottom">
                <Tab.Pane eventKey="des-details1">
                  {/* {}  */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: auction?.deskripsi || "",
                    }}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="des-details2">
                  {/* <div className=" font-weight-light ">

                  </div> */}
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Harga Penawaran</th>
                        <th>Waktu Penawaran</th>
                        <th>Bidder</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listBid.length !== 0 &&
                        listBid
                          .filter(el => {
                            const duplicate = seen.has(el.id_tawaran);
                            seen.add(el.id_tawaran);
                            return !duplicate;
                          })
                          .map(bid => {
                            return (
                              <tr key={bid.id_tawaran}>
                                {/* <td>1</td> */}
                                <td>Rp. {convertRupiah(+bid.nilai_tawaran)}</td>
                                <td>{bid.tgl_tawaran}</td>
                                <td>
                                  {bid?.member?.username || (
                                    <small className="text-danger font-italic">
                                      user deleted!
                                    </small>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      {/*  */}
                    </tbody>
                  </Table>
                </Tab.Pane>
                <Tab.Pane eventKey="des-details3">
                  {key === "des-details3" && (
                    <DiscussionRoom
                      auctionId={auction?.id_lelang}
                      auction={auction}
                      isActive={key === "des-details3"}
                    />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="des-details4">
                  <h5 className=" font-weight-light ">Aturan Main</h5>
                  <div className="pt-3">
                    <ul>
                      <li>
                        Bid and Run akan di suspend dan jika berulang akan
                        banned permanen.
                      </li>
                      <li>
                        Jika pemenang bid and run maka pemenang jatuh kepada
                        bidder yang mendekati.
                      </li>
                      <li>
                        Setiap kegiatan lelang (kalah bid, lelang mau selesai,
                        dll) akan ada notifikasi.
                      </li>
                      <li>
                        Pemenang bid adalah pemenang yang melakukan bid
                        tertinggi.
                      </li>
                    </ul>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetailDesc;
