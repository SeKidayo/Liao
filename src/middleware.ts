import { withAuth } from "next-auth/middleware";

/**
 * 此中间件位置较为固定, 需要与app/pages 文件夹同级,否则不生效
 */

export default withAuth({
  pages: {
    signIn: '/'
  }
})

export const config = {
  matcher: [
    '/users/:path*'
  ]
}