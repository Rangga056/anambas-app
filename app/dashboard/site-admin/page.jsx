"use client";

import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/Dashboard/SiteAdmin/DataTable/DataTable";
import { columns } from "@/components/shared/Dashboard/SiteAdmin/DataTable/Colums";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const data = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];
const SiteAdminPage = () => {
  // const data = await getData();
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL; // Replace with your Laravel API URL
  axios.defaults.withCredentials = true; // Add this line to enable credentials

  async function handleClick() {
    const res = await axios.get("/activity");
    console.log(res.data);
    console.log("test");
  }
  return (
    <div>
      {/* Header */}
      <header className="flex-between">
        {/* Bread crumbs */}
        <Breadcrumb className="paragraph-3 font-medium text-black opacity-100">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbEllipsis />
          </BreadcrumbList>
        </Breadcrumb>
        {/* Search Bar */}
        <div className="flex rounded-full bg-grey-50 px-2 py-1 border max-w-[500px] flex-1">
          <Input
            type="text"
            name="search"
            className="bg-transparent border-0 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button className="bg-transparent p-0 aspect-square hover:bg-transparent active:scale-95">
            <Search className="text-black" />
          </Button>
        </div>
        {/* Username */}
        <p className="paragraph-3 font-medium">Username</p>
      </header>

      {/* Main Content */}
      <main className="mt-20">
        {/* Data Table Component */}
        <DataTable columns={columns} data={data} />
      </main>
      <Button onClick={handleClick} className="mt-8 rounded-lg" size="lg">
        testing
      </Button>
    </div>
  );
};

export default SiteAdminPage;
