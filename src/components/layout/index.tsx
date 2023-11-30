import { PropsWithChildren } from "react";

import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen  w-full">
      <Menu />
      <div className="">
        <Breadcrumb />
        <div>{children}</div>
      </div>
    </div>
  );
};
