import StickyProvider from "./context/StickyContext";
import StickiesPage from "./components/StickiesPage";

function App() {
  return (
    <div id="app">
      <StickyProvider>
        <StickiesPage />
      </StickyProvider>
    </div>
  );
}

export default App;
