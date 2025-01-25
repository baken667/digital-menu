import ProtectedComponent from "@/components/common/protectedComponent";
import PageHeader from "@/components/layouts/dashboard/page-header";
import { messages } from "@/lib/messages";
import EstablishmentsPageClient from "./page-client";
import CreateEstablishmentDialog from "./components/create-establishment-dialog";

export default function EstablishmentsPage() {
  return (
    <>
      <PageHeader
        title={messages.common.establishments}
        description={messages.common.establishmentsDescription}
        actions={
          <ProtectedComponent>
            <CreateEstablishmentDialog />
          </ProtectedComponent>
        }
      />
      <EstablishmentsPageClient />
    </>
  );
}
