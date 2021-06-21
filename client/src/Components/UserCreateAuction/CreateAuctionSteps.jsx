import React from "react";
import { Button, Badge, Nav } from "react-bootstrap";
import { Check } from "phosphor-react";
import { LinkContainer } from "react-router-bootstrap";
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
  const navLinkActiveClass = " text-primary step-active ";

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
        isPrev={step2 && step3}
        text="Deskripsi Produk"
        number={2}
        to="/akun/buat-lelang?tab=kategori"
      />
      <CreateAuctionStepItem
        active={step3}
        isPrev={step3 && step4}
        text="Harga dan Durasi"
        number={3}
        to="/akun/buat-lelang?tab=harga-durasi"
      />
      <CreateAuctionStepItem
        active={step3}
        isPrev={step3 && step4}
        text="pengiriman"
        number={4}
        to="/akun/buat-lelang?tab=pengiriman"
      />

      {/* <Nav.Item
        className={`create-auction-step-item px-2 ${
          currentStep === "step2" ? "step-active" : ""
        } ${step2 && step3 && "prev-step"}`}
      >
        {step2 ? (
          <LinkContainer
            to="/akun/buat-lelang?tab=deskripsi"
            className={navLinkActiveClass}
          >
            <Nav.Link>Deskripsi Produk </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Deskripsi Produk</Nav.Link>
        )}
      </Nav.Item> */}
      {/* <Nav.Item
        className={`create-auction-step-item px-2 ${
          currentStep === "step3" ? "step-active" : ""
        } ${step3 && step4 && "prev-step"}`}
      >
        {step3 ? (
          <LinkContainer to="/payment" className={navLinkActiveClass}>
            <Nav.Link>Payment </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item
        className={`create-auction-step-item px-2 ${
          currentStep === "step4" ? "step-active" : ""
        }`}
      >
        {step4 ? (
          <LinkContainer to="/summary" className={navLinkActiveClass}>
            <Nav.Link>Order Summary</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Order Summary</Nav.Link>
        )}
      </Nav.Item> */}
    </Nav>
  );
};

CreateAuctionSteps.defaultProps = defaultProps;

CreateAuctionSteps.propTypes = proptypes;

export default CreateAuctionSteps;
