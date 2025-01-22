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
      <div className="flex-1 flex flex-col pb-2 max-w-screen-xl mx-auto">
        <Header />
        <main className="flex flex-col flex-1 px-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
