import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/current-user";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentUser();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.team.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          userId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/teams/${existingServer.id}`);
  }

  const server = await db.team.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            userId: profile.id,
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/teams/${server.id}`);
  }

  return null;
};

export default InviteCodePage;
