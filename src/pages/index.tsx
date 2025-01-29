import  React, { useState } from 'react';
import Nav from "@/components/nav";
import { Scanner } from '@yudiel/react-qr-scanner';

export default function Home() {
  // const [scanValue, setScanValue] =useState(null);
  return (
   <>
    <Nav/>
    <div className='flex justify-center items-center h-screen max-w-96'>
      
    <Scanner onScan={(result) => console.log(result)} />
    </div>
   </>
  );
}
