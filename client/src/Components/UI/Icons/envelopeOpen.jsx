import React from "react";

const paperPlaneTilt = ({ size }) => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28 12V25C28 25.2652 27.8946 25.5196 27.7071 25.7071C27.5196 25.8946 27.2652 26 27 26H5C4.73478 26 4.48043 25.8946 4.29289 25.7071C4.10536 25.5196 4 25.2652 4 25V12L16 4L28 12Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8182 19L4.30835 25.7174"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.6918 25.7174L18.1818 18.9999"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 12L18.1819 19H13.8181L4 12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

paperPlaneTilt.defaultProps = {
  size: 32,
};
export default paperPlaneTilt;
