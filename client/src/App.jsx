import { Route, Switch } from "react-router";
import Header from "./Components/Layouts/Header/Header";
import Layout from "./Components/Layouts/Layout";

import Home from "./Pages/Home";
// import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route component={Home} />
      </Switch>
    </Layout>
  );
}

export default App;
