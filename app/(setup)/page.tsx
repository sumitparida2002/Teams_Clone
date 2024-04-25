import { db } from "@/lib/db";
import { initialUser } from "@/lib/initial-user";
import { redirect } from "next/navigation";
import React from "react";

export default async function Setup() {
  const user = await initialUser();

  const teams = await db.team.findFirst({
    where: {
      members: {
        some: {
          userId: user!.id,
        },
      },
    },
  });

  return redirect("/dashboard");
}
