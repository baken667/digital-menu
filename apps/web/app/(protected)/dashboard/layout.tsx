import DashboardLayout from "@/components/dashboard/dashboard-layout";

export default async function DashboardLayoutRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
