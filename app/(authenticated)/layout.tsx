import { FC, ReactNode } from "react";
import { Layout } from "@/components/Layout";
import { Navigation } from "@/components/ui/compositions";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@/lib/auth";
import { updateUser } from "./users/user.action";
import { service } from "@/lib/services";

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = async ({ children }) => {
  const session = await auth.session({ required: false });

  const user = await service.getUser(session?.user.id!);

  if (!session) redirect("/auth/login", RedirectType.replace);

  return (
    <Layout>
      <Navigation
        name={user?.firstName!}
        updateUserHandler={updateUser}
        defaultValues={session.user}
      />
      {children}
    </Layout>
  );
};

export default RootLayout;
