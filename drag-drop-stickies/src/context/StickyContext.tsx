import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { Sticky } from "../model/Model";
import { Spinner } from "../icons/StickyIcons";

const sticky: Sticky = {
  id: 0,
  body: "",
  colors: "",
  position: "",
};

const defaultValue: {
  stickies: Sticky[];
  setStickies: React.Dispatch<React.SetStateAction<Sticky[]>>;
  selectedSticky: Sticky;
  setSelectedSticky: React.Dispatch<React.SetStateAction<Sticky>>;
} = {
  stickies: [sticky],
  setStickies: () => {},
  selectedSticky: sticky,
  setSelectedSticky: () => {},
};
export const StickyContext = createContext(defaultValue);

const StickyProvider = ({ children }: { children: React.ReactNode }) => {
  const [stickies, setStickies] = useState<Sticky[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSticky, setSelectedSticky] = useState<Sticky>(sticky);

  const fetchAllStickies = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/stickies`)
      .then((response) => {
        setStickies(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch stickies: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const contextData = {
    stickies,
    setStickies,
    selectedSticky,
    setSelectedSticky,
  };

  useEffect(() => {
    fetchAllStickies();
  }, []);

  return (
    <StickyContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </StickyContext.Provider>
  );
};

export default StickyProvider;
