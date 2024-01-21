import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/buttons/LogoutButton";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-[#1f1f1f] border-b border-[#5b5b5b] py-4">
      <div className="max-w-4xl flex justify-between mx-auto sm:px-6 px-2">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="flex items-center gap-2 text-amber-600">
            <FontAwesomeIcon icon={faLink} className="h-6 text-amber-600" />
            <span className="font-bold">Ｌｙｎｋｘ</span>
          </Link>
          <nav className=" items-center gap-4 text-[#9b9b9b] text-sm hidden sm:flex">
            <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/contact"}>Contact</Link>
          </nav>
        </div>

        <nav className="flex items-center sm:gap-4 gap-3 text-sm text-[#9b9b9b]">
          {!!session && (
            <>
              <Link href={"/account"}>Hello, {session?.user?.name}</Link>
              <LogoutButton />
            </>
          )}
          {!session && (
            <>
              <Link href={"/login"}>Sign In / </Link>
              <Link href={"/login"}>Create Account</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
