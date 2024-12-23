// Icons
import homeIcon from "@/public/assets/icons/home.png";
import addIcon from "@/public/assets/icons/add-icons.png";

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
  {
    icon: addIcon,
    route: "/dashboard/site-admin/activity",
  },
];

// district admin sidebar navigation
export const districtAdminNav = [
  {
    icon: homeIcon,
    route: "/dashboard/district-admin",
  },
];
