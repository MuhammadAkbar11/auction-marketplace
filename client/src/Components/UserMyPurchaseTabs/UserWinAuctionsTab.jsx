import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  // Alert,
  Row,
  Col,
  ListGroup,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { getUserWinningAuctionAction } from "../../actions/user.purchase.actions";
import Loader from "../UI/Loader";
import convertRupiah from "../../utils/convertRupiah";

const UserWinAuctionsTab = ({ isActive }) => {
  const winningAuctionState = useSelector(state => state.userWinsAuction);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isActive) {
      dispatch(getUserWinningAuctionAction());
    }
  }, [isActive]);

  const winsAuction = winningAuctionState?.auctions;

  return (
    <>
      <Card className="mt-4">
        <Card.Header className="bg-transparent pt-4 text-dark text-uppercase font-weight-bold">
          <Card.Title>Lelang yang dimenangkan</Card.Title>
        </Card.Header>
        <Card.Body className=" ">
          {winningAuctionState?.loading ? (
            <div
              style={{
                height: 200,
              }}
              className="mt-3 d-flex justify-content-center"
            >
              <Loader size={30} />
            </div>
          ) : winsAuction && winsAuction.length !== 0 ? (
            winsAuction.map(item => {
              let statusContent = <Button>Selesai ?</Button>;
              const status = +item.status_transaksi;
              if (status === 0) {
                statusContent = (
                  <Link
                    className=" btn btn-primary btn-sm"
                    to={`/akun/pembelian/konfirmasi/${item.id_transaksi}`}
                  >
                    Konfirmasi
                  </Link>
                );
              }

              if (status === 1) {
                statusContent = (
                  <Button size="sm" disabled variant="outline-primary">
                    Menunggu total tagihan
                  </Button>
                );
              }

              if (status === 2) {
                if (item?.isPaymentExp === true) {
                  statusContent = (
                    <>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            Anda telat melakukan pembayaran{" "}
                          </Tooltip>
                        }
                      >
                        <span className="d-inline-block">
                          <Button
                            size="sm"
                            disabled
                            style={{ pointerEvents: "none" }}
                          >
                            Pembayaran
                          </Button>
                        </span>
                      </OverlayTrigger>
                    </>
                  );
                } else {
                  statusContent = (
                    <Link
                      className="btn btn-primary btn-sm"
                      to={`/akun/pembayaran/${item.id_transaksi}`}
                      variant="outline-primary"
                    >
                      Pembayaran
                    </Link>
                  );
                }
              }

              if (status === 3) {
                statusContent = (
                  <Button size="sm" disabled variant="outline-primary">
                    Menunggu konfirmasi pembayaran
                  </Button>
                );
              }

              return (
                <Card className=" mb15" key={item.id_transaksi}>
                  <Card.Header className=" bg-transparent d-flex justify-content-between ">
                    <p>Berakhir pada : {item?.lelang?.tgl_selesai}</p>
                    <Link to="/track-order">Tracking Order</Link>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={3} className=" d-flex justify-content-center">
                        <Card.Img
                          className="  card-img-wins-auction "
                          src={item?.lelang?.gambar[0]?.url}
                        />
                      </Col>
                      <Col
                        lg={9}
                        className="d-flex flex-column flex-md-row justify-content-between mt-3 mt-lg-0 "
                      >
                        <div className=" flex-grow-1 text-gray-700 font-weight-normal">
                          <h5 className=" text-capitalize  ">
                            {item.lelang.judul}
                          </h5>
                          <ListGroup className="pl-0 border-0 ">
                            <ListGroup.Item className="pl-0  border-0  ">
                              <div className="row ">
                                <div className="text-left col-sm-6 text-gray-600    ">
                                  Penjual
                                </div>
                                <div className="text-left  col-sm-6 text-dark text-nowrap">
                                  {item.lelang?.penjual?.email}
                                </div>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="pl-0 border-top-0 border-left-0 border-right-0   pt-0 ">
                              <div className="row ">
                                <div className="text-left col-sm-6 text-gray-600   ">
                                  Bid Terringgi
                                </div>
                                <div className="text-left text-dark col-sm-6">
                                  {item.tawaran?.nilai_tawaran}
                                </div>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="pl-0 border-0  border-top ">
                              <div className="row ">
                                <div className="text-left col-sm-6 text-gray-700   ">
                                  Total Tagihan
                                </div>
                                <div className="text-left text-dark col-sm-6">
                                  {item.status_transaksi >= 2
                                    ? "Rp. " + convertRupiah(+item.total_harga)
                                    : "-"}
                                </div>
                              </div>
                            </ListGroup.Item>
                          </ListGroup>
                        </div>
                        <div className=" text-right flex-grow-1 d-flex flex-column justify-content-between ">
                          <p>ID {item.id_transaksi}</p>
                          <div>{statusContent}</div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })
          ) : null}
        </Card.Body>
      </Card>
    </>
  );
};

export default UserWinAuctionsTab;
