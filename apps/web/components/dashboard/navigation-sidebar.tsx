"use client";

import Link from "next/link";
import { UserRoles } from "@dmu/prisma/client";
import { HomeIcon, LucideIcon, StoreIcon, Users2Icon } from "lucide-react";

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
import { useParams, usePathname } from "next/navigation";

type Route = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles?: UserRoles[];
  exact?: boolean;
};

const baseRoutes: Route[] = [
  {
    href: "/dashboard/establishments",
    label: messages.common.establishments,
    icon: StoreIcon,
    exact: true,
  },
];

const adminRoutes: Route[] = [
  ...baseRoutes,
  {
    href: "/dashboard/users",
    label: messages.common.users,
    icon: Users2Icon,
    roles: ["admin"],
  },
];

const ownerRoutes = (est?: string): Route[] => {
  let routes: Route[] = [...baseRoutes];

  if (est) {
    routes = [
      {
        href: `/dashboard/establishments/${est}`,
        label: "Основные данные",
        icon: HomeIcon,
        exact: true,
      },
      ...routes,
    ];
  }

  return routes;
};

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
  const { data: session } = useSession();
  const { est } = useParams<{ est?: string }>();
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {session?.user.role === "admin" &&
              adminRoutes.map((route) => (
                <SidebarItem key={route.href} {...route} />
              ))}
            {session?.user.role === "owner" &&
              ownerRoutes(est).map((route) => (
                <SidebarItem key={route.href} {...route} />
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
