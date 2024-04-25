"use client";

import { CreateTeamModal } from "@/components/modal/create-team-modal";
import { JoinTeamModal } from "@/components/modal/join-team-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateTeamModal />
      <JoinTeamModal />
    </>
  );
};
