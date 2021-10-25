import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuctionDetailsAction,
  postUserUpdateAuctionAction,
} from "../../actions/user.actions";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import useImagesUploader from "../../hooks/useImagesUploader";
import UserUpdateAuctionDescription from "../../Components/UserUpdateAuction/UserUpdateAuctionDescription";
import UserUpdateAuctionRegular from "../../Components/UserUpdateAuction/UserUpdateAuctionRegular";
import UserUpdateAuctionDelivery from "../../Components/UserUpdateAuction/UserUpdateAuctionDelivery";
import { Redirect } from "react-router";
import Loader from "../../Components/UI/Loader";
import Layout from "../../Components/Layouts/Layout";

const formikSchema = () => {
  return Yup.object().shape({
    category: Yup.string().required("Kategori belum di pilih"),
    title: Yup.string().required("Judul produk belum terisi"),
    status: Yup.string().required("Kondisi Belum di pilih"),
    description: Yup.string(),
    openBid: Yup.string().required("Harga awal belum terisi"),
    multiples: Yup.string().required("Kelipatan bid belum terisi"),
    maxBid: Yup.string().required("Total Tawaran belum terisi"),
    duration: Yup.string().required("Durasi belum dipilih"),
  });
};

const UpdateAuction = props => {
  const { history, match } = props;
  const auctionId = match.params?.idAuction;

  const { userInfo } = useSelector(state => state.authUser);
  const updateState = useSelector(state => state.userUpdateAuction);
  const { auction, loading } = useSelector(state => state.userAuctionDetails);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!userInfo) {
      history.push("/akun/masuk");
      return;
    } else {
      dispatch(getUserAuctionDetailsAction(auctionId));
    }
  }, [userInfo, auctionId, history, dispatch]);

  const imagesUploader = useImagesUploader();

  const dimensionItem = auction ? JSON.parse(auction?.dimensi_brg) : {};
  const delivery = auction ? JSON.parse(auction?.alamat_barang) : {};
  const typeDel = auction ? JSON.parse(auction?.jenis_pengiriman) : {};

  const formik = useFormik({
    validationSchema: formikSchema(auction?.status_lelang),
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      auctionId,
      category: auction?.id_kategori || "",
      title: auction?.judul || "",
      description: auction?.deskripsi || "",
      images: imagesUploader.images,
      openBid: auction?.hrg_awal.replace(/^[0-9]*$/, "") || "",
      multiples: auction?.kelipatan_hrg.replace(/^[0-9]*$/, "") || "",
      maxBid: auction?.batas_tawaran || "",
      duration: +auction?.durasi || 1,
      dateStart: auction?.tgl_mulai || "",
      timeStart: auction?.jam_mulai || "",
      status: auction?.status_lelang || 0,
      id_provinsi: delivery?.id_provinsi || "",
      id_kota: delivery?.id_kota || "",
      id_kecamatan: delivery?.id_kecamatan || "",
      id_kelurahan: delivery?.id_kelurahan || "",
      alamat: delivery?.alamat || "",
      kode_pos: delivery?.kode_pos || "",
      jenis_pengiriman: typeDel || {
        pickup: false,
        courier_service: false,
        bySeller: false,
      },
      panjang: dimensionItem?.panjang || "",
      lebar: dimensionItem?.lebar || "",
      tinggi: dimensionItem?.tinggi || "",
      berat: dimensionItem?.berat || "",
      biaya_packing: auction?.biaya_packing || "",
    },
    onSubmit: values => {
      dispatch(postUserUpdateAuctionAction(values)).then(() => {
        history.push("/akun/lelang");
      });
    },
  });

  if (loading) {
    return (
      <Layout>
        <BreadcrumbsContainer
          items={[
            { title: "Home", url: "/" },
            { title: "Update lelang", active: true },
          ]}
        />
        <Container fluid className="px-md-8 py-10">
          <Row>
            <Col md={8} className="mx-auto">
              <Loader />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }

  const isAuthor = auction?.id_member === userInfo.id_member;

  return auction === null ? (
    <Redirect to="/not-found" />
  ) : isAuthor ? (
    <Layout>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Update lelang", active: true },
        ]}
      />
      <Container fluid className="px-md-8 py-10">
        <Form onSubmit={formik.handleSubmit}>
          <UserUpdateAuctionDescription
            formik={formik}
            handleUpload={imagesUploader}
            oldImages={auction?.gambar || []}
          />
          <UserUpdateAuctionRegular
            status={auction?.status_lelang}
            formik={formik}
          />
          <UserUpdateAuctionDelivery formik={formik} />
          <Row>
            {/* <Col md={3}>
            <UserSidebarMenu />
          </Col> */}

            <Col></Col>
            <Col></Col>
          </Row>
          <Button
            className="mt-3 d-flex"
            disabled={updateState.loading}
            type="submit"
          >
            {updateState.loading ? (
              <>
                {" "}
                <Loader
                  className="mr-2"
                  variant="light"
                  size={12}
                /> Mengirim..{" "}
              </>
            ) : (
              "Ubah Data"
            )}
          </Button>
        </Form>
      </Container>
    </Layout>
  ) : (
    <Redirect to="/akun/lelang" />
  );
};

export default UpdateAuction;
