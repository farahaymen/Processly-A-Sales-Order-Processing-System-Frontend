import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../store/authContext";
import Loading from "../../components/media/Loading";
import OrderDetailsForm from "../../components/orders/OrderDetailsForm";

const OrderDetailsPage = () => {
  const authContext = useContext(AuthContext);
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // use the useParams hook in React Router to allow us to access dynamic segments in our dynamic route
  const params = useParams();
  // our dynamic segment was called orderId, so we can access it as follows:
  const orderId = params.orderId;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // source: https://bobbyhadz.com/blog/react-sleep-function

  const content = (isLoading, order) => {
    if (isLoading) {
      return <Loading />;
    }
    if (!order) {
      return <h1 className="order-not-found">Order Not Found...</h1>;
    }
    return <OrderDetailsForm order={order} />;
  };

  // now simply use useEffect to fetch the order's data
  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchOrderDetails = async () => {
      try {
        await sleep(1000);
        const response = await fetch(
          `https://processly.azurewebsites.net/orders?orderId=${orderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `BEARER ${authContext.token}`,
            },
            signal: fetchSignal,
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw Error(data.error);
        }
        console.log("data returned in orderDetailsPage:", data);
        setOrder(data.orders);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchOrderDetails();
    return () => {
      fetchAbortController.abort();
    };
  }, []);

  return <div className="row-center-content">{content(isLoading, order)}</div>;
};

export default OrderDetailsPage;
