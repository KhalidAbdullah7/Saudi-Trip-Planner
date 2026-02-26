import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { PlannerPage } from "./pages/PlannerPage";
import { ItineraryPage } from "./pages/ItineraryPage";
import { ExplorePage } from "./pages/ExplorePage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan" element={<PlannerPage />} />
        <Route path="/itinerary/:tripId" element={<ItineraryPage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Route>
    </Routes>
  );
}
