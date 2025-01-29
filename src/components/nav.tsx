import Image from "next/image";
import Link from "next/link";
import { BsPeople } from "react-icons/bs";

import { GrScan } from "react-icons/gr";
const Nav = () => {
  return (
    <nav className="flex flex-row justify-between p-5 px-20">
      <Image src="/logo.jpg" alt="logo" width={150} height={150} />
      <ul className="flex flex-row justify-between gap-10 align-middle mt-3">
        <li style={{ listStyle: "none", 
            alignItems: "center",
        }}>
          <Link
            href="/"
            style={{
              color: "black",
              textDecoration: "none",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
            }}
            className="gap-2"
          >
            {" "}
            <GrScan size={16} /> <p>Scanner </p>
          </Link>
        </li>
        <li>
          <Link
            href="/participants"
            style={{
              color: "black",
              textDecoration: "none",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
            }}
            className="gap-2"
          >
            <BsPeople size={16} /> <p>Participants</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
