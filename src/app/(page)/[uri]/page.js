import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faSquareYoutube,
  faTelegram,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faLink,
  faLocationCrosshairs,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";

export const buttonsIcons = {
  email: faEnvelope,
  mobile: faMobileScreenButton,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faSquareYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
  telegram: faTelegram,
};

function buttonLink(key, value) {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  return value;
}

export default async function UserPage({ params }) {
  const uri = params.uri;
  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page?.owner });
  await Event.create({ uri: uri, page: uri, type: "view" });

  return (
    // <div className="bg-blue-950 text-white/90 min-h-screen">
    <div className="bg-[#121212] text-white/80 min-h-screen">
      <div
        className="sm:min-h-[250px] min-h-[200px] bg-gray-400 bg-cover bg-no-repeat bg-center"
        style={
          page?.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page?.bgImage})` }
        }
      ></div>
      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image
          className="rounded-full w-full h-full object-cover border-2 border-[#5b5b5b]"
          src={user?.image}
          alt="avatar"
          width={256}
          height={256}
        />
      </div>

      <h2 className="text-2xl text-center mb-1">{page?.displayName}</h2>
      <h3 className="text-md flex gap-2 justify-center items-center text-white/70">
        <FontAwesomeIcon className="h-4" icon={faLocationCrosshairs} />
        <span className="">{page?.location}</span>
      </h3>
      <div className="max-w-xs mx-auto text-center my-2 text-white/80">
        <p className="">{page?.bio}</p>
      </div>
      <div className="flex gap-2 justify-center mt-4 pb-4">
        {Object.keys(page?.buttons).map((buttonKey) => (
          <Link
            key={buttonKey}
            href={buttonLink(buttonKey, page?.buttons[buttonKey])}
            className="rounded-full bg-[#9b9b9b] border border-[#121212] text-blue-950 hover:bg-[#2b2b2b] hover:text-amber-600 hover:border hover:border-[#2b2b2b] p-2 flex justify-center items-center"
          >
            <FontAwesomeIcon
              className="w-5 h-5"
              icon={buttonsIcons[buttonKey]}
            />
          </Link>
        ))}
      </div>
      <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8">
        {page?.links.map((link) => (
          <Link
            // ping={process.env.URL + "api/click?url=" + btoa(link.url)}
            ping={
              process.env.URL +
              "api/click?url=" +
              btoa(link.url) +
              "&page=" +
              page?.uri
            }
            href={link?.url}
            key={link.url}
            target="_blank"
            // className="bg-indigo-800 p-2 flex"
            className="bg-[#1f1f1f] p-2 flex"
          >
            <div className="relative -left-4 overflow-hidden w-16">
              <div className="w-16 h-16 border border-[#3b3b3b] bg-[#2b2b2b] aspect-square relative flex justify-center items-center">
                {link.icon && (
                  <Image
                    src={link.icon}
                    alt={"icon"}
                    className="w-full h-full object-fit"
                    width={64}
                    height={64}
                  />
                )}
                {!link.icon && (
                  <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                )}
              </div>
            </div>
            <div className="flex justify-center items-center shrink grow-0">
              <div className="">
                <h3 className="">{link.title}</h3>
                <p className="text-white/50 h-6 overflow-hidden">
                  {link.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
