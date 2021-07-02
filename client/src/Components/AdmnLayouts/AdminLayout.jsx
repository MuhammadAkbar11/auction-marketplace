import React from "react";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

import AdminSidebar from "./AdminSidebar";
const AdminLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const handleToggle = e => {
    e.preventDefault();
    setShowSidebar(prev => (prev ? false : true));
  };

  const handleClose = e => {
    e.preventDefault();
    setShowSidebar(false);
  };
  return (
    <div className="adm-wrapper">
      <AdminHeader toggle={handleToggle} />
      <AdminSidebar show={showSidebar} handleClose={handleClose} />
      <main className="adm-main">
        <section className="adm-main-content"> {children}</section>
        <AdminFooter />
      </main>
    </div>
  );
};

export default AdminLayout;
