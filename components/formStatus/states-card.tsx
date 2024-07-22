"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface StatesCard {
  title: string;
  icon: React.ReactNode;
  helperText: string;
  value: string;
  className: string;
  loading: boolean;
}
const StatesCard = ({
  title,
  icon,
  helperText,
  value,
  className,
  loading,
}: StatesCard) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-zinc-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-zinc-500 pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
};

export default StatesCard;
