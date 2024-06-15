import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Error from "./pages/error";
import Checkout from "./pages/checkout";
import OrderStatus from "./pages/order-status";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/order-status",
    element: <OrderStatus />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
