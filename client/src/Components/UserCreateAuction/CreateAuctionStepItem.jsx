import React from "react";
import { Badge, Nav } from "react-bootstrap";
import { Check } from "phosphor-react";
import { LinkContainer } from "react-router-bootstrap";
const CreateAuctionStepItem = ({ active, isPrev, text, number, to }) => {
  let navLink = null;
  if (active) {
    navLink = (
      <>
        <div>
          <Badge>{number}</Badge>
        </div>
        <Nav.Link disabled>{text}</Nav.Link>
      </>
    );
  } else if (isPrev) {
    navLink = (
      <>
        <div>
          <Badge>
            {" "}
            <Check weight="bold" size={22} />{" "}
          </Badge>
        </div>
        <LinkContainer to={to}>
          <Nav.Link>{text}</Nav.Link>
        </LinkContainer>
      </>
    );
  } else {
    navLink = (
      <>
        <div>
          <Badge>{isPrev ? <Check weight="bold" size={22} /> : number}</Badge>
        </div>
        <Nav.Link disabled>{text}</Nav.Link>
      </>
    );
  }

  return (
    <Nav.Item
      className={`create-auction-step-item d-flex mx-2 ${
        active && "step-active"
      } ${isPrev && "prev-step"}`}
    >
      {navLink}
    </Nav.Item>
  );
};

export default CreateAuctionStepItem;
