"use client";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

// onClick={() => signOut()}
export default function LogoutButton({
  className = "flex items-center gap-2 sm:border sm:border-[#5b5b5b] p-2 sm:px-4 shadow",
  iconLeft = false,
  iconClasses = "text-amber-600",
}) {
  return (
    <button className={className} onClick={() => signOut()}>
      {iconLeft && (
        <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
      )}
      <span className="sm:flex hidden">Logout</span>
      {!iconLeft && (
        <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
      )}
    </button>
  );
}
