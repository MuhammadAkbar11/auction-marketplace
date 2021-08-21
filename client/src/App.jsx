import { Route, Switch } from "react-router";

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

import AdminPublicRoute from "./Components/Route/AdminPublicRoute";
import AdminLoginPage from "./Pages/Admin/AdminLoginPage";
import AdminPrivateRoute from "./Components/Route/AdminPrivateRoute";
import Dashboard from "./Pages/Admin/Dashboard";
import AdminKategori from "./Pages/Admin/Kategori";
import Users from "./Pages/Admin/Users";
import AdminComingSoon from "./Pages/Admin/AdminComingSoon";
import MyBid from "./Pages/User/MyBid";
import TransactionRepot from "./Pages/Admin/TransactionRepot";
import ConfirmWinning from "./Pages/User/ConfirmWinning";
import UserConfirmAuctionBill from "./Pages/User/UserConfirmAuctionBill";
import UserPayment from "./Pages/User/UserPayment";
import SellerConfirmPayment from "./Pages/User/SellerConfirmPayment";
import UserPaymentResult from "./Pages/User/UserPaymentResult";
import UserEmptyPage from "./Pages/User/UserEmptyPage";
import UserChangPassword from "./Pages/User/UserChangPassword";
import ListAuctionByCategory from "./Pages/ListAuctionByCategory";
import ListLatestAuctionPage from "./Pages/ListLatestAuction";
import PageNotFound from "./Pages/404";

function App() {
  return (
    <>
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
        <PrivateRoute
          path="/akun/konfirmasi-tagihan/:invoiceId"
          component={UserConfirmAuctionBill}
        />
        <PrivateRoute
          path="/akun/konfirmasi-pembayaran/:invoiceId"
          component={SellerConfirmPayment}
        />
        <PrivateRoute path="/akun/lelang" component={UserAuction} />
        <PrivateRoute
          path="/akun/pembelian/konfirmasi/:invoiceId"
          component={ConfirmWinning}
        />
        <PrivateRoute
          path="/akun/result-pembayaran"
          component={UserPaymentResult}
        />
        <PrivateRoute
          path="/akun/pembayaran/:invoiceId"
          component={UserPayment}
        />
        <PrivateRoute path="/akun/pembelian" component={MyBid} />

        <PrivateRoute path="/akun/buat-lelang" component={CreateAuction} />
        <PrivateRoute
          path="/akun/edit-lelang/:idAuction"
          component={UpdateAuction}
        />
        <PrivateRoute path="/akun/empty" component={UserEmptyPage} />
        <PrivateRoute
          path="/akun/ubah-password"
          component={UserChangPassword}
        />
        <PrivateRoute path="/akun/info" component={Profile} />
        <Route path="/kategori/:slug" component={ListAuctionByCategory} />
        <Route path="/lelang-terbaru" component={ListLatestAuctionPage} />
        <Route path="/lelang" component={ListAuction} />
        <Route path="/item/:itemId" component={DetailsAuction} />
        {/* Admin */}
        {/* <AdminP */}
        <AdminPublicRoute
          path="/administrator/login"
          restricted={true}
          component={AdminLoginPage}
        />
        <AdminPrivateRoute
          path="/administrator/dashboard"
          component={Dashboard}
        />
        <AdminPrivateRoute
          path="/administrator/kategori"
          component={AdminKategori}
        />
        <AdminPrivateRoute path="/administrator/anggota" component={Users} />
        <AdminPrivateRoute
          path="/administrator/lelang"
          component={AdminComingSoon}
        />
        <AdminPrivateRoute
          path="/administrator/laporan-transaksi"
          component={TransactionRepot}
        />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
