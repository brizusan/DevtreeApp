import { social } from "@/data/social";
import { DraftSocialMedia, SocialMedia, User } from "@/schemas";
import { isValidURL } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useUpdateUrl = () => {
  const [socialMedia, setSocialMedia] = useState<DraftSocialMedia[]>(social);
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;
  const links: SocialMedia[] = JSON.parse(user.links!);

  useEffect(() => {
    const socialMediaData = socialMedia.map((social) => {
      const socialMedia = JSON.parse(user.links!).find(
        (link: DraftSocialMedia) => link.name === social.name
      );
      if (socialMedia) {
        return {
          ...social,
          url: socialMedia.url,
          enabled: socialMedia.enabled,
        };
      }
      return social;
    });
    setSocialMedia(socialMediaData);
  }, []);

  const handleUrlName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const updatedSocialMedia = socialMedia.map((social) => {
      if (social.name === id) {
        return {
          ...social,
          url: value,
        };
      }
      return social;
    });

    setSocialMedia(updatedSocialMedia);
  };

  const handleUrlState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    const updatedSocialMedia = toggleSocialMediaEnabled(socialMedia, name);
    setSocialMedia(updatedSocialMedia);

    const selected = updatedSocialMedia.find((item) => item.name === name);
    if (!selected) return;

    const updatedItems = selected.enabled
      ? enableLink(links, selected)
      : disableLink(links, name);

    // Actualiza el estado de links
    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems)!,
      };
    });
  };

  const toggleSocialMediaEnabled = (
    media: DraftSocialMedia[],
    name: string
  ): DraftSocialMedia[] => {
    return media.map((item) => {
      if (item.name !== name) return item;

      if (!isValidURL(item.url!)) {
        toast.error("Invalid URL");
        return item;
      }

      return {
        ...item,
        enabled: !item.enabled,
      };
    });
  };

  const enableLink = (
    links: SocialMedia[],
    selected: DraftSocialMedia
  ): SocialMedia[] => {
    const exists = links.some(
      (link: SocialMedia) => link.name === selected.name
    );
    const newId = links.filter((link: SocialMedia) => link.id).length + 1;

    if (exists) {
      return links.map((link: SocialMedia) =>
        link.name === selected.name
          ? { ...link, enabled: true, id: newId }
          : link
      );
    }

    return [...links, { ...selected, id: newId }];
  };

  const disableLink = (links: SocialMedia[], name: string): SocialMedia[] => {
    const index = links.findIndex((link) => link.name === name);

    return links.map((link) => {
      if (link.name === name) {
        return { ...link, id: 0, enabled: false };
      }

      const isAfter = link.id > index && index !== 0 && link.id === 1;

      return isAfter ? { ...link, id: link.id - 1 } : link;
    });
  };

  return {
    socialMedia,
    handleUrlName,
    handleUrlState,
  };
};
