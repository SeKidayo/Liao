import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import UserList from "./components/UserList";

/**
 * 页面级别布局组件
 */
export default async function UsersLayout({
  children
}: {
  children: React.ReactNode
}) {

  const users = await getUsers();


  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  )
}