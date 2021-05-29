import React from "react";

const facebook = ({ size }) => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 11.0001H19C18.2044 11.0001 17.4413 11.3162 16.8787 11.8788C16.3161 12.4414 16 13.2045 16 14.0001V28.0001"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M12 18.0001H20"
        strokeWidth={2}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

facebook.defaultProps = {
  size: 32,
};
export default facebook;
