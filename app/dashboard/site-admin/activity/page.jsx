import HotNewsForm from "@/components/shared/Dashboard/SiteAdmin/HotNewsForm";
import React from "react";

const ActivityPage = () => {
  return (
    <>
      <div className="flex items-end gap-4">
        <h1 className="header-2">Activity Page</h1>
        <span className="header-4 opacity-50 capitalize">add hot news</span>
      </div>

      {/* Hot News Form */}
      <div className="mt-6 md:mt-20">
        <HotNewsForm />
      </div>
    </>
  );
};

export default ActivityPage;
