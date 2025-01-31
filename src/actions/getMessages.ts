import prisma from '@/libs/prismadb';

const getMessages = async (
  conversationId: string
) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createAt: 'asc'
      }
    })

    return messages;
  } catch (error: any) {
    return [];
  }
}

export default getMessages;
