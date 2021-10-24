import React from "react";

const auction = ({ size }) => {
  return (
    <svg
      width={`${size}`}
      height={`${size - 5}`}
      viewBox="0 0 80 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.7045 39.7502C35.4307 41.5388 35.0533 43.6457 33.5485 45.1279L31.3885 47.2552C30.3465 48.2816 28.9583 48.8171 27.5584 48.8529C26.1583 48.8887 24.7464 48.4248 23.6569 47.4529L10.1072 35.3662C7.9282 33.4224 7.85094 30.1707 9.93486 28.1179L12.095 25.9902C13.5995 24.5082 15.8257 24.0504 17.7676 24.6418L32.5375 10.0933C31.8112 8.30477 32.1888 6.19801 33.6934 4.71579L35.8536 2.58805C37.9375 0.535382 41.4062 0.446519 43.5852 2.39045L57.1348 14.4774C59.3139 16.4212 59.3911 19.6728 57.3071 21.7258L55.1471 23.8531C54.105 24.8795 52.7168 25.415 51.3169 25.4508C50.6954 25.4667 50.0715 25.3836 49.4745 25.2018L47.057 27.583L76.3243 50.4978C78.3623 52.0934 79.6143 54.4373 79.7593 56.9284C79.9043 59.4196 78.9323 61.8878 77.0925 63.7001C75.3238 65.4422 72.8693 66.4636 70.3174 66.5289C70.2149 66.5315 70.1124 66.5325 70.0097 66.5322C67.3481 66.5198 64.7885 65.4638 62.9873 63.6347L37.1219 37.369L34.7045 39.7502ZM16.5872 28.9839C16.4313 28.8448 16.2296 28.7786 16.0296 28.7837C15.8297 28.7889 15.6311 28.8653 15.4825 29.012L13.3225 31.1396C13.0249 31.4327 13.0359 31.8974 13.3471 32.175L26.8968 44.2618C27.208 44.5394 27.7036 44.5269 28.0013 44.2334L30.1613 42.1061C30.4589 41.8129 30.4479 41.3482 30.1367 41.0706L16.5872 28.9839ZM35.5594 13.475L21.5204 27.3035L31.6826 36.3687L45.7217 22.5401L35.5594 13.475ZM50.655 20.8597C50.9664 21.1375 51.462 21.1246 51.7595 20.8313L53.9195 18.704C54.2172 18.4108 54.2062 17.9461 53.8949 17.6685L40.3455 5.58175C40.1896 5.44273 39.9878 5.37653 39.7879 5.38164C39.5879 5.38676 39.3894 5.46319 39.2408 5.60986L37.0808 7.73745C36.7831 8.03064 36.7942 8.49529 37.1054 8.77292L50.655 20.8597ZM66.4384 60.6446C67.38 61.6008 68.6649 62.1309 70.0563 62.1374C71.4471 62.1424 72.7436 61.6257 73.7051 60.6784C74.6668 59.731 75.1547 58.4921 75.0789 57.1898C75.0031 55.8876 74.3747 54.7109 73.3094 53.8769L52.2021 37.3509L47.7845 41.7021L66.4384 60.6446ZM44.6062 38.4746L48.6058 34.5352L43.8104 30.7807L40.3683 34.1712L44.6062 38.4746Z"
        fill="currentColor"
      />
      <path
        d="M2.34373 70.6055H4.68748V68.4082C4.68748 64.7735 7.8417 61.8164 11.7187 61.8164H27.3437C31.2208 61.8164 34.375 64.7735 34.375 68.4082V70.6055H36.7187C38.0131 70.6055 39.0625 71.5893 39.0625 72.8027C39.0625 74.0162 38.0131 75 36.7187 75H2.34373C1.04936 75 -1.52588e-05 74.0162 -1.52588e-05 72.8027C-1.52588e-05 71.5893 1.04936 70.6055 2.34373 70.6055ZM9.37498 70.6055H29.6875V68.4082C29.6875 67.1966 28.6361 66.2109 27.3437 66.2109H11.7187C10.4264 66.2109 9.37498 67.1966 9.37498 68.4082V70.6055Z"
        fill="currentColor"
      />
      <path
        d="M22.1687 52.873V57.2675C22.1687 58.481 21.0898 59.4648 19.759 59.4648C18.4283 59.4648 17.3494 58.481 17.3494 57.2675V52.873C17.3494 51.6595 18.4283 50.6757 19.759 50.6757C21.0898 50.6757 22.1687 51.6595 22.1687 52.873Z"
        fill="currentColor"
      />
      <path
        d="M12.1962 52.1788L13.4008 56.5733C13.7163 57.7245 13.2047 58.9689 12.258 59.3527C12.0685 59.4295 11.8758 59.4659 11.6865 59.4659C10.93 59.4659 10.2249 58.8835 9.97246 57.9629L8.76789 53.5683C8.45241 52.4171 8.96399 51.1727 9.91067 50.7889C10.8571 50.4054 11.8805 51.0275 12.1962 52.1788Z"
        fill="currentColor"
      />
      <path
        d="M28.6436 50.7893C29.5902 51.1731 30.1018 52.4173 29.7863 53.5687L28.5818 57.9632C28.3293 58.884 27.6245 59.4663 26.8678 59.4663C26.6784 59.4663 26.4857 59.4298 26.2962 59.3531C25.3495 58.9693 24.8379 57.725 25.1534 56.5737L26.358 52.1791C26.6737 51.0275 27.697 50.4049 28.6436 50.7893Z"
        fill="currentColor"
      />
    </svg>
  );
};

auction.defaultProps = {
  size: 80,
};
export default auction;