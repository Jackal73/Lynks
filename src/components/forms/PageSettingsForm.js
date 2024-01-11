"use client";

import { savePageSettings } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import RadioTogglers from "@/components/formItems/RadioTogglers";
import SectionBox from "@/components/layout/SectionBox";
import { upload } from "@/libs/upload";
import {
  faCamera,
  faCloudArrowUp,
  faImage,
  faPalette,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user?.image);

  async function saveBaseSettings(formData) {
    console.log(formData.get("displayName"));

    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Saved!");
    }
  }

  async function handleCoverImageChange(ev) {
    await upload(ev, (link) => {
      setBgImage(link);
    });
  }

  async function handleAvatarImageChange(ev) {
    await upload(ev, (link) => {
      setAvatar(link);
    });
  }

  return (
    <div className="">
      <SectionBox>
        <form action={saveBaseSettings} className="">
          <div
            className="py-4 -m-4 flex justify-center items-center bg-cover bg-no-repeat bg-center min-h-[300px]"
            style={
              bgType === "color"
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
          >
            <div>
              <RadioTogglers
                defaultValue={page.bgType}
                options={[
                  { value: "color", icon: faPalette, label: "Color" },
                  { value: "image", icon: faImage, label: "Image" },
                ]}
                onChange={(val) => setBgType(val)}
              />

              {bgType === "color" && (
                <div className="bg-[#1f1f1f] mt-2 shadow text-[#9b9b9b] p-2">
                  <div className="flex justify-center gap-2">
                    <span>Background Color:</span>
                    <input
                      type="color"
                      name="bgColor"
                      onChange={(ev) => setBgColor(ev.target.value)}
                      defaultValue={page.bgColor}
                    />
                  </div>
                </div>
              )}
              {bgType === "image" && (
                <div className="flex justify-center">
                  <label className="bg-[#1f1f1f] shadow px-4 py-2 mt-2 flex gap-2">
                    <input type="hidden" name="bgImage" value={bgImage} />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleCoverImageChange}
                    />
                    <div className="flex gap-2 items-center cursor-pointer text-white/80">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="text-[#9b9b9b]"
                      />
                      <span>Change image</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <div className="flex justify-center -mb-12 ">
              <div className=" relative -top-10 w-[128px] h-[128px]">
                <div className="overflow-hidden h-full rounded-full border-2 border-[#3b3b3b] shadow shadow-black/50">
                  <Image
                    src={avatar}
                    alt={"avatar"}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="avatarIn"
                  className="absolute bottom-0 -right-2 bg-[#5b5b5b] p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer"
                >
                  <FontAwesomeIcon icon={faCamera} size={"xl"} className="" />
                </label>
                <input
                  id="avatarIn"
                  type="file"
                  onChange={handleAvatarImageChange}
                  className="hidden"
                />
                <input type="hidden" name="avatar" value={avatar} />
              </div>
            </div>
            <div className="p-0">
              <label htmlFor="nameIn" className="input-label">
                Display Name
              </label>
              <input
                type="text"
                id="nameIn"
                name="displayName"
                defaultValue={page.displayName}
                placeholder="Leonardo Ravioli"
              />

              <label htmlFor="locationIn" className="input-label">
                Location
              </label>
              <input
                type="text"
                id="locationIn"
                name="location"
                defaultValue={page.location}
                placeholder="Somewhere, USA"
              />

              <label htmlFor="bioIn" className="input-label">
                Bio
              </label>
              <textarea
                id="bioIn"
                name="bio"
                defaultValue={page.bio}
                placeholder="Your bio goes here..."
                className=""
              />
              {/* <hr className="mt-5 border-t border-[#1f1f1f]" /> */}
              {/* <div className="max-w-[200px] mx-auto"> */}
              <div className="max-w-xs mx-auto">
                {" "}
                {/* max-w-xs */}
                <div className="pt-4 mt-4">
                  <SubmitButton>
                    <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                    Save
                  </SubmitButton>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SectionBox>
    </div>
  );
}
