import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <section className="pt-32">
        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold text-[#9b9b9b]">
            Your ONE link
            <br /> for everything
          </h1>
          <h2 className="text-[#7b7b7b] text-xl mt-6">
            Share your links, social profiles, contact info and more on one
            page!
          </h2>
        </div>
        <HeroForm user={session?.user} />
      </section>
    </main>
  );
}
