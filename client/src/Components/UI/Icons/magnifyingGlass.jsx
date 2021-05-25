import React from "react";
import PropTypes from "prop-types";

const defaultProps = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const proptypes = {
  size: 32,
};

const magnifyingGlass = ({ size }) => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 25C20.299 25 25 20.299 25 14.5C25 8.70101 20.299 4 14.5 4C8.70101 4 4 8.70101 4 14.5C4 20.299 8.70101 25 14.5 25Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9243 21.925L27.9994 28.0001"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

magnifyingGlass.defaultProps = defaultProps;

magnifyingGlass.propTypes = proptypes;

export default magnifyingGlass;
