import { HashRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard.jsx";
import { CreateRoom } from "./pages/CreateRoom.jsx";
import { ProductLibrary } from "./pages/ProductLibrary.jsx";
import { RoomProducts } from "./pages/RoomProducts.jsx";
import { PreviewConfig } from "./pages/PreviewConfig.jsx";
import { Workbench } from "./pages/Workbench.jsx";
import { PresenterView } from "./pages/PresenterView.jsx";
import { StreamMonitor } from "./pages/StreamMonitor.jsx";
import { Simulate } from "./pages/Simulate.jsx";
import { DataReview } from "./pages/DataReview.jsx";

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/library" element={<ProductLibrary />} />
        <Route path="/room/:id/products" element={<RoomProducts />} />
        <Route path="/room/:id/preview" element={<PreviewConfig />} />
        <Route path="/room/:id/review" element={<DataReview />} />
        <Route path="/room/:id/simulate" element={<Simulate />} />
        <Route path="/workbench" element={<Workbench />} />
        <Route path="/presenter" element={<PresenterView />} />
        <Route path="/stream" element={<StreamMonitor />} />
      </Routes>
    </HashRouter>
  );
}
