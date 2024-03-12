import '@/styles/globals.css'
import { useState , useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import LoadingBar from 'react-top-loading-bar'
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"

// React Toastify
import { useRouter } from 'next/router';

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  const router = useRouter();

  const [cart, setCart] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({value: null})
  const [key, setKey] = useState(0)

  //  Loading bar
  const [progress, setProgress] = useState(0)

  //  Use Effect to handle loading bar, user and cart
  useEffect(() => {
    
    // Loading bar
    router.events.on('routeChangeStart', ()=>{
      setProgress(75);
    });
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100);
    }, []);


    // Cart
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }

    // User logged in with mail and password
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    if( myUser ){
      setUser({value: myUser.token , email: myUser.email, name: myUser.name });
      setKey(Math.random());
    }

    // User logged in with google
    console.log('session')
    console.log(pageProps);

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
    for (let i = 0; i < myCart.length; i++) {
      subt +=  myCart[i].price * myCart[i].qty;
    }
    setSubTotal(subt)
  }

  // Add item to cart 
  const addToCart = (id, size, color, sex, name, collection, stripePriceId, img, qty) =>{
    let newCart = cart;

    // Check if item with this id, size and color is already in the cart array
    console.log(cart);
    const itemIdx = cart.findIndex((item) => {
      return item.id === id && item.size === size && item.color === color && item.sex; 
    })
    console.log(itemIdx);
      
    if (itemIdx != -1) {
      newCart[itemIdx].qty= cart[itemIdx].qty + qty;
      console.log('Item already exists in the cart.');
    } else {
      newCart.push({ id, size, color, sex, name, collection, stripePriceId, img, price: 40, qty: 1});
      console.log('Item does not exist in the cart.');
    }

    setCart(newCart);
    saveCart(newCart);
  }

  // Remove item from cart 
  const removeFromCart = (id, size, color, sex) =>{
    
    const itemIdx = cart.findIndex((item) => {
      return item.id === id && item.size === size && item.color === color && item.sex == sex;
    })
    
    if (cart[itemIdx].qty == 1){
      var newCart = cart.filter((element, index) => index !== itemIdx);
    }
    else {
      var newCart = cart;
      newCart[itemIdx].qty= cart[itemIdx].qty - 1;
    }

    setCart(newCart);
    saveCart(newCart);
  } 

  // Delete item from cart 
  const deleteItemFromCart = (id, size, color, sex) =>{

    const itemIdx = cart.findIndex((item) => {
      return item.id === id && item.size === size && item.color === color && item.sex === sex;
    })
    let newCart = cart.filter((element, index) => index !== itemIdx);
    
    setCart(newCart);
    saveCart(newCart);
  } 

  // Clear cart
  const clearCart = () => {
    setCart([]);
    saveCart([]);
  }

  return <>
    <LoadingBar color='#29D0d1' height={3} progress={progress} waitingTime={300} onLoaderFinished={() => setProgress(0)}/>
    
    <Navbar key={key} user={user} cart={cart} subTotal={subTotal} logout={logout} addToCart={addToCart}
            removeFromCart={removeFromCart} clearCart={clearCart} deleteItemFromCart={deleteItemFromCart}  />
    <SessionProvider> {/* <SessionProvider session={session}> */}
      <Component user={user} cart={cart} subTotal={subTotal} addToCart={addToCart} 
                removeFromCart={removeFromCart} deleteItemFromCart={deleteItemFromCart} 
                clearCart={clearCart}  {...pageProps} />
    </SessionProvider>
    <Footer/>
  </>
} 