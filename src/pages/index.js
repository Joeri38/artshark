import Head from "next/head"
import HomePage from "./home"
import { useEffect } from "react"
export default function Home() {

  useEffect(() => {
    
  }, [])

  
  return (
    <>
    <Head>
        <title>Art Shark</title>
        <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
      <HomePage/>
    </>
  )
}