import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
      message,
      image,
      conversationId,
    } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 创建消息
    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          }
        },
        sender: {
          connect: {
            id: currentUser.id,
          }
        },
        seen: {
          connect: {
            id: currentUser.id,
          }
        }
      },
      include: {
        seen: true,
        sender: true,
      }
    });

    // 更新对话
    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          }
        }
      }
    })

    // 告知自身用户新发送一条消息
    await pusherServer.trigger(conversationId, 'messages:new', newMessage);
    const latsMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
    // 向关联用户推送消息
    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: [latsMessage]
      })
    })

    return NextResponse.json(newMessage);

  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGES');
    return new NextResponse(error.message, { status: 500 });
  }
}