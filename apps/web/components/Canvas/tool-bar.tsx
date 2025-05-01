import { Circle, Link, Minus, Pencil, Share, Square, Type } from "lucide-react";
import { Tool } from "../main-canvas";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

const tools = [
  { id: "rect", icon: Square, label: "Rectangle" },
  { id: "circle", icon: Circle, label: "Circle" },
  { id: "pencil", icon: Pencil, label: "Pencil" },
  { id: "straight-line", icon: Minus, label: "straight-line" },
  { id: "text", icon: Type, label: "text" },
];

interface ToolBarProps {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
}
export const ToolBar = ({ selectedTool, setSelectedTool }: ToolBarProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCopied,setIsCopied] = useState(false)

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true)
  }
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center space-x-3 bg-white rounded-lg shadow-lg p-1">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={cn(
              "p-2 rounded-md transition-all focus:outline-none cursor-pointer",
              selectedTool === tool.id
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
            onClick={() => setSelectedTool(tool.id as Tool)}
            title={tool.label}
            aria-label={tool.label}
          >
            <tool.icon className="w-4 h-4" />
          </button>
        ))}

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <div className="border-l-2 border-black">
              <div className="pl-2">
                <button className="text-white p-2 rounded-lg bg-blue-500 pl-2 cursor-pointer">
                  <div className="flex flex-row gap-3 items-center justify-center text-sm">
                    Share
                    <Share className="w-6 h-5" />
                  </div>
                </button>
              </div>
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] items-center bg-[#24232a] flex flex-col gap-10 justify-center">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>Share this canvas with your friends</DialogTitle>
              <DialogDescription>
                Copy the link and share it with them
              </DialogDescription>
            </DialogHeader>
            <Share className="w-10 h-10" />
            <DialogFooter className="flex items-center justify-center flex-row">
              <Button className="bg-blue-500 text-white hover:bg-blue-500/90 text-md p-5 cursor-pointer" onClick={handleShareLink}>
                {isCopied ? "Copied !":"Copy Link"}
                <Link />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
