import ReactDOM from "react-dom/client";
import { SearchParams } from "./components/SearchParams/SearchParams";

export const App = () => {
  return (
    <div>
      <h1>Adopt me!</h1>
      <SearchParams />
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
