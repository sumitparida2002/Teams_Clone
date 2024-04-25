import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const initialUser = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect(`/sign-in`);
  }

  const profile = await db.user.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newUser = await db.user.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};
