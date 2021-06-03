import React from "react";
import { Row, Col, Form } from "react-bootstrap";

import PropTypes from "prop-types";

const defaultProps = {
  input1: {
    type: "text",
    label: "input label",
    value: "",
    placeholder: "",
    isInvalid: false,
  },
  input2: {
    type: "text",
    label: "input label",
    value: "",
    placeholder: "",
    isInvalid: false,
  },
};

const proptypes = {
  rootClass: PropTypes.string,
  input1: PropTypes.shape({
    controlId: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    isInvalid: PropTypes.bool,
  }),
  input2: PropTypes.shape({
    controlId: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    isInvalid: PropTypes.bool,
  }),
};

const InputGroupRow = ({ rootClass, input1, input2 }) => {
  return (
    <Row className={`${rootClass}`}>
      <Col md={6}>
        <Form.Group controlId={input1.controlId}>
          <Form.Label className="text-capitalize">{input1.label}</Form.Label>
          <Form.Control
            type={input1.type}
            placeholder={input1.placeholder}
            className={`bg-transparent border ${input1.className}`}
            value={input1.value}
            onChange={input1.onChange}
            isInvalid={input1.isInvalid}
            {...input1}
          />{" "}
          {input1.isInvalid ? (
            <Form.Control.Feedback type="invalid">
              {input1.errorMessage}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId={input2.controlId}>
          <Form.Label className="text-capitalize">{input2.label}</Form.Label>
          <Form.Control
            type={input2.type}
            placeholder={input2.placeholder}
            className={`bg-transparent border ${input2.className}`}
            value={input2.value}
            onChange={input2.onChange}
            isInvalid={input2.isInvalid}
            {...input2}
          />{" "}
          {input2.isInvalid ? (
            <Form.Control.Feedback type="invalid">
              {input2.errorMessage}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
      </Col>
    </Row>
  );
};

InputGroupRow.defaultProps = defaultProps;

InputGroupRow.propTypes = proptypes;

export default InputGroupRow;
