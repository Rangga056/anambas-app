"use client";

import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/Dashboard/SiteAdmin/DataTable/DataTable";
// import { columns } from "@/components/shared/Dashboard/SiteAdmin/DataTable/Colums";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Search } from "lucide-react";
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
import { columns } from "@/components/shared/Dashboard/SiteAdmin/DataTable/Colums";
import { useUserActivityStore } from "@/app/stores/userStore";
import { useEffect } from "react";
import { fetchUserActivity } from "@/lib/actions/site-admin/activity.actions";

const SiteAdminPage = () => {
  const { data, setData } = useUserActivityStore();

  // Define the getData function
  const getData = async () => {
    try {
      const fetchedData = await fetchUserActivity();
      console.log(fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data on initial render
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <header className="flex-between gap-x-4">
        {/* Bread crumbs */}
        <Breadcrumb className="paragraph-2 font-medium text-black opacity-100">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        {/* Search Bar */}
        <div className="hidden md:flex rounded-full bg-grey-50 px-2 py-1 border max-w-[500px] flex-1">
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
      <div className="mt-20">
        <div className="flex items-center gap-3">
          <Button
            onClick={getData}
            className="p-2 rounded-full active:scale-95 transition-transform"
          >
            <RefreshCcw className="text-white" />
          </Button>
          <span className="paragraph-3">Refresh Data</span>
        </div>
        <div className="overflow-x-scroll">
          <div className="mt-8 min-w-max">
            {/* Data Table Component */}
            <DataTable columns={columns} data={data || []} />
            {/* {data} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteAdminPage;
