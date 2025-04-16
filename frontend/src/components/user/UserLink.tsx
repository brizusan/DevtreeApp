import { SocialMedia } from "@/schemas";
import { JSX } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

type UserLinkProps = {
  link: SocialMedia;
};

type SocialName =
  | "facebook"
  | "github"
  | "instagram"
  | "x"
  | "youtube"
  | "tiktok"
  | "twitch"
  | "linkedin";

const socialsIcon: Record<SocialName, JSX.Element> = {
  facebook: <FaFacebook size={30} className="text-slate-300" />,
  github: <FaGithub size={30} className="text-slate-300" />,
  instagram: <FaInstagram size={30} className="text-slate-300" />,
  x: <FaTwitter size={30} className="text-slate-300" />,
  youtube: <FaYoutube size={30} className="text-slate-300" />,
  tiktok: <FaTiktok size={30} className="text-slate-300" />,
  twitch: <FaTwitch size={30} className="text-slate-300" />,
  linkedin: <FaLinkedin size={30} className="text-slate-300" />,
};

const socialsContent: Record<SocialMedia["name"], string> = {
  github: "GitHub",
  x: "Twitter",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  tiktok: "TikTok",
  twitch: "Twitch",
};

export const UserLink = ({ link }: UserLinkProps) => {
  return (
    <div className="flex items-center gap-8 bg-slate-950 rounded p-2 lg:px-4 hover:scale-105 transform transition-all">
      <div>{socialsIcon[link.name as SocialName]}</div>
      <div className="flex-1">
        <p className="font-mono font-semibold  capitalize text-lg tracking-wider text-white antialiased">
          {socialsContent[link.name]}
        </p>
      </div>
      <div>
        <Link
          to={link.url!}
          target="_blank"
          rel="noreferrer noopener"
          className="text-white text-sm font-semibold hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
