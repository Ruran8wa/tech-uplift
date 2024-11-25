import React from "react";
import { Logo } from "./logo";
import SideBarRoutes from "./SideBarRoutes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
      <div className="flex items-center gap-2 p-6">
        <Logo />
        <Link href="/">
          <h1 className="cursor-pointer text-xl font-bold text-emerald-600">
            TECH UPLIFT
          </h1>
        </Link>
      </div>
      <div className="flex w-full flex-col">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
