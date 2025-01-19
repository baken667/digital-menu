import PageHeader from "@/components/layouts/dashboard/page-header";
import CreateUserModal from "@/components/users/create-user-modal";
import { messages } from "@/lib/messages";
import UsersPageClient from "./pageClient";

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
