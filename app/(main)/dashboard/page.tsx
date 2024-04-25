import JoinTeamButton from "@/components/join-team";
import Sidebar from "@/components/sidebar";
import { currentUser } from "@/lib/current-user";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const Dashboard = async () => {
  const user = await currentUser();

  return (
    <>
      <UserButton />
      <p>Join Team</p>

      <JoinTeamButton />
      <Sidebar />
    </>
  );
};

export default Dashboard;
