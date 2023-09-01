import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import SignUpPage from './components/SignUp/SignUpPage';
import LoginPage from './components/Login/LoginPage';
import CartPage from './components/Cart/CartPage';
import OrderPage from './components/Order/OrderPage/OrderPage';
import ErrorPage from './components/Error/ErrorPage';
import {getAuth,onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import AuthContext from './context/Auth/AuthContex';
import ProductContextProvider from './context/Product/ProductState';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 
  const auth = getAuth();
  const { setAuthUser } = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      }
    });
  }, []);

  return (
    <div className="App">
      <ProductContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/signup" exact element={<SignUpPage />} />
          <Route path="/signin" exact element={<LoginPage />} />
          <Route path="/cart" exact element={<CartPage />} />
          <Route path="/myorders" exact element={<OrderPage />} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </ProductContextProvider>
    </div>
  );
}

export default App;
