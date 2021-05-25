import React from "react";
import PropTypes from "prop-types";

const defaultProps = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const proptypes = {
  size: 32,
};

const times = ({ size }) => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 7L7 25"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 25L7 7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

times.defaultProps = defaultProps;

times.propTypes = proptypes;

export default times;
