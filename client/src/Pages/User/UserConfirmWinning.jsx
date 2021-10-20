import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layouts/Layout";
import { Col, Container, Row, Alert, Modal } from "react-bootstrap";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import Loader from "../../Components/UI/Loader";
import UserSidebarMenu from "../../Components/UserMenuLayout/UserSidebarMenu";
import { getUserDetailsAction } from "../../actions/user.actions";
import UserConfirmWinForm from "../../Components/UserConfirmWinForm/UserConfirmWinForm";
import { getUserWinningAuctionDetailsAction } from "../../actions/user.purchase.actions";
import useIsValidData from "../../hooks/useIsValidData";

const UserConfirmWinning = props => {
  const { match } = props;

  const { invoiceId } = match?.params;

  const dispatch = useDispatch();

  const [auctionDetails, setAuctionDetails] = React.useState(null);
  const [loadingDetails, setLoadingDetails] = React.useState(false);
  const [showModalInfo, setShowModalInfo] = React.useState(false);

  const userDetailsState = useSelector(state => state.userDetails);
  const userDetailsData = userDetailsState.details;

  const { loading } = useSelector(state => state.userWinningConfirm);

  const [isValidData, loadingValidData] = useIsValidData();

  React.useEffect(() => {
    const loadAuction = id => {
      setLoadingDetails(true);
      dispatch(getUserWinningAuctionDetailsAction(id))
        .then(res => {
          setAuctionDetails(res.invoice);
          setLoadingDetails(false);
        })
        .catch(err => {
          setLoadingDetails(false);
          console.log(err);
        });
    };

    loadAuction(invoiceId);
  }, [invoiceId]);

  React.useEffect(() => {
    dispatch(getUserDetailsAction());
  }, []);

  React.useEffect(() => {
    if (!isValidData) {
      setShowModalInfo(true);
    }

    return () => {
      setShowModalInfo(false);
    };
  }, [isValidData]);

  return (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Akun", active: true },
          { title: "Pembelian Saya", url: "/akun/pembelian" },
          { title: "Konfirmasi Lelang Dimenangkan", active: true },
        ]}
      />
      <section>
        {isValidData ? (
          <Container fluid className="px-md-8 py-4">
            <Row>
              <Col md={3}>
                <UserSidebarMenu />
              </Col>
              <Col md={9}>
                <div>
                  <Alert variant="info">
                    Lengkapi Form dibawah untuk mengkonfirmasi lelang yang anda
                    menangkan
                  </Alert>
                </div>
                <div>
                  {/* {loadingDetails ? (
                <div className="pt-5">
                  <Loader size={90} />
                </div>
              ) : ( */}
                  <UserConfirmWinForm
                    loading={loading}
                    user={userDetailsData}
                    invoiceId={invoiceId}
                    data={auctionDetails}
                  />
                  {/* )} */}
                </div>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container fluid className="px-md-8 py-6">
            <Row>
              <Col md={7} className="mx-auto">
                {!loadingValidData ? (
                  <Modal
                    show={showModalInfo}
                    className="bg-gray-100  "
                    centered
                  >
                    <Modal.Header>
                      <Modal.Title className="text-dark">
                        Tidak dapat melakukan konfirmasi!
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Silahkan lengkapi data diri anda untuk melajutkan! </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Link to="/akun/info" className="btn btn-outline-primary">
                        Lengkapi data diri
                      </Link>
                      {/* <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button> */}
                    </Modal.Footer>
                  </Modal>
                ) : (
                  <div
                    className="w-100 d-flex justify-content-center align-items-center "
                    style={{
                      minHeight: "250px",
                    }}
                  >
                    <Loader size={55} />
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </Layout>
  );
};

export default UserConfirmWinning;
