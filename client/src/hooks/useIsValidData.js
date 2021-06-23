import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { axiosConfigAuth } from "../utils/axiosConfig";

const useIsValidData = () => {
  const [isValid, setIsValid] = React.useState(false);

  const { userInfo } = useSelector(state => state.authUser);

  React.useEffect(() => {
    const checkValid = async () => {
      const config = axiosConfigAuth(userInfo.token);
      const isValid = await axios.get("/api/user/check-valid-data", config);
      setIsValid(isValid.data?.isValidData);
    };

    checkValid();

    return () => {};
  }, [userInfo]);

  return isValid;
};

export default useIsValidData;
