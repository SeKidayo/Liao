'use client';

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import clsx from "clsx";
import { FullConversationType } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import Avatar from "@/components/ui/avatar/Avatar";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected
}) => {

  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMesage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  // 是否阅读过该条消息
  const hasSeen = useMemo(() => {
    if (!lastMesage) return false;

    const seenArray = lastMesage.seen || [];

    if (!userEmail) return false;

    return seenArray.filter(user => user.email === userEmail).length > 0;
  }, [userEmail, lastMesage]);

  const lastMessageText = useMemo(() => {
    if (!lastMesage?.image) {
      return 'Sent an image';
    }

    if (lastMesage?.body) {
      return lastMesage.body;
    }

    return 'Start a conversation';
  }, [lastMesage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full
        relative
        flex
        items-center
        space-x-3
        bg-white
        p-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer`,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      <Avatar
        currentUser={otherUser}
      />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
              flex
              justify-between
              items-center
              mb-1
            "
          >
            <p
              className="
                text-md
                font-medium
                text-gray-900
              "
            >
              {
                data.name || otherUser.name
              }
            </p>
            {lastMesage?.createAt && (
              <p
                className="
                  text-xs
                  text-gray-400
                  font-light
                "
              >
                {format(new Date(lastMesage.createAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(`
              text-sm
              truncate`,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox;
