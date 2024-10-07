"use client";

import withAuth from "@/app/hoc/withAuth";
import React from "react";

const SiteAdminPage = () => {
  return (
    <div>
      <div>This is site admin Page</div>
    </div>
  );
};

export default withAuth(SiteAdminPage, "site admin");
