import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavMenu } from "./components/Navmenu";
import { AuthProvider } from "./context/AuthProvider";
import "./App.css";
import { lazy, Suspense, useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

const Home = lazy(() =>
  import("./components/Home").then((module) => ({ default: module.Home }))
);
const Categories = lazy(() =>
  import("./components/Categories").then((module) => ({
    default: module.Categories,
  }))
);
const Heroes = lazy(() =>
  import("./components/Heroes").then((module) => ({ default: module.Heroes }))
);
const Episodes = lazy(() =>
  import("./components/Episodes").then((module) => ({
    default: module.Episodes,
  }))
);
const Locations = lazy(() =>
  import("./components/Locations").then((module) => ({
    default: module.Locations,
  }))
);
const Login = lazy(() =>
  import("./components/Login").then((module) => ({ default: module.Login }))
);
const NotFound = lazy(() =>
  import("./components/NotFound").then((module) => ({
    default: module.NotFound,
  }))
);
const PrivateRoute = lazy(() =>
  import("./components/PrivateRoute").then((module) => ({
    default: module.PrivateRoute,
  }))
);
const SingleEpisode = lazy(() =>
  import("./components/SingleEpisode").then((module) => ({
    default: module.SingleEpisode,
  }))
);
const SingleHero = lazy(() =>
  import("./components/SingleHero").then((module) => ({
    default: module.SingleHero,
  }))
);
const SingleLocation = lazy(() =>
  import("./components/SingleLocation").then((module) => ({
    default: module.SingleLocation,
  }))
);

function App() {
  const [heroes, setHeroes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [heroesRes, locationsRes, episodesRes] = await Promise.all([
        fetch("https://rickandmortyapi.com/api/character"),
        fetch("https://rickandmortyapi.com/api/location"),
        fetch("https://rickandmortyapi.com/api/episode")
      ]);
      const heroes = await heroesRes.json();
      const locations = await locationsRes.json();
      const episodes = await episodesRes.json();
      setHeroes(heroes.results);
      setLocations(locations.results);
      setEpisodes(episodes.results);
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<NavMenu />}>
            <Route index element={<Home />} />
            <Route path="/categories">
              <Route index element={<Categories />} />
              <Route path="heroes">
                <Route index element={<ErrorBoundary><Heroes heroes={heroes}/></ErrorBoundary>} />
                <Route
                  path=":id"
                  element={
                    <PrivateRoute>
                      <ErrorBoundary>
                      <SingleHero />
                      </ErrorBoundary>
                    </PrivateRoute>
                  }
                />
              </Route>
              
              <Route path="episodes">
                <Route index element={<Episodes episodes={episodes} />} />
                <Route
                  path=":id"
                  element={
                    <PrivateRoute>
                      <ErrorBoundary>
                      <SingleEpisode />
                      </ErrorBoundary>
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path="locations">
                <Route index element={<Locations locations={locations} />} />
                <Route
                  path=":id"
                  element={
                    <PrivateRoute>
                      <ErrorBoundary>
                      <SingleLocation />
                      </ErrorBoundary>
                    </PrivateRoute>
                  }
                />
              </Route>
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NotFound />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
