import React from "react";
import {
  CurrencyCircleDollar,
  HandPalm,
  Info,
  ShoppingCart,
} from "phosphor-react";
import {
  Alert,
  Badge,
  Card,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsAction } from "../../actions/user.actions";
import { getUserDashAuctions } from "../../actions/user.dashboard.actions";
import {
  getUserBidsAction,
  getUserWinningAuctionAction,
} from "../../actions/user.purchase.actions";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import Layout from "../../Components/Layouts/Layout";
import SimpleWidgetCard from "../../Components/UI/Cards/SimpleWidgetCard";
import { AuctionIcon } from "../../Components/UI/Icons/Index";
import Loader from "../../Components/UI/Loader";
import Widget from "../../Components/UI/Widget";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import month from "../../data/month";
import convertRupiah from "../../utils/convertRupiah";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const date = new Date();
  const indoMonths = month;
  const { details } = useSelector(state => state.userDetails);
  const { auctions } = useSelector(state => state.userDashboard);
  const revenue = auctions?.sold_out?.rows?.reduce((sum, i) => {
    return sum + +i.total_harga;
  }, 0);

  const winningAuctionState = useSelector(state => state.userWinsAuction);
  const winsAuction = winningAuctionState?.auctions;

  const userMyBidsState = useSelector(state => state.userMyBids);
  const followAuctions = userMyBidsState?.data;
  const followAuctionsLoading = userMyBidsState?.loading;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserDashAuctions());
    dispatch(getUserDetailsAction());
    dispatch(getUserWinningAuctionAction());
    dispatch(getUserBidsAction());
  }, []);

  const user = { ...details };

  const billings = winsAuction.filter(bill => +bill.status_transaksi >= 2);

  let billingNo = 1;
  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Dashboard", active: true },
        ]}
      />
      <Container fluid className="px-md-8 py-4">
        <Row>
          <Col md={3}>
            <UserSidebarMenu />
          </Col>
          <Col md={9}>
            <Row className="mb-3">
              <Col sm={6}>
                <Card
                  style={{
                    width: "max-content",
                  }}
                  className="py-2 font-weight-bold  text-primary  px-3"
                >
                  {date.getDate()} {indoMonths[date.getMonth() + 1]}{" "}
                  {date.getFullYear()}
                </Card>
              </Col>
              <Col sm={6}>
                <div className="d-flex align-items-center justify-content-end  ">
                  <div className="text-right">
                    <h6 className="mb-0">{user?.username}</h6>
                    <small className="mt-0">{user?.email}</small>
                  </div>
                  <div
                    style={{
                      height: 60,
                      width: 60,
                    }}
                    className="rounded-circle overflow-hidden ml-2"
                  >
                    <img
                      className="object-fit-cover w-100 h-100"
                      src={user?.foto}
                      alt=""
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="pt-3">
              <Col sm={6} md={4} lg={3} className="mb-4 ">
                <Widget
                  color="primary"
                  caption="Total Lelang"
                  icon={<AuctionIcon size={60} />}
                  value={auctions?.all?.count}
                />
              </Col>

              <Col sm={6} md={4} lg={3} className="mb-4 ">
                <Widget
                  caption="Lelang Aktif"
                  icon={<HandPalm size={60} className="text-primary" />}
                  value={auctions?.active?.count}
                />
              </Col>
              <Col sm={6} md={4} lg={3} className="mb-4 ">
                <Widget
                  caption="Barang Terjual"
                  icon={<ShoppingCart size={60} className="text-primary" />}
                  value={auctions?.sold_out?.count}
                />
              </Col>
              <Col sm={6} md={4} lg={3} className="mb-4 ">
                <Widget
                  caption="Total Penjualan"
                  icon={
                    <CurrencyCircleDollar size={60} className="text-primary" />
                  }
                  valueTag="h4"
                  value={revenue ? convertRupiah(+revenue) : 0}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={8}>
                <Card>
                  <Card.Header className="bg-transparent">Tagihan</Card.Header>
                  <Card.Body className="">
                    <Table hover size="sm" responsive striped>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Lelang</th>
                          <th>Bayar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {winningAuctionState.loading ? (
                          <Loader />
                        ) : billings.length !== 0 ? (
                          <>
                            {winsAuction.map(item => {
                              let statusContent = (
                                <Badge variant="warning" className=" rounded-0">
                                  Menunggu pembayaran
                                </Badge>
                              );
                              const status = +item.status_transaksi;

                              if (status === 2) {
                                item?.isPaymentExp ? (
                                  statusContent(
                                    <>
                                      <OverlayTrigger
                                        overlay={
                                          <Tooltip id="tooltip-disabled">
                                            Anda telat melakukan pembayaran{" "}
                                          </Tooltip>
                                        }
                                      >
                                        <span className="d-inline-block">
                                          <Badge className=" rounded-0">
                                            Telat dibayar
                                          </Badge>
                                        </span>
                                      </OverlayTrigger>
                                    </>
                                  )
                                ) : (
                                  <Badge
                                    variant="warning"
                                    className=" rounded-0"
                                  >
                                    Menunggu pembayaran
                                  </Badge>
                                );
                              }

                              if (status === 3) {
                                statusContent = (
                                  <Badge variant="info" className=" rounded-0">
                                    Menunggu konfirmasi pembayaran
                                  </Badge>
                                );
                              }

                              if (status >= 4) {
                                statusContent = (
                                  <Badge
                                    variant="success"
                                    className=" rounded-0"
                                  >
                                    Terbayar
                                  </Badge>
                                );
                              }
                              return (
                                <tr>
                                  <td>{billingNo++}</td>
                                  <td className="text-nowrap">
                                    {" "}
                                    {item.status_transaksi >= 2
                                      ? "Rp. " +
                                        convertRupiah(+item.total_harga)
                                      : "-"}
                                  </td>
                                  <td>{statusContent}</td>
                                  <td> {item.lelang.judul}</td>
                                  <td>
                                    {status === 2 && !item?.isPaymentExp ? (
                                      <Link
                                        className="btn btn-primary btn-sm"
                                        to={`/akun/pembayaran/${item.id_transaksi}`}
                                        variant="primary"
                                      >
                                        Bayar Sekarang
                                      </Link>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        ) : (
                          <tr>
                            <td colSpan={7}>
                              <Alert variant="info" className="text-center">
                                <Info size={24} /> Belum ada lelang untuk saat
                                ini.
                              </Alert>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card body className="border-0">
                  <p className=" font-weight-bold text-capitalize ">
                    Lelang yang anda ikuti
                  </p>
                  <div className="pt-1 mb-2">
                    {followAuctionsLoading ? (
                      <Loader />
                    ) : followAuctions?.length != 0 ? (
                      followAuctions?.map(ac => {
                        return (
                          <Card className="border-0">
                            <Card.Body className="pl-0 pr-2 py-2 d-flex justify-content-between align-items-center ">
                              <Link to={`/item/${ac.id_lelang}`}>
                                {ac?.judul}
                              </Link>
                              <small className="text-success">
                                Rp. {ac?.tawaran[0].nilai_tawaran}
                              </small>
                            </Card.Body>
                          </Card>
                        );
                      })
                    ) : (
                      <small>Belum ada lelang yang diikuti</small>
                    )}
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default UserDashboard;
