import Logo from "@/components/common/logo";
import UserDropdown from "./user-dropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  return (
    <header className="w-full bg-background sticky top-0">
      <div className="flex flex-row justify-between items-center h-14 px-6 pt-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <Logo className="h-5 fill-primary" />
        </div>
        <UserDropdown />
      </div>
    </header>
  );
}
