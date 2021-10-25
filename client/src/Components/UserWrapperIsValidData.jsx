import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsAction } from "../actions/user.actions";
import useIsValidData from "../hooks/useIsValidData";
import ModalInvalidData from "./ModalInvalidData";

const UserWrapperIsValidData = ({ children }) => {
  const [modal, setModal] = React.useState({
    show: false,
  });
  const [invalid, setInvalid] = React.useState(false);

  /*

title: "Akses ditolak!",
  message: "Silahkan lengkapi data diri anda untuk melajutkan!",
  linkTo: "/akun/info",
  linkText: "Lengkapi data diri",

*/
  const dispatch = useDispatch();
  const [isValidData, loadingValidData] = useIsValidData();
  const userDetailsState = useSelector(state => state.userDetails);

  React.useEffect(() => {
    dispatch(getUserDetailsAction());
  }, [dispatch]);

  React.useEffect(() => {
    const userBankAccounts = userDetailsState?.details.akun_bank;
    if (!isValidData) {
      setInvalid(true);
      setModal({
        show: true,
      });
    } else {
      if (userBankAccounts?.length === 0) {
        setInvalid(true);
        setModal({
          show: true,
          title: "Daftar nomor rekening masih kosong!",
          message:
            "Silahkan daftarkan nomor rekening anda supaya dapat melanjutkan proses ini!",
          linkTo: "/akun/info#bank-accounts",
          linkText: "Daftar nomor rekening",
        });
      } else {
        setInvalid(false);
      }
    }

    return () => {
      setModal(false);
    };
  }, [isValidData, userDetailsState]);
  return !invalid ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <>
      {!loadingValidData ? (
        <ModalInvalidData
          show={modal.show}
          title={modal?.title || null}
          message={modal?.message || null}
          linkTo={modal?.linkTo || null}
          linkText={modal?.linkText || null}
        />
      ) : null}
    </>
  );
};

export default UserWrapperIsValidData;
