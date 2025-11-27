import type { FC, Key } from "react";

export interface BreadcrumbItem {
  title: string;
  path?: string;
}

export const RouteGroup = {
  RESOURCES: "Resources",
  MANAGEMENT: "Gerenciamento",
} as const;

export type RouteGroup = (typeof RouteGroup)[keyof typeof RouteGroup];

export interface SingleRoute {
  key?: Key;
  path: string;
  hidden?: boolean;
  title?: string;
  icon?: FC;
  page: FC;
  children?: undefined;
  breadcrumbs?: BreadcrumbItem[];
  allowedRoles?: string[];
  activeIcon?: string;
  disabled?: boolean;
  withoutLayout?: boolean;
  group?: RouteGroup;
}

export interface GroupedRoute {
  title?: string;
  children: SingleRoute[];
  icon?: FC;
  breadcrumbs?: BreadcrumbItem[];
}

export type Route = SingleRoute | GroupedRoute;
