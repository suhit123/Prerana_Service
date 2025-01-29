import  React from 'react';
import Nav from "@/components/nav";
import { Scanner } from '@yudiel/react-qr-scanner';

export default function Home() {
  return (
   <>
    <Nav/>
    <Scanner onScan={(result) => console.log(result)} />
   </>
  );
}
