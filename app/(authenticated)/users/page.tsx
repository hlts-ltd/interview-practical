import { columns } from "@/app/(authenticated)/users/columns";
import DataTable from "@/app/(authenticated)/users/data-table";
import { prisma } from "@/database/prisma";

export default async function Home() {
  
  const users = await prisma.user.findMany();


  // In our example we use local data
  return (
    <div className="container p-2">
      <DataTable data={users} columns={columns} />
    </div>
  );
}