import { Route, Switch } from "react-router";
import Footer from "./Components/Layouts/Footer/Footer";
import Header from "./Components/Layouts/Header/Header";
import Layout from "./Components/Layouts/Layout";
import PublicRoute from "./Components/Route/PublicRoute";
import PrivateRoute from "./Components/Route/PrivateRoute";

import Home from "./Pages/Home";
import ListAuction from "./Pages/ListAuction";
import LoginPage from "./Pages/LoginPage";
import ProductDetail from "./Pages/ProductDetail";
import RegisterPage from "./Pages/RegisterPage";
import Profile from "./Pages/Profile";
import UserDashboard from "./Pages/UserDashboard";
import UserAuctionList from "./Pages/UserAuctionList";

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
        <PrivateRoute path="/akun/lelang" component={UserAuctionList} />
        <PrivateRoute path="/akun/info" component={Profile} />
        <Route path="/lelang" component={ListAuction} />
        <Route path="/produk/:prodId" component={ProductDetail} />
      </Switch>
      <Footer />
    </Layout>
  );
}

export default App;
