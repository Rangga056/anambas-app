import Sidebar from "@/components/shared/Dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="max-w-[2160px] mx-auto flex">
      {/* Sidebar */}
      <nav className="bg-black w-20 p-4 py-12 fixed min-h-screen">
        <Sidebar />
      </nav>
      <main className="ml-20 p-12 w-full">{children}</main>
    </div>
  );
}
