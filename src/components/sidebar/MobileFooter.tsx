'use client';

import useConversation from "@/hooks/useConversation";
import useRouters from "@/hooks/useRoutes";

import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRouters();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-white
        border-t-[1px]
        lg:hidden
      "
    >
      {
        routes.map((route) => {
          return (
            <MobileItem
              key={route.label}
              href={route.href}
              label={route.label}
              icon={route.icon}
              active={route.active}
              onClick={route.onClick}
            />
          )
        })
      }
    </div>
  );
}

export default MobileFooter;
