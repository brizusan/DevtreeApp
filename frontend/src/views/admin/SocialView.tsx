import { useUpdateSocials, useUpdateUrl } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

export default function SocialView() {
  const queryClient = useQueryClient();
  const { socialMedia, handleUrlName, handleUrlState } = useUpdateUrl();
  const { mutate } = useUpdateSocials();

  return (
    <>
      <section>
        <h2 className="text-2xl text-slate-800 ">Social Media</h2>

        <div className="grid grid-cols-1 gap-2 pt-4">
          {socialMedia.map((social, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border rounded border-gray-100 py-2 px-6 bg-white shadow"
            >
              <label htmlFor={social.name}>
                <img
                  src={`./social/icon_${social.name}.svg`}
                  alt={social.name}
                  className="w-10 h-10 object-cover"
                />
              </label>
              <input
                type="text"
                id={social.name}
                disabled={social.enabled}
                value={social.url}
                className=" border-gray-300 disabled:opacity-60 flex-1 bg-slate-100 rounded-lg py-2 px-4 border"
                placeholder={social.name}
                onChange={handleUrlName}
              />
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  checked={social.enabled}
                  onChange={handleUrlState}
                  id="switch-2"
                  name={social.name}
                  type="checkbox"
                  className="peer sr-only"
                />
                <label htmlFor="switch-2" className="hidden"></label>
                <div className="peer h-4 w-11 rounded-full  bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end my-4">
          <button
            onClick={() => mutate(queryClient.getQueryData(["user"])!)}
            className="py-2 px-8 bg-cyan-500 hover:bg-slate-600 cursor-pointer text-white capitalize font-semibold rounded"
          >
            Guardar cambios
          </button>
        </div>
      </section>
    </>
  );
}
