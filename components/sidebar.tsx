"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";
import React from "react";

export default function Sidebar() {
  const { onOpen } = useModal();

  return (
    <button
      onClick={() => onOpen("createTeam")}
      className="group flex items-center"
    >
      <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
        <Plus
          className="group-hover:text-white transition text-emerald-500"
          size={25}
        />
      </div>
    </button>
  );
}
