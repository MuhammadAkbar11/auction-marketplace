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
        d="M26.2813 4.48475L2.99038 11.054C2.79444 11.1093 2.62003 11.223 2.49047 11.3801C2.36091 11.5371 2.28237 11.7299 2.26534 11.9328C2.24832 12.1357 2.29362 12.3389 2.39519 12.5154C2.49676 12.6918 2.64977 12.833 2.83376 12.9202L13.5351 17.9893C13.7438 18.0881 13.9119 18.2562 14.0108 18.4649L19.0798 29.1663C19.167 29.3502 19.3082 29.5032 19.4846 29.6048C19.6611 29.7064 19.8643 29.7517 20.0672 29.7347C20.2701 29.7176 20.4629 29.6391 20.6199 29.5095C20.777 29.38 20.8907 29.2056 20.946 29.0096L27.5153 5.71866C27.5635 5.54758 27.5653 5.36672 27.5204 5.19472C27.4755 5.02272 27.3856 4.86579 27.2599 4.7401C27.1342 4.6144 26.9773 4.52448 26.8053 4.4796C26.6333 4.43472 26.4524 4.4365 26.2813 4.48475Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M13.8579 18.1421L19.5148 12.4853"
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
