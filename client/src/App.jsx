import { Route, Switch } from "react-router";

import PublicRoute from "./Components/Route/PublicRoute";
import PrivateRoute from "./Components/Route/PrivateRoute";

import Home from "./Pages/Home";
import ListAuction from "./Pages/ListAuction";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import UserDashboard from "./Pages/User/UserDashboard";
import SellerUserAuction from "./Pages/User/SellerUserAuction";
import UserProfile from "./Pages/User/UserProfile";
import SellerCreateAuction from "./Pages/User/SellerCreateAuction";
import SellerUpdateAuction from "./Pages/User/SellerUpdateAuction";
import DetailsAuction from "./Pages/DetailsAuction";

import AdminPublicRoute from "./Components/Route/AdminPublicRoute";
import AdminLoginPage from "./Pages/Admin/AdminLoginPage";
import AdminPrivateRoute from "./Components/Route/AdminPrivateRoute";
import Dashboard from "./Pages/Admin/Dashboard";
import AdminKategori from "./Pages/Admin/Kategori";
import Users from "./Pages/Admin/Users";
// import AdminComingSoon from "./Pages/Admin/AdminComingSoon";
import UserBids from "./Pages/User/UserBids";
import TransactionRepot from "./Pages/Admin/TransactionRepot";
import UserConfirmWinning from "./Pages/User/UserConfirmWinning";
import SellerConfirmAuctionBill from "./Pages/User/SellerConfirmAuctionBill";
import UserPayment from "./Pages/User/UserPayment";
import SellerConfirmPayment from "./Pages/User/SellerConfirmPayment";
import UserPaymentResult from "./Pages/User/UserPaymentResult";
import UserEmptyPage from "./Pages/User/UserEmptyPage";
import UserChangPassword from "./Pages/User/UserChangPassword";
import ListAuctionByCategory from "./Pages/ListAuctionByCategory";
import ListLatestAuctionPage from "./Pages/ListLatestAuction";
import PageNotFound from "./Pages/404";
import AboutUs from "./Pages/AboutUs";
import ComingSoon from "./Pages/ComingSoon";
import Contacts from "./Pages/Contact";
import AdminAuctions from "./Pages/Admin/Auctions";
import SellerConfirmShipping from "./Pages/User/SellerConfirmShipping";
import UserTrackShipping from "./Pages/User/UserTrackShipping";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tentang-kami" component={AboutUs} />
        <Route path="/kontak" component={Contacts} />
        <Route path="/syarat-dan-ketentuan" component={ComingSoon} />
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

        {/* Seller */}
        <PrivateRoute
          path="/akun/konfirmasi-tagihan/:invoiceId"
          component={SellerConfirmAuctionBill}
        />
        <PrivateRoute
          path="/akun/konfirmasi-pembayaran/:invoiceId"
          component={SellerConfirmPayment}
        />
        <PrivateRoute
          path="/akun/konfirmasi-pengiriman/:invoiceId"
          component={SellerConfirmShipping}
        />
        <PrivateRoute path="/akun/lelang" component={SellerUserAuction} />
        <PrivateRoute
          path="/akun/buat-lelang"
          component={SellerCreateAuction}
        />
        <PrivateRoute
          path="/akun/edit-lelang/:idAuction"
          component={SellerUpdateAuction}
        />
        {/* User */}
        <PrivateRoute
          path="/akun/pembelian/lihat-pengiriman/:invoiceId"
          component={UserTrackShipping}
        />
        <PrivateRoute
          path="/akun/pembayaran/:invoiceId"
          component={UserPayment}
        />
        <PrivateRoute
          path="/akun/result-pembayaran"
          component={UserPaymentResult}
        />
        <PrivateRoute
          path="/akun/pembelian/konfirmasi/:invoiceId"
          component={UserConfirmWinning}
        />
        <PrivateRoute path="/akun/pembelian" component={UserBids} />
        <PrivateRoute
          path="/akun/ubah-password"
          component={UserChangPassword}
        />
        <PrivateRoute path="/akun/info" component={UserProfile} />
        <PrivateRoute path="/akun/dashboard" component={UserDashboard} />
        <PrivateRoute path="/akun/empty" component={UserEmptyPage} />

        <Route path="/kategori/:slug" component={ListAuctionByCategory} />
        <Route path="/lelang-terbaru" component={ListLatestAuctionPage} />
        <Route path="/lelang" component={ListAuction} />
        <Route path="/item/:itemId" component={DetailsAuction} />

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
          component={AdminAuctions}
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
