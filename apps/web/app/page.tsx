import HomePageClient from "@/components/homepage/page-client";
import LogoutButton from "@/components/logout";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button>Hi</Button>
      <LogoutButton />
      <HomePageClient />
    </div>
  );
}
