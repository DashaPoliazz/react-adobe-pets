import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { SearchParams } from "./components/SearchParams/SearchParams";
import { Details } from "./components/Details/Details";
import { queryClient } from "./queryClient";

export const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <header>
          <Link to="/" element={<h1>Adopt me!</h1>}></Link>
        </header>
        <Routes>
          <Route path="/" element={<SearchParams />} />
          <Route path="details/:id" element={<Details />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
