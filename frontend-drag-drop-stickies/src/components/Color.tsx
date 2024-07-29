import { useContext } from "react";
import { Color as ColorInterface, Sticky } from "../model/Model";
import { StickyContext } from "../context/StickyContext";
import axios from "axios";
import { BASE_URL } from "../utils";

interface PropTypes {
  color: ColorInterface;
}
const Color = (props: PropTypes) => {
  const { color } = props;

  const { selectedSticky, stickies, setStickies } = useContext(StickyContext);

  const updateSticky = (sticky: Sticky) => {
    axios
      .put(`${BASE_URL}/stickies`, {
        id: sticky.id,
        body: sticky.body,
        colors: sticky.colors,
        position: sticky.position,
      })
      .then(() => {
        console.info("Selected sticky color updated successfully!");
      })
      .catch((error) => {
        console.error("Failed to update sticky color: ", error);
      });
  };

  const handleChangeColor = () => {
    try {
      const currentStickyIndex = stickies.findIndex(
        (sticky) => sticky.id === selectedSticky.id
      );
      const updatedSticky = {
        ...stickies[currentStickyIndex],
        colors: JSON.stringify(color),
      };
      const newStickies = [...stickies];
      newStickies[currentStickyIndex] = updatedSticky;
      setStickies(newStickies);
      updateSticky(updatedSticky);
    } catch (error) {
      alert("You must select a sticky before changing colors");
    }
  };
  return (
    <div
      className="color"
      style={{
        backgroundColor: color.colorHeader,
      }}
      onClick={handleChangeColor}
    />
  );
};

export default Color;
