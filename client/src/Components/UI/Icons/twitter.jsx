import React from "react";

const twitter = ({ size }) => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 25C6 25 11 24 12 21C12 21 4 18 6 7C6 7 10 12 16 13V11.0004C16.0001 9.85156 16.3957 8.73783 17.1204 7.84641C17.845 6.95498 18.8545 6.34023 19.9791 6.10551C21.1036 5.87078 22.2747 6.0304 23.2954 6.55752C24.3162 7.08464 25.1243 7.94712 25.5839 8.99996L30 9L26 13C26 20 21 27 12 27C8 27 6 25 6 25Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

twitter.defaultProps = {
  size: 32,
};
export default twitter;
