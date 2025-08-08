import { AiOutlineHome, AiOutlineEdit } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

export const SIDE_BAR_OPTIONS = [
  {
    value: "home",
    route: "/",
    label: "Home",
    icon: <AiOutlineHome />,
  },
  {
    value: "generate-image",
    route: "/generate-image",
    label: "Generate Image",
    icon: <CiImageOn />,
  },
  {
    value: "create-template",
    route: "/create-template",
    label: "Create Template",
    icon: <IoDocumentTextOutline />,
  },
  {
    value: "template-editor",
    route: "/template-editor",
    label: "Template Editor",
    icon: <AiOutlineEdit />,
  },
  {
    value: "saved-templates",
    route: "/saved-templates",
    label: "Saved Templates",
    icon: <FaRegFolderOpen />,
  },
];
