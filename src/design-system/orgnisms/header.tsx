import React from "react";
import { ModeToggle } from "@/design-system/atoms/theme-change-button";

const Header = () => {
  return (
    <div className="fixed w-full bg-card top-0 z-50">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="icon font-bold text-2xl">tDepo Faucet</div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
