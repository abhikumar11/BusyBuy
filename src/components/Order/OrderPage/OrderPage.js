import React, { useState, useEffect, useContext } from "react";
import { db } from "../../../FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import AuthContext from "../../../context/Auth/AuthContex";
import { getProductById } from "../../utils/utils";
import Loader from "../../UI/Loader/Loader";
import styles from "./orderpage.module.css";
import { toast } from "react-toastify";
import OrderTable from "../OrderTable/OrderPage";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  // Fetch user orders from firestore
  const getOrders = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "userOrders", user.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      // Display error message if no orders found
      if (!data) {
        return toast.error("No Orders Found!");
      }

      // Array to store promises
      let promiseArray = [];

      // For each order call the getProductsUsingProductIds() and store the promise in the array
      data.orders.forEach((order) => {
        promiseArray.push(
          new Promise((resolve, reject) => {
            const data = getProductById(order);
            if (data) resolve(data);
            else reject("Something went wrong");
          })
        );
      });

      // Resolve all promises and store them in the final orders array
      const finalOrders = await Promise.all(promiseArray);
      setOrders(finalOrders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!loading && !orders.length)
    return <h1 style={{ textAlign: "center" }}>No Orders Found!</h1>;

  return (
    <div className={styles.ordersContainer}>
      <h1>Your Orders</h1>
      {orders.map((order, idx) => {
        return <OrderTable order={order} key={idx} />;
      })}
    </div>
  );
};

export default OrderPage;
