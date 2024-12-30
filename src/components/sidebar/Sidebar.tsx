import getCurrentUser from "@/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSiderbar";
import MobileFooter from "./MobileFooter";

async function Sidebar({
  children
}: {
  children: React.ReactNode;
}) {

  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      {/* Web端侧边栏 */}
      <DesktopSidebar currentUser={currentUser!} />
      {/* 移动端底栏 */}
      <MobileFooter />
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  )
}

export default Sidebar;
