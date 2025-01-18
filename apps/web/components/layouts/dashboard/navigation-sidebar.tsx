"use client";

import Link from "next/link";
import { UserRoles } from "@dmu/prisma/client";
import { HomeIcon, LucideIcon, Users2Icon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { messages } from "@/lib/messages";
import { useSession } from "next-auth/react";
import React from "react";
import { usePathname } from "next/navigation";

type Route = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles?: UserRoles[];
  exact?: boolean;
};

const routes: Route[] = [
  {
    href: "/dashboard",
    label: messages.common.dashboard,
    icon: HomeIcon,
    exact: true,
  },
  {
    href: "/dashboard/users",
    label: messages.common.users,
    icon: Users2Icon,
    roles: ["admin"],
  },
];

function SidebarItem({ href, label, icon: Icon, roles, exact }: Route) {
  const { data } = useSession();
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  const isAccessible =
    !roles || (data?.user.role && roles.includes(data?.user.role));

  if (!isAccessible) {
    return null;
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={href}>
          <Icon />
          {label}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default function NavigationSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarItem key={route.href} {...route} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
