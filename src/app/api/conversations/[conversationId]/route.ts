import getCurrentUser from "@/actions/getCurrentUser";
import prisma from '@/libs/prismadb';
import { pusherServer } from "@/libs/pusher";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const exisitingConversations = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    if (!exisitingConversations) {
      return new NextResponse('Not found', { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId, // 要删除的对话id
        userIds: {
          hasSome: [currentUser.id] // 包含当前用户id
        }
      }
    });

    exisitingConversations.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:remove', exisitingConversations);
      }
    })

    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.log(error, 'Internal server error');
    return new NextResponse('Internal server error', { status: 500 });
  }
}
