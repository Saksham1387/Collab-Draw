"use client";
import { useState } from "react";
import {
  Square,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DesignToolbar() {
  const [selectedTool, setSelectedTool] = useState("pointer");

  const tools = [
    { id: "square", icon: Square, label: "Rectangle" },
    { id: "circle", icon: Circle, label: "Circle" },
  ];

  return (
    <div className="flex items-center justify-center p-4 bg-gray-500 rounded-lg shadow-lg">
      <div className="flex items-center space-x-1">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={cn(
              "p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50",
              selectedTool === tool.id
                ? "bg-indigo-900"
                : "bg-transparent hover:bg-gray-800"
            )}
            onClick={() => setSelectedTool(tool.id)}
            title={tool.label}
            aria-label={tool.label}
          >
            <tool.icon className="w-5 h-5 text-gray-200" />
          </button>
        ))}
      </div>
    </div>
  );
}
