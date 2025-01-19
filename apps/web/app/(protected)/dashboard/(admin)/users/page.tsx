import PageHeader from "@/components/layouts/dashboard/page-header";
import UsersPageClient from "./pageClient";
import { messages } from "@/lib/messages";
import CreateUserModal from "@/components/users/create-user-modal";

export default function UsersPage() {
  return (
    <>
      <PageHeader
        title={messages.common.users}
        description={messages.common.usersDescription}
        actions={<CreateUserModal />}
      />
      <UsersPageClient />
    </>
  );
}
