import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

interface ServerIdPageProps {
  params: {
    teamId: string;
  };
}

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const profile = await currentUser();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.team.findUnique({
    where: {
      id: params.teamId,
      members: {
        some: {
          userId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/teams/${params.teamId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
