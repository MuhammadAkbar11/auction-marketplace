import React from "react";
import BreadcrumbsContainer from "../../Components/Layouts/BreadcrumbsContainer";
import CategoryTab from "../../Components/UserCreateAuction/CategoryTab";
import DescProductTab from "../../Components/UserCreateAuction/DescProductTab";
import PriceAndTimeTab from "../../Components/UserCreateAuction/PriceAndTimeTab";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetailsAction,
  userProfileError,
} from "../../actions/user.actions";
import { checkProperties } from "../../utils/checkObj";

const CreateAuction = props => {
  const { location, history } = props;

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.authUser);
  const userDetails = useSelector(state => state.userDetails);
  const [activeTab, setActiveTab] = React.useState("default");

  React.useEffect(() => {
    if (!userInfo) {
      history.push("/akun/masuk");
      return;
    } else {
      dispatch(getUserDetailsAction());
    }
  }, [userInfo]);

  let tabContent = null;

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");

    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab("default");
    }
  }, [location]);

  const isValidData = checkProperties(userDetails.details);

  React.useEffect(() => {
    if (!isValidData) {
      history.push("/akun/info");
      dispatch(
        userProfileError("USER_UPDATE_PROFILE_FAIL", {
          message: "Silahkan lengkapi data diri anda",
        })
      );
    }
  }, [isValidData]);

  switch (activeTab) {
    case "kategori":
      tabContent = <CategoryTab />;
      break;
    case "deskripsi":
      tabContent = <DescProductTab />;
      break;
    case "harga-dan-durasi":
      tabContent = <PriceAndTimeTab />;
      break;
    default:
      tabContent = <CategoryTab />;
      break;
  }

  return (
    <>
      <BreadcrumbsContainer
        items={[
          { title: "Home", url: "/" },
          { title: "Membuat lelang", active: true },
        ]}
      />
      <section>{tabContent}</section>
    </>
  );
};

export default CreateAuction;
