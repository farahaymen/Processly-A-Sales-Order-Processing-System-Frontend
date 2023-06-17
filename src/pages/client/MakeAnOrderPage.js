import { useState, useEffect, useContext } from "react";

import AuthContext from "../../store/authContext";
import MakeOrderForm from "../../components/orders/MakeOrderForm";
import Loading from "../../components/media/Loading";

const MakeOrder = () => {
  const authContext = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // source: https://bobbyhadz.com/blog/react-sleep-function

  const content = (isLoading, products) => {
    if (isLoading) {
      return <Loading />;
    }

    return <MakeOrderForm products={products} />;
  };

  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchProducts = async () => {
      try {
        await sleep(1000);
        const response = await fetch(
          "https://processly.azurewebsites.net/products",
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

        setProducts(data.products);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProducts();

    return () => {
      fetchAbortController.abort();
    };
  }, [authContext.token]);

  return (
    <div className="row-center-content">{content(isLoading, products)}</div>
  );
};

export default MakeOrder;
