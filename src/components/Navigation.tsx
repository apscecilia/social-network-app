"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, PlusSquare } from "lucide-react";

export default function Navigation() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const tabs = [
    { name: "Home", href: "/", icon: Home },
    { name: "Create", href: "/create", icon: PlusSquare },
    { name: "Profile", href: `/profile/${user.uid}`, icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t">
      <div className="flex justify-around p-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center ${
                isActive ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 