import React from "react";
import PropTypes from "prop-types";

const defaultProps = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const proptypes = {
  size: 32,
};

const caretUp = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 26L10 16L20 6"
        stroke="black"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

caretUp.defaultProps = defaultProps;

caretUp.propTypes = proptypes;

export default caretUp;
