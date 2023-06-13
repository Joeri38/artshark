import React, { useEffect, useState } from "react";
import Head from "next/head";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import { useRouter } from "next/router";

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const Success = ({id}) => {

    const router = useRouter();
    
    useEffect(() => {
        submit();
    }, [])

    const submit = async()=>{
        const data = { sessionId:id  }
        let res = await fetch(`/api/retrieve-payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        let response = await res.json();
        if(response.id){
            router.push(`/order?id=${response.id}&clearCart=1`)
        }
    }
    
    
    

    return (
        <div className="min-h-[650px] bg-[#f7f7f7] text-black flex items-center">
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
                    <div className="underline">Artsharkbe@gmail.com</div>

                    <Link href="/" className="font-bold mt-5">
                        Continue Shopping
                    </Link>

                    <form method="post">
                        <button type="submit">Go To the Order Page</button>
                    </form>

                </div>
            </Wrapper>
        </div>
    );
};

export async function getServerSideProps(context) {
    let id = context.query.id;

    // Pass data to the page via props
    return {
        props: { id } 
    }
}


export default Success;