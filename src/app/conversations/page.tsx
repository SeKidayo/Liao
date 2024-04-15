'use client';

import clsx from "clsx";

import useConversation from "@/hooks/useConversation";
import EmptyState from "@/components/ui/empty-state/EmptyState";

const Conversation = () => {
  const { isOpen, conversationId } = useConversation();

  return (
    <div
      className={
        clsx(
          "lg:pl-80 h-full lg:block",
          isOpen ? 'block' : 'hidden'
        )
      }
    >
      <EmptyState />
    </div>
  )
}

export default Conversation;
