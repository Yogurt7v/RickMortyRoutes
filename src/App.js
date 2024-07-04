import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  NavMenu,
  Home,
  Categories,
  Heroes,
  Episodes,
  Locations,
  NotFound,
  SingleEpisode,
  SingleHero,
  SingleLocation,
} from "./components";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavMenu />}>
          <Route index element={<Home />} />
          <Route path="/categories">
            <Route index element={<Categories />} />
            <Route path="heroes">
              <Route index element={<Heroes />} />
              <Route path=":id" element={<SingleHero />} />
            </Route>
            <Route path="episodes"  >
              <Route index element={<Episodes />} />
              <Route path=":id" element={<SingleEpisode />} />
            </Route>
            <Route path="locations"  >
              <Route index element={<Locations />} />
              <Route path=":id" element={<SingleLocation />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
