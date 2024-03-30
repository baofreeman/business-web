import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Public from "./components/Layout/Public";
import AddProduct from "./components/TabAdmin/Products/AddProduct";
import EditProduct from "./components/TabAdmin/Products/EditProduct";
import Prefresh from "./features/Prefresh";
import LayoutTab from "./components/Layout/LayoutTab";
import Admin from "./page/Admin";
import Shop from "./page/Shop";
import Products from "./components/TabAdmin/Products/Products";
import TabsList from "./components/TabShop/TabList";
import Cart from "./page/Cart";
import CheckoutForm from "./components/form/checkoutForm/CheckoutForm";
import Order from "./components/TabAdmin/Orders/Order";
import CheckoutSuccess from "./components/TabCheckout/CheckoutSuccess";
import TabAllProduct from "./components/TabShop/TabAllProduct";
import Register from "./components/TabUser/Register";
import Login from "./components/TabUser/Login";
import { ROLES } from "./config/roles";
import RequireAuth from "./components/TabUser/RequireAuth";
import PersistLogin from "./components/TabUser/PersistLogin";
import TabDetail from "./components/TabShop/TabDetail";
import Users from "./components/TabAdmin/User/Users";

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
                  <Route index element={<TabAllProduct />} />
                  <Route path="product" element={<TabDetail />} />
                  <Route path=":category" element={<TabsList />} />
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
