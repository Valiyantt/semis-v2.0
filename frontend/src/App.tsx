import React from "react";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <h2 className="text-gray-700 text-lg">Welcome to SEMIS</h2>
      </main>
    </div>
  );
};

export default App;
