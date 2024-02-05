import { signOut } from "next-auth/react";
import EmptyState from "@/components/ui/empty-state/EmptyState";

const Users = () => {
  return (
    <div
      className="
        hidden
        lg:block
        lg:pl-80
        h-full
      "
    >
      <EmptyState />
    </div>
  )
}

export default Users;
