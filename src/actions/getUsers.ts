import prisma from "@/libs/prismadb";

import getSession from "./getSession";

const getUsers = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return [];
    }

    const users = await prisma.user.findMany({
      orderBy: {
        createAt: 'desc'
      },
      where: {
        NOT: {
          email: session.user.email
        }
      }
    });
    
    return users;

  } catch (error: any) {
    return [];
  }
};

export default getUsers;
