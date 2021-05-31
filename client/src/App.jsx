import { Route, Switch } from "react-router";
import Footer from "./Components/Layouts/Footer/Footer";
import Header from "./Components/Layouts/Header/Header";
import Layout from "./Components/Layouts/Layout";

import Home from "./Pages/Home";
import ListAuction from "./Pages/ListAuction";

function App() {
  return (
    <Layout>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/lelang" component={ListAuction} />
      </Switch>
      <Footer />
    </Layout>
  );
}

export default App;
