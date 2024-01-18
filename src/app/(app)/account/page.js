import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import cloneDeep from "clone-deep";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const lynksUsername = searchParams?.lynksUsername;

  if (!session) {
    redirect("/");
  }

  mongoose.connect(process.env.MONGODB_URI);

  const page = await Page.findOne({ owner: session?.user?.email });

  const leanPage = cloneDeep(page.toJSON());

  leanPage._id = leanPage._id.toString();

  if (page) {
    return (
      <>
        <PageSettingsForm page={leanPage} user={session.user} />
        <PageButtonsForm page={leanPage} user={session.user} />
        <PageLinksForm page={leanPage} user={session.user} />
      </>
    );
  }

  return (
    <div>
      <UsernameForm lynksUsername={lynksUsername} />
    </div>
  );
}
