import PageHeader from "@/components/layouts/dashboard/page-header";
import DashboardClient from "./pageClient";
import { messages } from "@/lib/messages";
import CreateEstablishmentModal from "@/components/establishments/create-establishment-modal";

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title={messages.common.establishments}
        description={messages.common.establishmentsDescription}
        actions={<CreateEstablishmentModal />}
      />
      <DashboardClient />
    </>
  );
}
