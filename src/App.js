import './App.css';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminLayout from "./pages/admin/adminLayout";
import Dashboard from "./pages/admin/dashboard/dashboard";
import { image404, prestoMartLogo } from "./assets";
import Login from "./pages/auth/login";
import ProductsManagement from "./pages/admin/contentManagement/productsManagement/productsManagement";
import ContentManagementLayout from "./pages/admin/contentManagement/contentManagementLayout";
import CategoriesManagement from "./pages/admin/contentManagement/categoriesManagement/categoriesManagement";
import { NewProduct } from "./pages/admin/contentManagement/productsManagement/newProduct";
import { EditDetailsProduct } from "./pages/admin/contentManagement/productsManagement/editDetailsProduct";
import { NewCategory } from "./pages/admin/contentManagement/categoriesManagement/newCategory";
import { EditCategory } from "./pages/admin/contentManagement/categoriesManagement/editCategory";
import { NewSubcategory } from "./pages/admin/contentManagement/categoriesManagement/newSubcategory";
import { EditSubcategory } from "./pages/admin/contentManagement/categoriesManagement/editSubcategory";
import { EditMarketingProduct } from "./pages/admin/contentManagement/productsManagement/editMarketingProduct";
import React from "react";
import UserManagementLayout from "./pages/admin/userManagement/userManagementLayout";
import Order from './pages/admin/orderManagement/order';
import OrderManagementLayout from "./pages/admin/orderManagement/orderManagementLayout";
import OrderManagement from "./pages/admin/orderManagement/orderManagement";
import HistoryManagementLayout from "./pages/admin/historyManagement/historyManagementLayout";
import HistoryManagement from "./pages/admin/historyManagement/historyManagement";
import UserManagement from "./pages/admin/userManagement/userManagement";
import ContentManagement from "./pages/admin/contentManagement/contentManagement";
import LandingPage from "./pages/public/LandingPage";
import { LinkButton } from "./components/buttons";
import NewUser from "./pages/admin/userManagement/newUser";
import PublicLayout from "./pages/public/publicLayout";
import Cart from "./pages/public/carting/cart";
import CategoriesLayout from "./pages/public/categories/categoriesLayout";
import Categories from "./pages/public/categories/categories";
import Category from "./pages/public/categories/category";
import SubcategoriesLayout from "./pages/public/subcategories/subcategoriesLayout";
import Subcategories from "./pages/public/subcategories/subcategories";
import Subcategory from "./pages/public/subcategories/subcategory";
import ProductView from "./pages/public/categories/productView";
import { Checkout } from "./pages/public/carting/checkout";
import Search from "./pages/public/search";
import Signup from "./pages/auth/signup";
import UserLayout from "./pages/user/userLayout";
import Account from "./pages/user/account";
import UserOrders from "./pages/user/orders/orders";
import Saved from "./pages/user/saved";
import ScrollToTop from "./helpers/scrollToTop";
import Logout from "./helpers/logOut";
import {
  auth_url,
  coming_soon_url,
  login_url,
  logout_url,
  signup_url,
  user_accounts_url,
  user_address_book_url, user_order_view_url,
  user_orders_url,
  user_saved_items_url,
  user_url
} from "./helpers/strings";
import AddressBook from "./pages/user/addressBook";
import { UserOrderLayout } from "./pages/user/orders/userOrderLayout";
import { UserOrder } from "./pages/user/orders/userOrder";
import { NotFound } from "./pages/public/NotFound";

function App() {
  return (
    <>
      <ToastContainer />
      <ScrollToTop />

      <Routes>
        <Route path={"/"} element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path={"/home"} element={<LandingPage />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/checkout"} element={<Checkout />} />
          <Route path={"/search"} element={<Search />} />
          <Route path={"/product/:slug"} element={<ProductView path={true} />} />
          <Route path={"/home/product/:slug"} element={<ProductView path={true} />} />
          <Route path={"/categories"} element={<CategoriesLayout />}>
            <Route index element={<Categories />} />
            <Route path={"/categories/:category"} element={<Category />} />
            <Route path={"/categories/:category/product/:slug"} element={<ProductView />} />
          </Route>
          <Route path={"/categories/:category/subcategories"} element={<SubcategoriesLayout />}>
            <Route index element={<Subcategories />} />
            <Route path={"/categories/:category/subcategories/:subcategory"} element={<Subcategory />} />
            <Route path={"/categories/:category/subcategories/:subcategory/product/:slug"}
              element={<ProductView />} />
          </Route>
          <Route path={user_url} element={<UserLayout />}>
            <Route path={user_accounts_url} element={<Account />} />
            <Route path={user_orders_url} element={<UserOrderLayout />}>
              <Route index element={<UserOrders />} />
              <Route path={user_order_view_url} element={<UserOrder />} />
            </Route>
            <Route path={user_saved_items_url} element={<Saved />} />
            <Route path={user_address_book_url} element={<AddressBook />} />
          </Route>
          <Route path={login_url} element={<Login />} />
          <Route path={auth_url} element={<Login />} />
          <Route path={signup_url} element={<Signup />} />
          <Route path={logout_url} element={<Logout />} />

          <Route path={coming_soon_url} element={<ComingSoon />} />
          <Route path={"*"} element={<NotFound />} />
        </Route>

        <Route path={"/admin"} element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path={"/admin/content"} element={<ContentManagementLayout />}>
            <Route index element={<ContentManagement />} />
            <Route path={"/admin/content/products"} element={<ProductsManagement />}>
              <Route path={"/admin/content/products/new"} element={<NewProduct />} />
              <Route path={"/admin/content/products/edit-details/:slug"} element={<EditDetailsProduct />} />
              <Route path={"/admin/content/products/edit-marketing/:slug"}
                element={<EditMarketingProduct />} />
            </Route>
            <Route path={"/admin/content/categories"} element={<CategoriesManagement />}>
              <Route path={"/admin/content/categories/new"} element={<NewCategory />} />
              <Route path={"/admin/content/categories/edit/:product_category_id/subcategories/new"}
                element={<NewSubcategory />} />
              <Route path={"/admin/content/categories/edit/:id"} element={<EditCategory />} />
              <Route path={"/admin/content/categories/edit/:product_category_id/subcategories/edit/:id"}
                element={<EditSubcategory />} />
            </Route>
          </Route>
          <Route path={"/admin/orders"} element={<OrderManagementLayout />}>
            <Route index element={<OrderManagement />} />
          </Route>
          <Route path={"/admin/orders/:id"} element={<Order />} />
          <Route path={"/admin/users"} element={<UserManagementLayout />}>
            <Route index element={<UserManagement />} />
            <Route path={"/admin/users/new"} element={<NewUser />} />
          </Route>
          <Route path={"/admin/history"} element={<HistoryManagementLayout />}>
            <Route index element={<HistoryManagement />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

const Home = () => {

  return (
    <div className='body w-screen h-screen flex flex-col justify-center items-center'>
      <img src={prestoMartLogo.img} alt={prestoMartLogo.alt} />
      <br />
      <h2 className='text-white font-black text-4xl'>Coming Soon</h2>
    </div>
  );
}

const ComingSoon = () => {

  return (
    <div className='body h-screen flex flex-col justify-center items-center'>
      <img src={prestoMartLogo.img} alt={prestoMartLogo.alt} />
      <br />
      <h2 className='text-white font-black text-4xl'>Coming Soon</h2>
    </div>
  );
}
export default App;
