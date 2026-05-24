"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrizePoolProps {
  currentPool: number;
  targetPool: number;
  tiers: { rank: string; amount: number; percentage: number }[];
}

export function PrizePoolTracker({ currentPool, targetPool, tiers }: PrizePoolProps) {
  const progressValue = (currentPool / targetPool) * 100;

  return (
    <Card className="bg-card/40 backdrop-blur-md border-primary/20 overflow-hidden shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 px-6">
        <CardTitle className="text-base md:text-lg font-headline font-bold uppercase tracking-tight">Cagnotte Live</CardTitle>
        <TrendingUp className="w-5 h-5 text-primary animate-pulse" />
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl md:text-4xl font-headline font-bold text-primary tabular-nums">
            {currentPool.toLocaleString()} FC
          </span>
          <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-wider">/ Obj. {targetPool.toLocaleString()} FC</span>
        </div>
        
        <Progress value={progressValue} className="h-2 mb-6 bg-muted border border-white/5" />

        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 border-b border-white/5 pb-1">Répartition des Gains</h4>
          {tiers.map((tier, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-background/50 border border-white/5 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px]",
                  idx === 0 ? "bg-primary text-white shadow-sm" : "bg-muted text-muted-foreground"
                )}>
                  {idx + 1}
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-tight">{tier.rank}</p>
                  <p className="text-[10px] text-muted-foreground">{tier.percentage}% de la pool</p>
                </div>
              </div>
              <p className="font-headline font-bold text-primary text-sm">{tier.amount.toLocaleString()} FC</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
