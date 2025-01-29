import Image from "next/image";
import Link from "next/link";
// import { BsPeople } from "react-icons/bs";

import { GrScan } from "react-icons/gr";
const Nav = () => {
  return (
    <nav className="flex flex-row justify-between items-center py-5 sn:py-2 sn:px-5 sp:py-2 sp:px-6 se:py-2 se:px-7 px-20">
      <Image
        src="/logo.jpg"
        className="sn:w-[110px] sp:w-[120px] se:w-[140px] h-auto"
        alt="logo"
        width={150}
        height={150}
      />
      <ul className="flex flex-row justify-between gap-10 align-middle mt-3">
        <li style={{ listStyle: "none", alignItems: "center" }}>
          <Link
            href="/"
            style={{
              color: "black",
              textDecoration: "none",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
            }}
            className="gap-2">
            {" "}
            <GrScan
              className="sn:w-[20px] sp:w-[20px] se:w-[25px] h-auto"
              size={16}
            />{" "}
            <p className="sn:hidden sp:hidden se:hidden">Scanner </p>
          </Link>
        </li>
        {/* <li>
          <Link
            href="/participants"
            style={{
              color: "black",
              textDecoration: "none",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
            }}
            className="gap-2">
            <BsPeople
              className="sn:w-[20px] sp:w-[20px] se:w-[25px] h-auto"
              size={16}
            />{" "}
            <p className="sn:hidden sp:hidden se:hidden">Participants</p>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};
export default Nav;
