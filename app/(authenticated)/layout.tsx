import { FC, ReactNode } from "react";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@/lib/auth";
import Layout from "@/components/Layout";
import { Logout } from "@/components/Logout";

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = async ({ children }) => {
  const session = await auth.session({ required: false });

  if (!session) redirect("/auth/login", RedirectType.replace);

  return (
    <Layout
      slotProps={{
        body: {
          className: "flex flex-col min-h-screen bg-gray-900",
        },
      }}
    >
      {/* Top Navigation Bar */}
      <div className="w-full flex justify-between items-center px-6 py-4 bg-gray-800 text-white shadow-md fixed top-0 left-0 z-10">
        <p className="text-lg font-semibold">Welcome, {session.user.name}!</p>
        <Logout />
      </div>

      {/* Main Content */}
      <div className="flex-auto self-start mt-20 p-4">
        {/* Team Members Section */}
        {children}
      </div>
    </Layout>
  );
};

export default RootLayout;
