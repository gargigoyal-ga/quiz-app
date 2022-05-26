import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store.js";
import LandingPage from "./components/landingPage";


function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <div className="App">
        <LandingPage />
      </div>
    </PersistGate>
  );
}

export default App;
