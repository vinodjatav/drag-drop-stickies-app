import { useContext, useEffect, useRef, useState } from "react";
import { Sticky } from "../model/Model";
import {
  autoGrow,
  BASE_URL,
  bodyParser,
  setNewOffset,
  setZIndex,
} from "../utils";
import axios from "axios";
import { StickyContext } from "../context/StickyContext";
import { Spinner, Trash } from "../icons/StickyIcons";

interface PropTypes {
  sticky: Sticky;
}
const StickyCard = (props: PropTypes) => {
  const { sticky } = props;

  const { setStickies, setSelectedSticky } = useContext(StickyContext);

  const [position, setPosition] = useState(JSON.parse(sticky.position));
  const [bodyText, setBodyText] = useState(bodyParser(sticky.body));
  const [saving, setSaving] = useState(false);

  const colors = JSON.parse(sticky.colors);
  const body = bodyParser(sticky.body);

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const keyUpTimer = useRef<NodeJS.Timeout | null>(null);

  const updatedStickyValue: Sticky = {
    id: sticky.id,
    body: bodyText,
    colors: sticky.colors,
    position: JSON.stringify(position),
  };

  const updateSticky = (sticky: Sticky) => {
    axios
      .put(`${BASE_URL}/stickies`, {
        id: sticky.id,
        body: sticky.body,
        colors: sticky.colors,
        position: sticky.position,
      })
      .then(() => {
        setSaving(false);
      })
      .catch((error) => {
        console.error("Failed to update sticky: ", error);
      });
  };

  const deleteSticky = (stickyId: number) => {
    axios
      .delete(`${BASE_URL}/stickies/${stickyId}`)
      .then(() => {
        setStickies((prevState) =>
          prevState.filter((sticky) => sticky.id !== stickyId)
        );
      })
      .catch((error) => {
        console.error("Failed to delete sticky: ", error);
      });
  };

  const mouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseStartPos.x = event.clientX;
    mouseStartPos.y = event.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    setZIndex(cardRef.current);
    setSelectedSticky(sticky);
  };

  const mouseMove = (e: MouseEvent) => {
    e.preventDefault();
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const mouseUp = (e: React.MouseEvent<HTMLDivElement> | Event) => {
    e.preventDefault();
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    updateSticky(updatedStickyValue);
  };

  const handleKeyUp = async () => {
    setSaving(true);
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }
    keyUpTimer.current = setTimeout(() => {
      if (textAreaRef.current) {
        setBodyText(JSON.stringify(textAreaRef.current.value));
        updatedStickyValue.body = JSON.stringify(textAreaRef.current.value);
      }
      updateSticky(updatedStickyValue);
    }, 2000);
  };

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <button
          style={{
            backgroundColor: "inherit",
            border: "none",
            cursor: "pointer",
          }}
          onClick={(event) => {
            event.stopPropagation();
            deleteSticky(sticky.id);
          }}
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
          onMouseUp={(event) => {
            event.stopPropagation();
          }}
        >
          <Trash />
        </button>
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onKeyUp={handleKeyUp}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedSticky(sticky);
          }}
        />
      </div>
    </div>
  );
};

export default StickyCard;
