import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { axiosConfigAuth } from "../utils/axiosConfig";

const useIsValidData = () => {
  const [isValid, setIsValid] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { userInfo } = useSelector(state => state.authUser);

  React.useEffect(() => {
    setLoading(true);
    const checkValid = async () => {
      const config = axiosConfigAuth(userInfo.token);
      const isValid = await axios.get("/api/user/check-valid-data", config);
      setIsValid(isValid.data?.isValidData);
      setLoading(false);
    };

    checkValid();
  }, [userInfo]);

  return [isValid, loading];
};

export default useIsValidData;
