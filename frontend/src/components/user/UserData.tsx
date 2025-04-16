import type { DraftUser, SocialMedia } from "@/schemas";
import { FaGreaterThan } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { UserLink } from "./UserLink";

type UserDataProps = {
  data: DraftUser;
};

export const UserData = ({ data }: UserDataProps) => {
  const links = JSON.parse(data.links!) as SocialMedia[];
  return (
    <>
      <section className="max-w-lg mx-auto space-y-6">
        <div className="flex justify-center flex-col text-pretty text-center space-y-2">
          <img
            className="w-40 h-40 rounded-full mx-auto object-cover p-1 border border-white bg-white"
            src={data.image}
            alt={`avatar de ${data.fullName}`}
          />
          <h1 className="text-2xl font-semibold text-white font-mono capitalize">
            {data.fullName}
          </h1>
          <h2 className="text-lg font-light text-white font-mono capitalize">
            @{data.handle}
          </h2>
          <pre className="text-white text-sm font-medium">
            {data.description ? data.description : "No tenemos una descripción"}
          </pre>
        </div>

        <div className=" rounded-md shadow-sm p-6 bg-slate-800 ">
          <div className="text-xl font-semibold text-white flex items-center gap-4">
            <div className="flex items-center">
              <FaGreaterThan size={20} className="text-slate-200" />
              <span className="text-slate-200">_</span>
            </div>
            <h2 className="uppercase tracking-wider">Links</h2>
          </div>

          <div className="grid grid-cols-1 gap-2.5 py-4">
            {links.map((link) => (
              <UserLink key={link.id} link={link} />
            ))}
          </div>
        </div>
      </section>
      <footer className="flex justify-center py-4 mt-12 text-white antialiased  text-sm ">
        <p>
          Encuentrame en redes como{" "}
          <Link
            to={`https://www.linkedin.com/in/cesar-zubilete`}
            target="_blank"
            rel="noreferrer noopener"
            className="text-blue-400 hover:text-blue-500"
          >
            @Brycezusan
          </Link>{" "}
        </p>
      </footer>
    </>
  );
};
