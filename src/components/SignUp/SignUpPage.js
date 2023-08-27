import React,{useRef,useEffect,useContext}from 'react'
import styles from "./signuppage.module.css";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import AuthContext from '../../context/Auth/AuthContex';

const SignUpPage = () => {
  const{user,loading,error,message,signup,clearError} =useContext(AuthContext);
  const isAuth=user;
  const navigate=useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  useEffect(()=>{
    if(isAuth){
      navigate("/");
    }
    if(error){
        toast.error(error);
        clearError();
    }
  },[error,user,message]);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value; 
        if (email===""||name===""||password===""||password.length<8) {
          return toast.error("Please enter valid data!");
        }
        await signup({name:name,email:email,password:password});
    }
  return (
     <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.loginTitle}>Sign Up</h2>
        <input type="text" className={styles.loginInput} ref={nameRef} name="name" placeholder="Enter Name"/>
        <input type="email" className={styles.loginInput} ref={emailRef} name="email" placeholder="Enter Email"/>
        <input type="password" className={styles.loginInput} ref={passwordRef} name="password" placeholder="Enter Password"/>
        <button className={styles.loginBtn}>{loading?"...":"Sign Up"}</button>
      </form>
     </div>
  )
}

export default SignUpPage;