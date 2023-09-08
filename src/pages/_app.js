import '@/styles/globals.css'
import { useState , useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import LoadingBar from 'react-top-loading-bar'

// React Toastify
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {

  const router = useRouter();

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({value: null})
  const [key, setKey] = useState(0)

  //  Loading bar
  const [progress, setProgress] = useState(0)

  // I don't think we need these
  const [message, setMessage] = useState('')
  // const [generatedImages, setGeneratedImages] = useState([])
  // const [allGeneratedImages, setAllGeneratedImages] = useState([])

  //  Use Effect to retain same items in shopping Cart
  useEffect(() => {
    
    // Loading bar
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

  // Store cart items in local storage of user
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))

    // Calculate subtotal
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt +=  myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt)
  }

  // Add item to cart 
  const addToCart = (id, name, stripePriceId, price, img, size, color, qty) =>{
    let newCart = cart;
    if(id in cart){
      newCart[id].qty= cart[id].qty + qty;
    }
    else{
      newCart[id]= { name, price, img, stripePriceId, size, color, qty: 1}   
    }
    setCart(newCart);
    saveCart(newCart);
  }

  // Remove item from cart 
  const removeFromCart = (id, qty) =>{
    let newCart = cart;
    if(id in cart){
      newCart[id].qty= cart[id].qty - qty;
    }
     if (newCart[id].qty <=0){
      delete newCart[id];
     }
    setCart(newCart);
    saveCart(newCart);
  } 

  // Delete item from cart 
  const deleteItemFromCart = (id) =>{
    let newCart = cart;
    if(id in cart){
      delete newCart[id];
    }
    setCart(newCart);
    saveCart(newCart);
  } 

  // Clear cart
  const clearCart = () => {
    setCart({});
    saveCart({});
  }

  /* const getImages = async(e)=>{
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
  } */

  return <>
    <LoadingBar color='#29D0d1' height={3} progress={progress} waitingTime={300} onLoaderFinished={() => setProgress(0)}/>
    
    <Navbar key={key} user={user} cart={cart} subTotal={subTotal} logout={logout} addToCart={addToCart}
            removeFromCart={removeFromCart} clearCart={clearCart} deleteItemFromCart={deleteItemFromCart}  />
    <Component user={user} cart={cart} subTotal={subTotal} setMessage={setMessage} addToCart={addToCart} 
               removeFromCart={removeFromCart} deleteItemFromCart={deleteItemFromCart} clearCart={clearCart}   
               {...pageProps} />
    <Footer/>
  </>
} 