// Icons
import homeIcon from "@/public/assets/icons/home.png";

// Data table dummy data
export const getUser = [
  {
    username: "john doe",
    action: "Add page",
    date: new Date().toLocaleString(),
  },
  {
    username: "john doe",
    action: "Add page",
    date: new Date().toLocaleString(),
  },
  {
    username: "john doe",
    action: "Add page",
    date: new Date().toLocaleString(),
  },
  {
    username: "john doe",
    action: "Add page",
    date: new Date().toLocaleString(),
  },
  {
    username: "john doe",
    action: "Add page",
    date: new Date().toLocaleString(),
  },
];

// super admin sidebar navigation
export const superAdminNav = [
  {
    icon: homeIcon,
    route: "/dashboard/super-admin",
  },
];

// site admin sidebar navigation
export const siteAdminNav = [
  {
    icon: homeIcon,
    route: "/dashboard/site-admin",
  },
];

// district admin sidebar navigation
export const districtAdminNav = [
  {
    icon: homeIcon,
    route: "/dashboard/district-admin",
  },
];
