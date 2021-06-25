import { Route, Switch } from "react-router";
import Footer from "./Components/Layouts/Footer/Footer";
import Header from "./Components/Layouts/Header/Header";
import Layout from "./Components/Layouts/Layout";
import PublicRoute from "./Components/Route/PublicRoute";
import PrivateRoute from "./Components/Route/PrivateRoute";

import Home from "./Pages/Home";
import ListAuction from "./Pages/ListAuction";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import UserDashboard from "./Pages/User/UserDashboard";
import UserAuction from "./Pages/User/UserAuction";
import Profile from "./Pages/User/Profile";
import CreateAuction from "./Pages/User/CreateAuction";
import UpdateAuction from "./Pages/User/UpdateAuction";
import DetailsAuction from "./Pages/DetailsAuction";

function App() {
  return (
    <Layout>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <PublicRoute
          restricted={true}
          path="/akun/masuk"
          component={LoginPage}
        />
        <PublicRoute
          path="/akun/daftar"
          restricted={true}
          component={RegisterPage}
        />
        <PrivateRoute path="/akun/dashboard" component={UserDashboard} />
        <PrivateRoute path="/akun/lelang" component={UserAuction} />
        <PrivateRoute path="/akun/buat-lelang" component={CreateAuction} />
        <PrivateRoute
          path="/akun/edit-lelang/:idAuction"
          component={UpdateAuction}
        />
        <PrivateRoute path="/akun/info" component={Profile} />
        <Route path="/lelang" component={ListAuction} />
        <Route path="/item/:itemId" component={DetailsAuction} />
      </Switch>
      <Footer />
    </Layout>
  );
}

export default App;
