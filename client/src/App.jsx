import { Route, Switch } from "react-router";
import Footer from "./Components/Layouts/Footer/Footer";
import Header from "./Components/Layouts/Header/Header";
import Layout from "./Components/Layouts/Layout";

import Home from "./Pages/Home";

function App() {
  return (
    <Layout>
      <Header />
      <Switch>
        <Route component={Home} />
      </Switch>
      <Footer />
    </Layout>
  );
}

export default App;
