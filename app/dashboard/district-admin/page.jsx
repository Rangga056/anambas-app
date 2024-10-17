"use client";

import withAuth from "@/app/hoc/withAuth";
import React from "react";

const DistrictAdmin = () => {
  return (
    <div>
      <div>This is district admin Page</div>
    </div>
  );
};

export default withAuth(DistrictAdmin, "district admin");
