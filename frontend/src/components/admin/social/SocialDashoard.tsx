import { DraftSocialMedia, SocialMedia, User } from "@/schemas";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SocialLink } from "./SocialLink";

type SocialDashoardProps = {
  data: User;
};

export const SocialDashoard = ({ data }: SocialDashoardProps) => {
  const [enabledLinks, setEnabledLinks] = useState<SocialMedia[]>([]);
  const queryClient = useQueryClient();

  const disabledLinks: SocialMedia[] = JSON.parse(data.links!).filter(
    (link: DraftSocialMedia) => !link.enabled
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links!).filter((link: DraftSocialMedia) => link.enabled)
    );
  }, [data]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (over && over.id) {
      const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
      const newIndex = enabledLinks.findIndex((link) => link.id === over.id);

      const order = arrayMove(enabledLinks, prevIndex, newIndex);
      setEnabledLinks(order);

      const links = order.concat(disabledLinks);

      queryClient.setQueryData(["user"], (prevState: User) => {
        return {
          ...prevState,
          links: JSON.stringify(links),
        };
      });
    }
  };

  return (
    <div className="w-full md:w-96 bg-slate-700 px-5 py-10 space-y-6 text-center">
      <h2 className="text-white antialiased font-medium text-2xl capitalize tracking-widest font-mono">
        {data.handle}
      </h2>
      {data.image && (
        <img
          src={data.image}
          alt={`avatar de ${data.fullName}`}
          className="w-42 h-42 rounded-full mx-auto object-cover"
        />
      )}
      <pre className="text-white text-sm font-medium">
        {data.description ? data.description : "No tenemos una descripción"}
      </pre>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <section className="flex flex-col gap-4">
          <SortableContext
            items={enabledLinks}
            strategy={verticalListSortingStrategy}
          >
            {enabledLinks.map((link) => (
              <SocialLink key={link.id} link={link} />
            ))}
          </SortableContext>
        </section>
      </DndContext>
    </div>
  );
};
