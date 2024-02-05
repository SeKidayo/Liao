import prisma from '@/libs/prismadb';

import getSession from './getSession';

/**
 * 查询并返回当前用户信息
 * @returns 
 */
const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null; 
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })
    
    if (!currentUser) {
      return null;
    }

    return currentUser;

  } catch (error: any) {
    return null;
  }
}

export default getCurrentUser;
