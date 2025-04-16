import { SocialMedia } from "@/schemas";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SocialLinkProps = {
  link: SocialMedia;
};
export const SocialLink = ({ link }: SocialLinkProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="text-white bg-slate-800 transform text-sm font-medium py-2.5 cursor-pointer border border-gray-200 rounded hover:text-slate-200  hover:border-gray-400 "
    >
      {link.name}
    </div>
  );
};
