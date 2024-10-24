"use client";

import withAuth from "@/app/hoc/withAuth";
import { Input } from "@/components/ui/input";
import React from "react";

const SiteAdminPage = () => {
  return (
    <div>
      <div>
        <Input type="text" name="search" />
      </div>
      <div>This is site admin Page</div>
    </div>
  );
};

export default withAuth(SiteAdminPage, "siteadmin");
// export default SiteAdminPage;
