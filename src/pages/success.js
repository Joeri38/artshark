import React, { useEffect } from "react";
import Head from "next/head";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import { useRouter } from "next/router";

const Success = ({ id, clearCart }) => {

    const router = useRouter();
    
    useEffect(() => {
        placeOrder();
    }, [router.query])

    const placeOrder = async () => {
        
        // Get cart from local storage
        const cart = localStorage.getItem('cart');
        
        // Send sessionId and cart to server
        let res = await fetch(`/api/place-order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: id, cart }),
        })
        let response = await res.json();
        
        // Clear cart
        clearCart();

        /*if(response.id){
            router.push(`/order?id=${response.id}&clearCart=1`)
        }*/

        return response.id;
    }

    return (
    <>
        <Head>
            <title>Order placed</title>
        </Head>

        <div className="min-h-[670px] bg-[#f7f7f7] text-black flex items-center">
            <Wrapper>
                <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
                    <div className="text-2xl font-bold">
                        Thanks for shopping with us!
                    </div>
                    <div className="text-lg font-bold mt-2">
                        Your order has been placed successfully.
                    </div>
                    <div className="text-base mt-5">
                        For any product related query, drop an email to
                    </div>
                    <div className="underline">info@artshark.be</div>

                    <Link href="/" className="font-bold mt-5">
                        Continue Shopping
                    </Link>

                </div>
            </Wrapper>
        </div>
    </>
    );
};

export async function getServerSideProps(context) {

    // Get session ID from URL query
    let id = context.query.id;

    // Pass data to the page 
    return {
        props: { id } 
    }
}

export default Success;