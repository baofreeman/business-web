import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Public from "./components/Layout/Public";
import Prefresh from "./features/Prefresh";
import LayoutTab from "./components/Layout/LayoutTab";
import Admin from "./page/Admin";
import Shop from "./page/Shop";
import Cart from "./page/Cart";
import CheckoutForm from "./components/form/checkoutForm/CheckoutForm";
import { ROLES } from "./config/roles";
import AllProduct from "./components/Shop/AllProduct";
import DetailItem from "./components/Shop/DetailItem";
import ListProduct from "./components/Shop/ListProduct";
import CheckoutSuccess from "./components/Checkout/CheckoutSuccess";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PersistLogin from "./components/Auth/PersistLogin";
import RequireAuth from "./components/Auth/RequireAuth";
import Products from "./components/Admin/Products/Products";
import AddProduct from "./components/Admin/Products/AddProduct";
import EditProduct from "./components/Admin/Products/EditProduct";
import Users from "./components/Admin/User/Users";
import Order from "./components/Admin/Orders/Order";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route element={<PersistLogin />}>
            <Route element={<Prefresh />}>
              <Route element={<LayoutTab />}>
                {/* Admin */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
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
                      <Route index element={<Order />} />
                    </Route>
                    <Route path="users">
                      <Route index element={<Users />} />
                    </Route>
                  </Route>
                </Route>

                {/* Shop */}
                <Route path="/shop" element={<Shop />}>
                  <Route index element={<AllProduct />} />
                  <Route path="product" element={<DetailItem />} />
                  <Route path=":category" element={<ListProduct />} />
                </Route>
                <Route path="/cart">
                  <Route index element={<Cart />} />
                </Route>

                {/* Checkout */}
                <Route path="/checkout">
                  <Route index element={<CheckoutForm />} />
                  <Route path="success" element={<CheckoutSuccess />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
