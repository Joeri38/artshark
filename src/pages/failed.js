import React from "react";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import Head from "next/head"

const Failed = () => {
    return (
    <>
        <Head>
            <title>Order failed</title>
        </Head>
        <div className="min-h-[650px] bg-[#f7f7f7] text-black flex items-center">
            <Wrapper>
                <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
                    <div className="text-2xl font-bold">Payment failed!</div>
                    <div className="text-base mt-5">
                        For any product related query, drop an email to
                    </div>
                    <div className="underline">Artsharkbe@gmail.com</div>

                    <Link href="/" className="font-bold mt-5">
                        Continue Shopping
                    </Link>
                </div>
            </Wrapper>
        </div>
    </>
    );
};

export default Failed;