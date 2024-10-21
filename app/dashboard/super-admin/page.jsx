"use client";

import withAuth from "@/app/hoc/withAuth";
import React from "react";

const SuperAdminPage = () => {
  return (
    <div>
      <div>This is Super admin Page</div>
    </div>
  );
};

export default withAuth(SuperAdminPage, "superadmin");
