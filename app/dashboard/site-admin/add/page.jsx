"use client";

import ActivityForm from "@/components/shared/Dashboard/SiteAdmin/Add/ActivityForm";
import HotNewsForm from "@/components/shared/Dashboard/SiteAdmin/Add/HotNewsForm";
import NewsForm from "@/components/shared/Dashboard/SiteAdmin/Add/NewsForm";
import SectionTag from "@/components/shared/SectionTag";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React, { useState } from "react";

const AddPage = () => {
  const [formType, setFormType] = useState("hot-news");

  const handleFormChange = (value) => {
    setFormType(value);
  };

  let formComponent;
  switch (formType) {
    case "news":
      formComponent = <NewsForm />;
      break;
    case "activity":
      formComponent = <ActivityForm />;
      break;
    case "hot-news":
    default:
      formComponent = <HotNewsForm />;
  }
  return (
    <>
      <header>
        <Breadcrumb className="font-medium text-black opacity-100">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link className="paragraph-2" href="/dashboard/site-admin/">
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link className="paragraph-2" href="/dashboard/site-admin/add/">
                  Add
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Select onValueChange={handleFormChange} value={formType}>
                  <SelectTrigger className="w-max">
                    <SelectValue className="body" placeholder="Select Form" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Form Types</SelectLabel>
                      <SelectItem value="hot-news">Hot News</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="mt-4">
        {/* Add Hot News */}
        <div className="mt-4">
          <div className="flex-between w-full">
            <SectionTag name={formType} />
          </div>
          {/* Dynamic Form Rendering */}
          {formComponent}
        </div>
      </main>
    </>
  );
};

export default AddPage;
