import { useContext } from "react";
import StickyCard from "./StickyCard";
import { Sticky } from "../model/Model";
import Controls from "./Controls";
import { StickyContext } from "../context/StickyContext";

const StickiesPage = () => {
  const { stickies } = useContext(StickyContext);

  return (
    <div>
      {stickies?.map((sticky: Sticky) => (
        <StickyCard key={sticky.id} sticky={sticky} />
      ))}
      <Controls />
    </div>
  );
};

export default StickiesPage;
