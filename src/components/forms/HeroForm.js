"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HeroForm({ user }) {
  const router = useRouter();

  useEffect(() => {
    if (
      "localStorage" in window &&
      window.localStorage.getItem("lynksUsername")
    ) {
      const username = window.localStorage.getItem("lynksUsername");
      window.localStorage.removeItem("lynksUsername");
      redirect("/account?lynksUsername=" + username);
    }
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const form = ev.target;
    const input = form.querySelector("input");
    const username = input.value;
    if (username.length > 0) {
      if (user) {
        router.push("/account?linksUsername=" + username);
      } else {
        window.localStorage.setItem("lynksUsername", username);
        await signIn("google");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg shadow-gray-700/20 bg-[#1f1f1f]"
    >
      <span className="bg-[#1f1f1f] text-[#9b9b9b] py-4 pl-4">lynks.to/</span>
      <input
        // value={username}
        // onChange={(ev) => setUsername(ev.target.value)}
        type="text"
        // className="py-4 !bg-white !mb-0 !pl-0"
        placeholder="username"
        style={{ backgroundColor: "#1f1f1f", marginBottom: 0, paddingLeft: 1 }}
      />
      <button
        type="submit"
        className="bg-amber-600 text-white py-4 px-6 whitespace-nowrap"
      >
        Join for Free
      </button>
    </form>
  );
}
