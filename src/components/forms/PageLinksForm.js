"use client";

import { savePageLinks } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import { upload } from "@/libs/upload";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import {
  faCloudArrowUp,
  faGripVertical,
  faLink,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import SectionBox from "../layout/SectionBox";

export default function PageLinksForm({ page, user }) {
  const [links, setLinks] = useState(page.links || []);

  async function save() {
    await savePageLinks(links);
    toast.success("Saved!");
  }

  function addNewLink() {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  }

  function handleUpload(ev, linkKeyForUpload) {
    upload(ev, (uploadedImageUrl) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link, index) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  }

  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return [...prev];
    });
  }

  function removeLink(linkKeyToRemove) {
    setLinks((prevLinks) =>
      [...prevLinks].filter((l) => l.key !== linkKeyToRemove)
    );
    // toast.success("The link has been removed");
  }

  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4 text-[#9b9b9b]">Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-amber-600 text-lg flex gap-2 items-center cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="bg-amber-600 text-[#020202] p-1 rounded-full aspect-square"
          />
          <span className="">Add new</span>
        </button>
        <div className="">
          <ReactSortable handle={".handle"} list={links} setList={setLinks}>
            {links.map((l) => (
              <div key={l.key} className="mt-8 md:flex gap-6 items-center">
                <div className="handle">
                  <FontAwesomeIcon
                    icon={faGripVertical}
                    className="text-amber-600 mr-2 cursor-ns-resize"
                  />
                </div>
                <div className="text-center">
                  <div className="bg-[#1f1f1f] aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center">
                    {l.icon && (
                      <Image
                        className="w-full h-full object-fit"
                        src={l.icon}
                        alt={"icon"}
                        height={64}
                        width={64}
                      />
                    )}
                    {!l.icon && (
                      <FontAwesomeIcon
                        icon={faLink}
                        size="xl"
                        className="text-amber-600"
                      />
                    )}
                  </div>
                  <div className="">
                    <input
                      onChange={(ev) => handleUpload(ev, l.key)}
                      id={"icon" + l.key}
                      type="file"
                      className="hidden"
                    />
                    <label
                      htmlFor={"icon" + l.key}
                      className="border border-[#1f1f1f] mt-2 p-2 flex items-center gap-2 text-[#9b9b9b] bg-[#1f1f1f] cursor-pointer mb-2 justify-center"
                    >
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                      <span className="">Change icon</span>
                    </label>
                    <button
                      onClick={() => removeLink(l.key)}
                      type="button"
                      className="w-full flex gap-2 items-center justify-center py-2 px-3 bg-[#3b3b3b] cursor-pointer text-[#9b9b9b]"
                    >
                      {/* #5c47e0 */}
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        // className="text-red-600"
                      />
                      <span className="">Remove link</span>
                    </button>
                  </div>
                </div>
                <div className="grow">
                  <label className="input-label">Title:</label>
                  <input
                    value={l.title}
                    onChange={(ev) => handleLinkChange(l.key, "title", ev)}
                    type="text"
                    placeholder="title"
                  />
                  <label className="input-label">Subtitle:</label>

                  <input
                    value={l.subtitle}
                    onChange={(ev) => handleLinkChange(l.key, "subtitle", ev)}
                    type="text"
                    placeholder="subtitle (optional)"
                  />
                  <label className="input-label">URL:</label>

                  <input
                    value={l.url}
                    onChange={(ev) => handleLinkChange(l.key, "url", ev)}
                    type="text"
                    placeholder="url"
                  />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="mt-4 pt-4">
          <SubmitButton className=" max-w-xs mx-auto">
            <FontAwesomeIcon icon={faSave} />
            <span className="">Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
