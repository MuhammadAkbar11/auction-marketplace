import React from "react";

const caretLeft = ({ size }) => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 26L10 16L20 6"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

caretLeft.defaultProps = {
  size: 32,
};
export default caretLeft;
