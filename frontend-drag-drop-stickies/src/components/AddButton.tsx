import { useContext, useEffect, useRef } from "react";
import { Plus } from "../icons/StickyIcons";
import { Sticky } from "../model/Model";
import colors from "../assets/colors.json";
import axios from "axios";
import { BASE_URL } from "../utils";
import { StickyContext } from "../context/StickyContext";

const AddButton = () => {
  const addButtonRef = useRef<HTMLDivElement>(null);
  const { setStickies } = useContext(StickyContext);

  const startingPos = useRef(10);

  const createSticky = (payload: Sticky) => {
    axios
      .post(`${BASE_URL}/stickies`, {
        body: payload.body,
        colors: payload.colors,
        position: payload.position,
      })
      .then((response) => {
        setStickies((prevState) => [...prevState, response.data]);
      })
      .catch((error) => {
        console.error("Failed to create a sticky: ", error);
      });
  };
  const addSticky = async () => {
    const payload: Sticky = {
      id: 0,
      body: "",
      colors: JSON.stringify(colors[0]),
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
    };
    startingPos.current += 10;
    createSticky(payload);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key === "n" || event.key === "N")) {
        addButtonRef.current?.click();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div ref={addButtonRef} id="add-btn" onClick={addSticky}>
      <Plus />
    </div>
  );
};

export default AddButton;
