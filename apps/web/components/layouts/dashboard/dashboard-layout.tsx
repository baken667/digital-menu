import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./header";
import NavigationSidebar from "./navigation-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <NavigationSidebar />
      <div className="flex-1 flex flex-col h-[160dvh] md:pb-2">
        <Header />
        <main className="flex-1 px-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
