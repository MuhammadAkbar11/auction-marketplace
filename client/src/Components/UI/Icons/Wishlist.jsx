import React from "react";
import PropTypes from "prop-types";

const defaultProps = {
  size: PropTypes.string,
};

const proptypes = {
  size: "32",
};

const Wishlist = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.7071 26.4853L26.8361 16.3563C29.3249 13.8675 29.6921 9.77302 27.3369 7.15748C26.7469 6.50044 26.0293 5.97048 25.2278 5.59995C24.4262 5.22942 23.5576 5.02609 22.6749 5.00235C21.7922 4.97861 20.9139 5.13497 20.0936 5.46189C19.2733 5.78881 18.5282 6.27943 17.9038 6.90381L16 8.80761L14.3563 7.16387C11.8675 4.67507 7.77302 4.30788 5.15748 6.66313C4.50044 7.25309 3.97048 7.97072 3.59995 8.77225C3.22942 9.57379 3.02609 10.4424 3.00235 11.3251C2.97861 12.2078 3.13497 13.0861 3.46189 13.9064C3.78881 14.7267 4.27943 15.4718 4.90381 16.0962L15.2929 26.4853C15.4804 26.6728 15.7348 26.7782 16 26.7782C16.2652 26.7782 16.5196 26.6728 16.7071 26.4853V26.4853Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Wishlist.defaultProps = defaultProps;

Wishlist.propTypes = proptypes;

export default Wishlist;
