import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  NavMenu,
  Home,
  Categories,
  Heroes,
  Episodes,
  Locations,
  Login,
  NotFound,
  PrivateRoute,
  SingleEpisode,
  SingleHero,
  SingleLocation,
} from "./components";
import { AuthProvider } from "./context/AuthProvider";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<NavMenu />}>
            <Route index element={<Home />} />
            <Route path="/categories">
              <Route index element={<Categories />} />
              <Route path="heroes">
                <Route index element={<Heroes />} />
                <Route
                  path=":id"
                  element={
                    <PrivateRoute>
                      <SingleHero />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path="episodes">
                <Route index element={<Episodes />} />
                <Route
                  path=":id"
                  element={
                    <PrivateRoute>
                      <SingleEpisode />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path="locations">
                <Route index element={<Locations />} />
                <Route
                  path=":id"
                  element={
                    <PrivateRoute>
                      <SingleLocation />
                    </PrivateRoute>
                  }
                />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
