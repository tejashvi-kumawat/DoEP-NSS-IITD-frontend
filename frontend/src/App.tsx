import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true, // Enables React.startTransition for smoother updates
        v7_relativeSplatPath: true, // Prepares for v7 relative splat path changes
      }}
    >
      <Routes>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
