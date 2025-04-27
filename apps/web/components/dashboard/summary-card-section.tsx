import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface SummaryCardSectionProps {
  totalRooms: number;
  recentActivityCount: number;
}
export const SummaryCardSection = ({
  totalRooms,
  recentActivityCount,
}: SummaryCardSectionProps) => {
  return (
    <div className="mb-8 p-5 px-10">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Activity Summary</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRooms}</div>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Collaborators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Across all rooms
            </p>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentActivityCount}</div>
            <p className="text-xs text-muted-foreground">
              Edits in the last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
