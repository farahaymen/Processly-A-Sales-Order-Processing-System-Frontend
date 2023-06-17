import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "./store/AuthProvider";
import PrivateRoutes from "./components/auth/PrivateRoutes";

import Layout from "./UI/layout/Layout";

import HomePage from "./pages/client/HomePage";
import MakeAnOrderPage from "./pages/client/MakeAnOrderPage";
import ViewOrdersPage from "./pages/client/ViewOrdersPage";
import OrderDetailsPage from "./pages/client/OrderDetailsPage";
import AboutPage from "./pages/client/AboutPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

import StHomePage from "./pages/st/StHomePage";
import StUpdateOrderStatus from "./pages/st/StUpdateOrderStatus";
import StGenerateReport from "./pages/st/StGenerateReport";

import WhHomePage from "./pages/wh/WhHomePage";
import WhAddProduct from "./pages/wh/WhAddProduct";
import WhGetProducts from "./pages/wh/WhGetProducts";
import WhUpdateProduct from "./pages/wh/WhUpdateProduct";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<PrivateRoutes role="client" />}>
              <Route path="/orders/make" element={<MakeAnOrderPage />} />
              <Route path="/orders/view" element={<ViewOrdersPage />} />
              <Route
                path="/orders/view/:orderId"
                element={<OrderDetailsPage />}
              />
            </Route>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route element={<PrivateRoutes role="st" />}>
              <Route path="/st" element={<StHomePage />} />
              <Route
                path="/st/update-order-status"
                element={<StUpdateOrderStatus />}
              />
              <Route
                path="/st/generate-report"
                element={<StGenerateReport />}
              />
              <Route
                path="/st/update-order-status/:orderId"
                element={<OrderDetailsPage />}
              />
            </Route>
            <Route path="/st/signin" element={<SigninPage />} />

            <Route element={<PrivateRoutes role="wh" />}>
              <Route path="/wh/" element={<WhHomePage />} />
              <Route path="/wh/add-product" element={<WhAddProduct />} />
              <Route path="/wh/get-products" element={<WhGetProducts />} />
              <Route path="/wh/update-product" element={<WhUpdateProduct />} />
            </Route>
            <Route path="/wh/signin" element={<SigninPage />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="bottom-center"
          className="toast-position"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
