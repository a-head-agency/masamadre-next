"use client";

import { CrossIcon } from "@/icons";
import { useCallback } from "react";
import { deleteCard } from "../_actions";

interface Props {
  cardId: number;
}

export default function DeleteCard({ cardId }: Props) {
  const onClick = useCallback(() => {
    deleteCard(cardId);
  }, [cardId]);

  return (
    <button type="button" className="flex items-center justify-center" onClick={onClick}>
      <CrossIcon className="h-4" />
    </button>
  );
}
