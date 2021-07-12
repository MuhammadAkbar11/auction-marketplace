import React from "react";

const useKeepDigits = value => {
  const [digits, setDigits] = React.useState("");

  React.useEffect(() => {
    if (value) {
      setDigits(value.replace(/[^\d]/g, ""));
    }
  }, [value]);

  return [+digits];
};

export default useKeepDigits;
