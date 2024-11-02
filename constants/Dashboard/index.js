// Icons
import homeIcon from "@/public/assets/icons/home.png";

// Data table dummy data
export const getUser = [
  {
    username: "john doe",
    action: "Add page",
    date: new Date().toLocaleString(),
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, fugiat quam! Ut hic incidunt cum expedita. Consequuntur voluptas doloribus dolores, inventore impedit similique temporibus illum ab veritatis obcaecati laboriosam deserunt.",
  },
  {
    username: "john smith",
    action: "Add page",
    date: "11/1/2024, 10:34:21 AM",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, fugiat quam! Ut hic incidunt cum expedita.",
  },
  {
    username: "jane doe",
    action: "Delete page",
    date: "10/29/2024, 2:15:47 PM",
    desc: "Consequuntur voluptas doloribus dolores, inventore impedit similique temporibus illum ab veritatis obcaecati laboriosam deserunt.",
  },
  {
    username: "alex johnson",
    action: "Update page",
    date: "10/28/2024, 5:02:13 PM",
    desc: "Dolorum fuga quas maiores cum, odit eligendi eaque accusamus minus autem voluptates.",
  },
  {
    username: "chris brown",
    action: "Add page",
    date: "10/25/2024, 9:23:12 AM",
    desc: "Similique omnis ipsum, velit suscipit voluptate aliquid corporis, asperiores dolorem ex perferendis!",
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
