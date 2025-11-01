import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-[#800000] shadow-md py-4 px-8 flex items-center justify-between">
      <h1
        className="text-white text-2xl font-semibold tracking-wide"
        style={{ fontFamily: "Corbel" }}
      >
        SEMIS
      </h1>
    </header>
  );
};

export default Header;
