import { messages } from "@/lib/messages";
import CreateUserDialog from "./components/create-user-dialog";
import UsersPageClient from "./page-client";
import PageHeader from "../../components/dashboard/page-header";

export default function UsersPage() {
  return (
    <>
      <PageHeader
        title={messages.common.users}
        description={messages.common.usersDescription}
        actions={<CreateUserDialog />}
      />
      <UsersPageClient />
    </>
  );
}
