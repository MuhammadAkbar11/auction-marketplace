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
    controlid: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    isInvalid: PropTypes.bool,
    errormessage: PropTypes.string,
  }),
  input2: PropTypes.shape({
    controlid: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    isInvalid: PropTypes.bool,
    errormessage: PropTypes.string,
  }),
};

const InputGroupRow = ({ rootClass, labelClass, input1, input2 }) => {
  return (
    <Row className={`${rootClass}`}>
      <Col sm={6} md={6}>
        <Form.Group controlId={input1.controlid}>
          <Form.Label className={`text-capitalize ${labelClass}`}>
            {input1.label}
          </Form.Label>
          <Form.Control
            type={input1.type}
            placeholder={input1.placeholder}
            className={`bg-transparent border ${input1.className}`}
            value={input1.value}
            onChange={input1.onChange}
            isInvalid={input1.isInvalid}
            readOnly={input1.readOnly}
            {...input1}
          />{" "}
          {input1.isInvalid ? (
            <Form.Control.Feedback type="invalid">
              {input1.errormessage}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
      </Col>
      <Col sm={6} md={6}>
        <Form.Group controlId={input2.controlid}>
          <Form.Label className={`text-capitalize ${labelClass}`}>
            {input2.label}
          </Form.Label>
          <Form.Control
            type={input2.type}
            placeholder={input2.placeholder}
            className={`bg-transparent border ${input2.className}`}
            value={input2.value}
            onChange={input2.onChange}
            isInvalid={input2.isInvalid}
            readOnly={input2.readOnly}
            {...input2}
          />{" "}
          {input2.isInvalid ? (
            <Form.Control.Feedback type="invalid">
              {input2.errormessage}
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
