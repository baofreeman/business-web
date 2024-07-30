import { Routes, Route } from "react-router-dom";
import { ROLES } from "./config/roles";
import MiddlewareAuth from "./middlewares/MiddlewareAuth";

import { Admin, Cart, NotFound, Shop } from "./page/index";
import {
  AddProduct,
  EditProduct,
  Products,
  Orders,
  Users,
} from "./components/Admin/index";
import {
  ChangePassword,
  Login,
  Register,
  ResetPasswordConfirm,
  ResetPasswordLink,
  VerifyEmail,
  RequireAuth,
} from "./components/Auth/index";
import { Layout, LayoutTab, Public } from "./components/Layout/index";
import {
  AllProduct,
  ListProduct,
  FilterProducts,
} from "./components/Shop/index";

import { CheckoutDetail, CheckoutSuccess } from "./components/Checkout/index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<MiddlewareAuth />}>
            <Route index element={<Public />} />
            <Route path="/account/register" element={<Register />}></Route>
            <Route path="/account/login" element={<Login />}></Route>
            <Route
              path="/account/verify-email"
              element={<VerifyEmail />}
            ></Route>
            <Route
              path="/account/reset-password-link"
              element={<ResetPasswordLink />}
            ></Route>
            <Route
              path="/account/reset-password-confirm/:id/:token"
              element={<ResetPasswordConfirm />}
            ></Route>
            <Route
              path="/account/change-password"
              element={<ChangePassword />}
            ></Route>

            {/* <Route element={<Prefresh />}> */}
            <Route element={<LayoutTab />}>
              {/* Admin */}
              <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                <Route path="/admin" element={<Admin />}>
                  <Route index element={<Products />} />
                  <Route path="products">
                    <Route index element={<Products />} />
                    <Route path="create-product" element={<AddProduct />} />
                    <Route
                      path="edit-product/:productId"
                      element={<EditProduct />}
                    />
                  </Route>
                  <Route path="orders">
                    <Route index element={<Orders />} />
                  </Route>
                  <Route path="users">
                    <Route index element={<Users />} />
                  </Route>
                </Route>
              </Route>

              {/* Shop */}
              <Route path="/shop" element={<Shop />}>
                <Route index element={<AllProduct />} />
                <Route path=":category" element={<ListProduct />} />
                <Route path="filter" element={<FilterProducts />} />
                {/* <Route path="product" element={<DetailItem />} /> */}
              </Route>
              <Route path="/cart">
                <Route index element={<Cart />} />
              </Route>

              {/* Checkout */}
              <Route path="/checkout">
                <Route index element={<CheckoutDetail />} />
                <Route path="success" element={<CheckoutSuccess />} />
              </Route>
            </Route>
          </Route>
          {/**Public Routes */}
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* </Route> */}
      </Routes>
    </>
  );
}
export default App;
