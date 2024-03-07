import React from "react";
import { Link } from "react-router-dom";

const PublicAdmin = () => {
  return (
    <div>
      <Link to={"/admin/products"}>Product</Link>
      <Link>User</Link>
      <Link>Order</Link>
    </div>
  );
};

export default PublicAdmin;
