"use client";

import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import { useEffect, useRef, useState } from "react";

import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({
  initialMessages
}) => {

  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    // 打开页面后,标记为已读
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [])

  return (
    <div
      className="flex-1 overflow-y-auto"
    >
      {
        messages.map((message, i) => {
          return (
            <MessageBox
              key={message.id}
              data={message}
              isLast={i === messages.length - 1}
            />
          )
        })
      }
      <div
        ref={bottomRef}
        className="pt-24"
      />
    </div>
  )
}

export default Body;
