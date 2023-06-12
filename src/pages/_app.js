import '@/styles/globals.css'
import { useState , useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// React top loading bar
import LoadingBar from 'react-top-loading-bar'

// React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {

  const router = useRouter();

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({value: null})
  const [key, setKey] = useState(0)

  const [message, setMessage] = useState('')
  const [generatedImages, setGeneratedImages] = useState([])
  const [allGeneratedImages, setAllGeneratedImages] = useState([])


  //  react top loading bar
  const [progress, setProgress] = useState(0)

  //  Use Effect for retain same items in shopping Cart
  useEffect(() => {
    
    router.events.on('routeChangeStart', ()=>{
      setProgress(75);
    });
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100);
    }, []);


    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }

    let myUser = JSON.parse(localStorage.getItem("myUser"));
    if( myUser ){
      setUser({value: myUser.token , email: myUser.email, name: myUser.name });
      setKey(Math.random());
    }

  }, [router.query])

  
  // Logout function
  const logout = ()=>{
    localStorage.removeItem("myUser");
    setUser({value:null});
    setKey(Math.random());
    router.push(`/login`);
  }



  //  saveCart is used to store cart items in local storage of user
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))

  //   // function uses to subtotal
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt +=  myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt)
  }



  // Add to Cart function like increase quantity of items in cart
  const addToCart = (stripePriceId, name, qty, price, img, size, color, whatDoYouWant) =>{
    let newCart = cart;
    if(stripePriceId in cart){
      newCart[stripePriceId].qty= cart[stripePriceId].qty + qty;
    }
    else{
      newCart[stripePriceId]= { qty:1, name, price, img, size, color, whatDoYouWant }   
    }
    setCart(newCart);
    saveCart(newCart);
  }



  // Remove From Cart function like decrease quantity of items in cart
  const removeFromCart = (stripePriceId, name, qty , price, size, color) =>{
    let newCart = cart;
    if(stripePriceId in cart){
      newCart[stripePriceId].qty= cart[stripePriceId].qty - qty;
    }
     if (newCart[stripePriceId].qty <=0){
      delete newCart[stripePriceId];
     }
    setCart(newCart);
    saveCart(newCart);
  } 



  // Delet Item From Cart function like delete one item in cart
  const deleteItemFromCart = (stripePriceId, name , qty, price, size, color) =>{
    let newCart = cart;
    if(stripePriceId in cart){
      delete newCart[stripePriceId];
    }
    setCart(newCart);
    saveCart(newCart);
  } 



  // clear cart is used to clear all items in cart
  const clearCart = () => {
    setCart({});
    saveCart({});
  }



  const getImages = async(e)=>{
    e.preventDefault();

    const data = { message }; 
    const response = await fetch('/api/generateImage', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let GeneratedImages= response.data;
    setGeneratedImages(GeneratedImages)
    setAllGeneratedImages(...GeneratedImages, GeneratedImages)
  }

  return <>
    <LoadingBar color='#29D0d1' height={3} progress={progress} waitingTime={300} onLoaderFinished={() => setProgress(0)}/>
    
    <Navbar key={key} user={user} logout={logout} cart={cart} deleteItemFromCart={deleteItemFromCart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
    <Component allGeneratedImages={allGeneratedImages} generatedImages={generatedImages} getImages={getImages} setMessage={setMessage} user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} deleteItemFromCart={deleteItemFromCart} clearCart={clearCart} subTotal={subTotal}  {...pageProps} />
    <Footer/>
  </>
}