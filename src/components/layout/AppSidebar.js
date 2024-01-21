"use client";

import LogoutButton from "@/components/buttons/LogoutButton";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const path = usePathname();

  return (
    <nav className="inline-flex flex-col text-center mt-8 gap-2 text-[#7b7b7b]">
      <Link
        href={"/account"}
        className={
          "flex gap-4 p-2 " +
          (path === "/account" ? "text-amber-600 font-semibold" : "")
        }
      >
        <FontAwesomeIcon
          icon={faFileLines}
          className="w-6 h-6"
          fixedWidth={true}
        />
        <span>My Page</span>
      </Link>
      <Link
        href={"/lynkx.vercel.app/analytics"}
        className={
          "flex gap-4 p-2 " +
          (path === "/analytics" ? "text-amber-600 font-semibold" : "")
        }
      >
        <FontAwesomeIcon
          icon={faChartLine}
          className="w-6 h-6"
          fixedWidth={true}
        />

        <span>Analytics</span>
      </Link>

      <LogoutButton
        iconLeft={true}
        className="flex gap-4 p-2 items-center text-[#7b7b7b]"
        iconClasses={"w-6 h-6"}
      />
      <Link
        href={"/"}
        className="flex items-center gap-2 text-xs text-[#7b7b7b] border-t border-[#7b7b7b] pt-4"
      >
        <FontAwesomeIcon icon={faArrowLeft} className={"w-3 h-3"} />
        <span>Back to website</span>
      </Link>
    </nav>
  );
}
