import { FC, ReactNode } from "react";
import { Layout } from "@/components/Layout";
import { Navigation } from "@/components/ui/compositions";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@/lib/auth";
import { updateUser } from "./users/user.action";

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = async ({ children }) => {
  const session = await auth.session({ required: false });

  if (!session) redirect("/auth/login", RedirectType.replace);

  return (
    <Layout>
      <Navigation
        name={session.user.firstName}
        updateUserHandler={updateUser}
        defaultValues={session.user}
      />
      {children}
    </Layout>
  );
};

export default RootLayout;
