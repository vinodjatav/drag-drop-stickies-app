import { MouseMoveDirection } from "./model/Model";

export const setNewOffset = (
  card: HTMLDivElement | null,
  mouseMoveDir: MouseMoveDirection = { x: 0, y: 0 }
): MouseMoveDirection => {
  if (!card) {
    return { x: 0, y: 0 };
  }

  const offsetLeft = Math.max(0, card.offsetLeft - mouseMoveDir.x);
  const offsetTop = Math.max(0, card.offsetTop - mouseMoveDir.y);

  return { x: offsetLeft, y: offsetTop };
};

export const autoGrow = (textAreaRef: React.RefObject<HTMLTextAreaElement>) => {
  const { current } = textAreaRef;
  if (current) {
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
  }
};

export const setZIndex = (selectedCard: HTMLDivElement | null) => {
  const cards = Array.from(
    document.getElementsByClassName("card")
  ) as HTMLDivElement[];

  if (selectedCard) {
    const newZIndex = parseInt(selectedCard.style.zIndex || "0") + 1;
    selectedCard.style.zIndex = newZIndex.toString();

    cards.forEach((card) => {
      if (card !== selectedCard) {
        card.style.zIndex = (newZIndex - 1).toString();
      }
    });
  } else {
    cards.forEach((card) => (card.style.zIndex = "0"));
  }
};

export const BASE_URL = "http://localhost:8080/api";

export const bodyParser = (value: string): string => {
  try {
    const parsedValue = JSON.parse(value);
    return parsedValue;
  } catch (error) {
    return value;
  }
};
