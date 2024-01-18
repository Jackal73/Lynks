"use client";

import { savePageButtons } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
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
import { faEnvelope, faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import {
  faGripVertical,
  faMobileScreenButton,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import SectionBox from "../layout/SectionBox";

export const allButtons = [
  {
    key: "email",
    label: "e-mail",
    icon: faEnvelope,
    placeholder: "test@example.com",
  },
  {
    key: "discord",
    label: "discord",
    icon: faDiscord,
    placeholder: "https://discord.com/",
  },
  {
    key: "facebook",
    label: "facebook",
    icon: faFacebook,
    placeholder: "https://facebook.com/profile/...",
  },
  {
    key: "github",
    label: "github",
    icon: faGithub,
    placeholder: "https://github.com/",
  },
  {
    key: "instagram",
    label: "instagram",
    icon: faInstagram,
    placeholder: "https://instagram.com/profile/...",
  },
  {
    key: "mobile",
    label: "mobile",
    icon: faMobileScreenButton,
    placeholder: "234-567-6890",
  },
  {
    key: "telegram",
    label: "telegram",
    icon: faTelegram,
    placeholder: "https://telegram.com/",
  },

  {
    key: "tiktok",
    label: "tiktok",
    icon: faTiktok,
    placeholder: "https://tiktok.com/",
  },
  {
    key: "youtube",
    label: "youtube",
    icon: faSquareYoutube,
    placeholder: "https://youtube.com/",
  },
  {
    key: "whatsapp",
    label: "whatsapp",
    icon: faWhatsapp,
    placeholder: "https://whatsapp.com/",
  },
];

function upperFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default function PageButtonsForm({ user, page }) {
  const pageSavedButtonsKeys = Object.keys(page.buttons || {});
  const pageSavedButtonsInfo = pageSavedButtonsKeys.map((k) =>
    allButtons.find((b) => b.key === k)
  );
  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

  function addButtonToProfile(button) {
    setActiveButtons((prevButtons) => {
      return [...prevButtons, button];
    });
  }

  async function saveButtons(formData) {
    await savePageButtons(formData);
    toast.success("Settings saved!");
  }

  async function removeButton({ key: keyToRemove }) {
    setActiveButtons((prevButtons) => {
      return prevButtons.filter((button) => button.key !== keyToRemove);
    });
  }

  const availableButtons = allButtons.filter(
    (b1) => !activeButtons.find((b2) => b1.key === b2.key)
  );

  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4 text-[#9b9b9b]">Buttons</h2>
        <ReactSortable
          handle={".handle"}
          list={activeButtons}
          setList={setActiveButtons}
        >
          {activeButtons.map((b) => (
            <div key={b.key} className="mb-4 md:flex items-center">
              <div className="w-56 flex h-full p-2 gap-2 items-center text-[#7b7b7b]">
                {/* <div className="handle"> */}
                <FontAwesomeIcon
                  icon={faGripVertical}
                  className="text-amber-600 handle p-2 cursor-ns-resize"
                />
                {/* </div> */}
                <FontAwesomeIcon icon={b.icon} />
                <span className="">{upperFirst(b.label)}:</span>
              </div>
              <div className="flex grow">
                <input
                  name={b.key}
                  placeholder={b.placeholder}
                  type="text"
                  defaultValue={page.buttons[b.key]}
                  style={{ marginBottom: "0", color: "#9b9b9b" }}
                />
                <button
                  onClick={() => removeButton(b)}
                  type="button"
                  className="py-2 px-4 bg-[#3b3b3b] cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faSquareMinus}
                    className="text-amber-600"
                  />
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>
        <div className="flex flex-wrap gap-2 mt-4 border-y py-4 border-[#3b3b3b]">
          {availableButtons.map((b) => (
            <button
              key={b.key}
              type="button"
              onClick={() => addButtonToProfile(b)}
              className="flex gap-1 p-2 bg-[#3b3b3b] text-[#9b9b9b] items-center"
            >
              <FontAwesomeIcon icon={b.icon} />
              <span className="">{upperFirst(b.label)}</span>
              <FontAwesomeIcon icon={faPlus} className="text-amber-600" />
            </button>
          ))}
        </div>
        <div className="max-w-xs mx-auto mt-8">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span className="">Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
