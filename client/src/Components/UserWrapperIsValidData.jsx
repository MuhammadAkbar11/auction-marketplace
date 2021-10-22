import React from "react";
import useIsValidData from "../hooks/useIsValidData";
import ModalInvalidData from "./ModalInvalidData";
import Loader from "./UI/Loader";

const UserWrapperIsValidData = ({ children }) => {
  const [modal, setModal] = React.useState(false);

  const [isValidData, loadingValidData] = useIsValidData();

  React.useEffect(() => {
    if (!isValidData) {
      setModal(true);
    }

    return () => {
      setModal(false);
    };
  }, [isValidData]);

  return isValidData ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <>{!loadingValidData ? <ModalInvalidData /> : null}</>
  );
};

export default UserWrapperIsValidData;
