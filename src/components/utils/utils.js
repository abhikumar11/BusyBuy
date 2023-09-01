import data from "../../ProductData";
import {doc,writeBatch,query,where,getDoc,collection, getDocs} from "firebase/firestore";
import {db}from "../../FirebaseConfig";

const addData=async()=>{
    try {
        const batch=writeBatch(db);
        data.product.forEach((product)=>{
            const docRef=doc(db,"products",product.id.toString());
            batch.set(docRef,product);
        });
        const res = await batch.commit();
    } catch (error) {
        console.log(error);
    }
}

const getProductById=async(cart)=>{
    try {
        const pid=Object.keys(cart).map(String);
        
        if(!pid.length){
            return false;
        }
        const productRef=collection(db,"products");
        const productSnapshot=await getDocs(query(productRef,where("id","in",pid)));
        const productData=productSnapshot.docs.map((doc)=>({
            ...doc.data(),
            date:cart?.date,
            quantity:cart[doc.data().id],
        }));
        return productData;
    } catch (error) {
        console.log(error);
    }
}
const convertDate=(date)=>{
    return new Date(date).toISOString().split("T")[0];
}
const getUserCartProducts = async (uid) => {
    const docRef = doc(db, "usersCarts", uid);
    const docSnap = await getDoc(docRef);
    return { docRef, data: docSnap.data() };
  };
export {addData,getProductById,getUserCartProducts,convertDate};