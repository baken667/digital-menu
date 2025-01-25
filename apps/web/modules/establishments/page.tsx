import DashboardClient from "@/app/(protected)/dashboard/establishments/pageClient";
import ProtectedComponent from "@/components/common/protectedComponent";
import CreateEstablishmentDialog from "@/components/establishments/create-establishment-modal";
import PageHeader from "@/components/layouts/dashboard/page-header";
import { messages } from "@/lib/messages";

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
      <DashboardClient />
    </>
  );
}
