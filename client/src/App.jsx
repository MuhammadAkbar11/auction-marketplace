import { Route, Switch } from "react-router";
import Footer from "./Components/Layouts/Footer/Footer";
import Header from "./Components/Layouts/Header/Header";
import Layout from "./Components/Layouts/Layout";
import PublicRoute from "./Components/Route/PublicRoute";

import Home from "./Pages/Home";
import ListAuction from "./Pages/ListAuction";
import LoginPage from "./Pages/LoginPage";
import ProductDetail from "./Pages/ProductDetail";
import RegisterPage from "./Pages/RegisterPage";

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
        <Route path="/lelang" component={ListAuction} />
        <Route path="/produk/:prodId" component={ProductDetail} />
      </Switch>
      <Footer />
    </Layout>
  );
}

export default App;
