import React from "react";
import { Col, Container, Row, Tab, Nav, Table } from "react-bootstrap";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";

import convertRupiah from "../utils/convertRupiah";
import DiscussionRoom from "./DiscussionRoom/DiscussionRoom";

const ProductDetailDesc = ({ auction, listBid }) => {
  const [key, setKey] = React.useState("desc-info");

  const seen = new Set();

  const location = useLocation();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.has("tab")) {
      setKey(params.get("tab"));
      setOnSelect(params.get("tab"));
    } else {
      setOnSelect("desc-info", true);
    }
  }, [location]);

  const setOnSelect = (value, reset = false) => {
    const name = "tab";
    setKey(value);
    const searchParams = new URLSearchParams(location.search);
    if (reset) {
      searchParams.delete("tab");
      window.history.pushState(null, "", location.pathname);
      return;
    }
    searchParams.set(name, value);
    const newRelativePathQuery =
      location.pathname + "?" + searchParams.toString();
    window.history.pushState(null, "", newRelativePathQuery);
  };

  return (
    <section className="description-review-wrapper ">
      <Container fluid className="px-md-8">
        <Row>
          <Col lg={12}>
            <Tab.Container id="description-tabs" activeKey={key}>
              <Nav className="dec-review-topbar">
                <Nav.Link
                  onSelect={k => setOnSelect(k, true)}
                  eventKey="desc-info"
                >
                  Informasi Produk
                </Nav.Link>
                <Nav.Link
                  onSelect={k => setOnSelect(k)}
                  eventKey="desc-listbids"
                >
                  Riwayat Penawaran
                </Nav.Link>

                <Nav.Link
                  onSelect={k => setOnSelect(k)}
                  eventKey="desc-discuss"
                >
                  Diskusi produk{" "}
                </Nav.Link>
                <Nav.Link onSelect={k => setOnSelect(k)} eventKey="desc-rules">
                  Aturan Main{" "}
                </Nav.Link>
              </Nav>
              <Tab.Content className="dec-review-bottom">
                <Tab.Pane eventKey="desc-info">
                  {/* {}  */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: auction?.deskripsi || "",
                    }}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="desc-listbids">
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
                <Tab.Pane eventKey="desc-discuss">
                  {key === "desc-discuss" && (
                    <DiscussionRoom
                      auctionId={auction?.id_lelang}
                      auction={auction}
                      isActive={key === "desc-discuss"}
                    />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="desc-rules">
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
