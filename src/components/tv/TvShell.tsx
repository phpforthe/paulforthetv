import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useSpatialNavigation, useAutoFocusFirst } from "@/lib/tv-focus";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { listenWebOSBack } from "@/lib/webos";

export function TvShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  useSpatialNavigation(() => router.history.back());
  useAutoFocusFirst([]);

  useEffect(() => {
    return listenWebOSBack(() => router.history.back());
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-24 min-h-screen px-10 py-8">{children}</main>
    </div>
  );
}
