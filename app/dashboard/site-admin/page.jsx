import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/Dashboard/SiteAdmin/DataTable/DataTable";
import { columns } from "@/components/shared/Dashboard/SiteAdmin/DataTable/Colums";

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
  return (
    <div>
      <div>
        <Input type="text" name="search" />
      </div>
      <div>
        {/* Data Table Component */}
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default SiteAdminPage;
