
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Users, Star, DollarSign, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PrizePoolTracker } from "@/components/shared/prize-pool-tracker";
import { useDoc, useFirestore, useCollection } from "@/firebase";
import { doc, collection } from "firebase/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function Home() {
  const db = useFirestore();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const configRef = useMemo(() => (db ? doc(db, "settings", "config") : null), [db]);
  const sponsorsRef = useMemo(() => (db ? collection(db, "sponsors") : null), [db]);
  
  const { data: siteConfig } = useDoc(configRef);
  const { data: sponsors } = useCollection(sponsorsRef);

  const defaultHero = PlaceHolderImages.find(img => img.id === 'hero-bg')?.imageUrl || "https://picsum.photos/seed/onecup-hero/1920/1080";
  const heroImage = siteConfig?.heroImageUrl || defaultHero;
  
  const heroTitle = siteConfig?.heroTitle || "DEVENEZ UNE LÉGENDE.\nLA GLOIRE VOUS APPELLE.";
  const heroSubtitle = siteConfig?.heroSubtitle || "ONECUP 2026 : L'événement unique où le talent rencontre l'excellence. Rejoignez la compétition officielle.";
  const heroVideoUrl = siteConfig?.heroVideoUrl || "";

  const currentPool = siteConfig?.currentPrizePool || 0;
  const targetPool = siteConfig?.targetPrizePool || 5000000;

  const stats = [
    { label: "Écoles Élite", value: siteConfig?.statSchools || "32+", icon: Users, color: "text-blue-500" },
    { label: "Matchs Épiques", value: siteConfig?.statMatches || "15+", icon: Trophy, color: "text-yellow-500" },
    { label: "Cagnotte Globale", value: `${(currentPool / 1000000).toFixed(1)}M FC`, icon: DollarSign, color: "text-green-500" },
    { label: "Talents Révélés", value: siteConfig?.statTalents || "257+", icon: Star, color: "text-red-500" },
  ];

  const tiers = [
    { rank: "Champion OneCup", amount: Math.floor(currentPool * 0.74), percentage: 74 },
    { rank: "Finaliste Argent", amount: Math.floor(currentPool * 0.15), percentage: 15 },
    { rank: "Soulier d'Élite", amount: Math.floor(currentPool * 0.07), percentage: 7 },
  ];

  return (
    <div className="flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="OneCup Action"
            fill
            className="object-cover opacity-60"
            priority
            style={{ objectPosition: 'center 30%' }}
            data-ai-hint="soccer player"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
            <div className="max-w-3xl space-y-10 text-center xl:text-left">
              <Badge variant="outline" className="border-primary/50 text-primary px-6 py-2 rounded-full bg-primary/5 font-bold uppercase tracking-[0.3em] text-xs animate-pulse">
                <Trophy className="w-3 h-3 mr-2" /> ÉVÉNEMENT OFFICIEL 2026
              </Badge>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline font-bold leading-[0.85] tracking-tighter uppercase whitespace-pre-line">
                {heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto xl:mx-0 leading-relaxed font-medium">
                {heroSubtitle}
              </p>
              <div className="flex flex-wrap justify-center xl:justify-start gap-5 pt-6">
                <Link href="/tournaments">
                  <Button size="lg" className="h-20 px-12 bg-primary hover:bg-primary/90 glow-blue text-xl gap-3 uppercase font-black rounded-2xl transition-all hover:scale-105">
                    Participer maintenant <ArrowRight className="w-6 h-6" />
                  </Button>
                </Link>
                {heroVideoUrl && (
                  <Button size="lg" variant="outline" className="h-20 px-12 text-xl gap-3 backdrop-blur-md bg-white/5 uppercase font-bold border-white/20 hover:bg-white/10" onClick={() => setIsVideoOpen(true)}>
                    <Play className="w-6 h-6" /> Voir le Teaser
                  </Button>
                )}
              </div>
            </div>

            <div className="flex justify-center xl:justify-end">
              <div className="w-full max-w-[460px] animate-float">
                <PrizePoolTracker
                  currentPool={currentPool}
                  targetPool={targetPool}
                  tiers={tiers}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-16 container mx-auto px-4 mb-20">
        <div className="bg-card/90 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-3 group">
                <div className={cn("p-5 bg-card/50 rounded-2xl group-hover:scale-110 transition-all border border-white/5", stat.color)}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <p className="text-3xl md:text-5xl font-headline font-bold tracking-tighter">{stat.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Scrolling Marquee */}
      {sponsors && sponsors.length > 0 && (
        <section className="py-20 bg-muted/30 border-y border-white/5 overflow-hidden">
          <div className="container mx-auto px-4 mb-10 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">PARTENAIRES OFFICIELS</h2>
            <Link href="/sponsors" className="text-[10px] font-black uppercase text-primary hover:underline tracking-widest">Voir tous les sponsors</Link>
          </div>
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee flex whitespace-nowrap gap-20 items-center py-4">
              {sponsors.map((s: any) => (
                <div key={s.id} className="w-44 h-24 flex items-center justify-center shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all p-4">
                  <img src={s.logoUrl} alt={s.name} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
              {/* Duplication pour le défilement infini */}
              {sponsors.map((s: any) => (
                <div key={`${s.id}-dup`} className="w-44 h-24 flex items-center justify-center shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all p-4">
                  <img src={s.logoUrl} alt={s.name} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black border-none">
          <DialogHeader className="sr-only">
            <DialogTitle>Teaser Vidéo OneCup 2026</DialogTitle>
            <DialogDescription>Vidéo de présentation de l'événement.</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              src={heroVideoUrl ? `https://www.youtube.com/embed/${heroVideoUrl.split('v=')[1] || heroVideoUrl.split('/').pop()}?autoplay=1` : ""}
              title="OneCup Teaser"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
