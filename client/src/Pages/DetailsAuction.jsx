import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAuctionDetailsAction } from "../actions/auctions.actions";
import BreadcrumbsContainer from "../Components/Layouts/BreadcrumbsContainer";
import Layout from "../Components/Layouts/Layout";
import ProductDetailDesc from "../Components/ProductDetailDesc";
import ProductDetailImage from "../Components/ProductDetailImage";
import Loader from "../Components/UI/Loader";
import { io } from "socket.io-client";
import { SERVER_ENDPOINT } from "../constants/socket.constants";
import { authLoginErrorMessageAction } from "../actions/auth.actions";
import BidForm from "../Components/BidForm";
import convertRupiah from "../utils/convertRupiah";
let socket;

const DetailsAuction = props => {
  const { match, history } = props;
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.authUser);
  const { auction, loading } = useSelector(state => state.auctionDetails);

  const [countdown, setCountdown] = React.useState(null);
  const [currentBid, setCurrentBid] = React.useState(null);
  const [listBid, setListBid] = React.useState([]);
  const [loadingBid, setLoadingBid] = React.useState(false);
  const [bidErr, setBidErr] = React.useState(null);

  React.useEffect(() => {
    socket = io(SERVER_ENDPOINT);
    dispatch(getAuctionDetailsAction(match.params?.itemId));

    socket.emit("get-bids", { id: match.params?.itemId }, (data, err) => {
      if (err) {
        setCurrentBid(null);
        setListBid([]);

        return;
      }

      if (data?.tawaran.length !== 0) {
        setCurrentBid(data?.tawaran_tertinggi);
      }
      setListBid(data?.tawaran);
    });

    return () => {
      socket.on("disconnect");
      socket.off();
    };
  }, [SERVER_ENDPOINT, match.params]);

  React.useEffect(() => {
    socket.emit("get-countdown-item", { id: match.params?.itemId });

    return () => {};
  }, []);

  React.useEffect(() => {
    socket.on("current-bid", current => {
      setCurrentBid(current);

      setListBid(prevState => {
        return [current, ...prevState];
      });
    });

    if (!loading) {
      if (!auction.telah_berakhir) {
        socket.on("set-countdown-item", timer => {
          if (!auction.telah_berakhir && timer.isEnded) {
            window.location.reload();
          }

          setCountdown(timer);
        });
      }
    }
  }, [loading, auction]);

  React.useEffect(() => {
    if (bidErr) {
      setTimeout(() => {
        setBidErr(null);
      }, 8000);
    }
  }, [bidErr]);

  const handleBid = bidValue => {
    setLoadingBid(true);
    setBidErr(null);
    if (userInfo) {
      socket.emit(
        "send-bid",
        {
          id_lelang: auction.id_lelang,
          id_member: userInfo.id_member,
          nilai: +bidValue,
          token: userInfo.token,
        },
        (res, err) => {
          if (err) {
            console.log(err);
            if (err?.errors?.type === "BID") {
              setBidErr(err.message);
            }
            // if(er)
            setLoadingBid(false);
            return;
          }

          if (res?.isLastBid) {
            window.location.reload();
            return;
          }
          setLoadingBid(false);
        }
      );
    } else {
      dispatch(authLoginErrorMessageAction("Silahkan login terlebih dahulu"));
      history.push("/akun/masuk");
    }
  };

  const seen = new Set();
  const filteredListBid = listBid.filter(el => {
    const duplicate = seen.has(el.id_tawaran);
    seen.add(el.id_tawaran);
    return !duplicate;
  });

  return (
    <>
      <Layout>
        <BreadcrumbsContainer
          items={[
            { title: "Home", url: "/" },
            { title: "Detail", active: true },
            { title: auction?.judul || "", active: true },
          ]}
        />

        <section className="product-details-area pt-4 pb-115">
          <Container fluid className="px-md-8">
            <Link to="/lelang" className="btn btn-light">
              Kembali
            </Link>

            {auction ? (
              <Row className="pt-4">
                <Col lg={6} md={6}>
                  {loading ? (
                    <div className="mt-4">
                      <Loader size={50} />
                    </div>
                  ) : (
                    <ProductDetailImage
                      loading={loading}
                      images={auction?.gambar}
                    />
                  )}
                </Col>
                <Col lg={6} md={6}>
                  {loading ? (
                    <div className="mt-4">
                      <Loader size={50} />
                    </div>
                  ) : (
                    <>
                      <div className="product-details-content pro-details-content-mrg ">
                        <h2 className="product-title">{auction?.judul}</h2>
                        <div
                          className="pro-details-timer mt20 mb20 d-flex align-items-end"
                          title="Waktu Tersisa"
                        >
                          {auction.telah_berakhir ? (
                            <h5 className="text-danger text-spacing-0 ">
                              Telah Berakhir
                            </h5>
                          ) : (
                            <h2 className="text-primary  font-weight-bold my-0 mr-2 ">
                              {countdown
                                ? `${countdown?.days} Hari, ${countdown?.hours}:${countdown?.minutes}:${countdown?.seconds}`
                                : "-"}
                            </h2>
                          )}
                        </div>

                        <div>
                          <div className="pro-details-custom mb-4">
                            <span className="text-dark">
                              Penawaran Berakhir Pada :{" "}
                            </span>
                            <div className="pro-details-custom-content">
                              {auction?.tgl_selesai || "..loading"}
                            </div>
                          </div>
                          <div className="pro-details-custom mb-4">
                            <span className="text-dark">Kondisi :</span>
                            <div className="pro-details-custom-content">
                              {auction?.status_brg || "...loading"}
                            </div>
                          </div>

                          <div className="product-details-meta mb-4">
                            <ul className=" list-unstyled pl-0 ">
                              <li>
                                <span className="text-dark mr-2">
                                  Kategori :
                                </span>{" "}
                                <Link to={`/kategori/${auction?.id_kategori}`}>
                                  {auction?.kategori || "...loading"}
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <hr />
                          <Row className="mt30 mb-4">
                            <Col className="pro-details-custom">
                              <span className="text-dark">Bid saat ini:</span>
                              <div className="pro-details-custom-content">
                                <h3
                                  style={{
                                    letterSpacing: 0.4,
                                  }}
                                  className="text-primary font-weight-normal text-capitalize "
                                >
                                  {/* {auction?.tawaran_saat_ini
                            ? "Rp. " +
                              auction?.tawaran_saat_ini?.nilai_tawaran
                            : "Rp. " + auction?.hrg_awal || "...loading"} */}
                                  Rp.{" "}
                                  {loadingBid
                                    ? "..."
                                    : currentBid
                                    ? convertRupiah(+currentBid?.nilai_tawaran)
                                    : auction?.hrg_awal || "-"}
                                </h3>
                              </div>
                            </Col>
                            <Col className="pro-details-custom">
                              <span className="text-dark">
                                Bidder tertinggi:
                              </span>
                              <div className="pro-details-custom-content ">
                                {loadingBid
                                  ? "..."
                                  : currentBid?.member?.username || "-"}
                              </div>
                            </Col>
                          </Row>
                          <hr />
                          <div>
                            {!auction.telah_berakhir ? (
                              filteredListBid.length >=
                              auction.batas_tawaran ? (
                                <div>
                                  <h5 className=" text-spacing-1 text-primary ">
                                    Penawaran telah ditutup
                                  </h5>
                                </div>
                              ) : (
                                <BidForm
                                  errorBidding={bidErr}
                                  loading={loadingBid}
                                  defaultValue={
                                    auction?.tawaran.length !== 0
                                      ? currentBid?.nilai_tawaran
                                      : auction?.hrg_awal
                                  }
                                  socket={socket}
                                  auction={auction}
                                  handleBid={handleBid}
                                />
                              )
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            ) : (
              <Row>
                <Col className="pt-5 text-center">
                  {loading ? (
                    <div className="mt-4">
                      <Loader size={50} />
                    </div>
                  ) : (
                    <h3>Lelang tidak dapat ditemukan</h3>
                  )}
                </Col>
              </Row>
            )}
          </Container>
        </section>
        {auction && (
          <ProductDetailDesc
            loading={loading}
            auction={auction}
            listBid={listBid}
          />
        )}
        {/* <section className="related-product">
        <Container fluid className="px-md-8">
          <SectionTitle title="Produk Terkait" actionText="See more" />
          <ProductRelatedSlider />
        </Container>
      </section> */}
      </Layout>
    </>
  );
};

export default DetailsAuction;
