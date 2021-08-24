import React from "react";
import { Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import CreateAuctionStepItem from "./CreateAuctionStepItem";

const defaultProps = {
  step1: false,
  step2: false,
  step3: false,
  step4: false,
};

const proptypes = {
  step1: PropTypes.bool,
  step2: PropTypes.bool,
  step3: PropTypes.bool,
  step4: PropTypes.bool,
  currentStep: PropTypes.string.isRequired,
};

const CreateAuctionSteps = ({ step1, step2, step3, step4, currentStep }) => {
  // const navLinkActiveClass = " text-primary step-active ";
  // console.log(step1, step2, step3);
  // console.log(step1 && step2 && step3);
  return (
    <Nav className=" justify-content-center create-auction-step ">
      <CreateAuctionStepItem
        active={currentStep === "step1"}
        isPrev={step1 && step2}
        text="Kategori Produk"
        number={1}
        to="/akun/buat-lelang?tab=kategori"
      />
      <CreateAuctionStepItem
        active={step2}
        isPrev={step1 && step2 && step3}
        active={currentStep === "step2"}
        text="Deskripsi Produk"
        number={2}
        to="/akun/buat-lelang?tab=kategori"
      />
      <CreateAuctionStepItem
        isPrev={step1 && step2 && step3 && step4}
        active={currentStep === "step3"}
        text="Harga dan Durasi"
        number={3}
        to="/akun/buat-lelang?tab=harga-dan-durasi"
      />
      <CreateAuctionStepItem
        active={currentStep === "step4"}
        text="Pengiriman"
        number={4}
        to="/akun/buat-lelang?tab=pengiriman"
      />
    </Nav>
  );
};

CreateAuctionSteps.defaultProps = defaultProps;

CreateAuctionSteps.propTypes = proptypes;

export default CreateAuctionSteps;
