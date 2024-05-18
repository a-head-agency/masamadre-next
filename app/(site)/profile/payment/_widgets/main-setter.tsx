"use client";

import { useRouter } from "next/navigation";
import { setCardAsMain } from "../_actions";

interface Props {
  isMain: boolean;
  cardId: number;
}

function MainSetter(props: Props) {
  const router = useRouter();
  const setMain = async (id: number) => {
    await setCardAsMain(id);
    router.refresh();
  };
  return (
    <>
      {props.isMain ? (
        <span className="opacity-50 lowercase text-start">основная карта</span>
      ) : (
        <button
          type="button"
          className="lowercase text-green-400 text-start"
          onClick={() => setMain(props.cardId)}
        >
          сделать основной
        </button>
      )}
    </>
  );
}

export default MainSetter;
