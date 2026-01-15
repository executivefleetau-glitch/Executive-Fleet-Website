"use client";
import { menuItems } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      {menuItems.map((elm, i) => (
        <li key={i} className={elm.subMenu ? "has-children" : ""}>
          {elm.subMenu ? (
            <>
              <Link
                href={elm.link}
                className={`active ${elm.subMenu.some(
                  (elm3) => pathname !== "/" && pathname.split("/")[1] === elm3.link.split("/")[1]
                )
                    ? "active-link"
                    : ""
                  } `}
              >
                {elm.title}
                <span className="menu-icon">
                  <svg
                    className="icon-16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    ></path>
                  </svg>
                </span>
              </Link>
              <ul className="sub-menu">
                {elm.subMenu.map((elm2, i2) => (
                  <li key={i2}>
                    <Link
                      className={
                        pathname !== "/" && pathname.split("/")[1] === elm2.link.split("/")[1]
                          ? "active-link"
                          : ""
                      }
                      href={elm2.link}
                    >
                      {elm2.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link
              href={elm.link}
              className={pathname === elm.link ? "active-link" : ""}
            >
              {elm.title}
            </Link>
          )}
        </li>
      ))}

      <li>
        <Link
          href="/contact"
          className={pathname === "/contact" ? "active-link" : ""}
        >
          Contact
        </Link>
      </li>
    </>
  );
}
