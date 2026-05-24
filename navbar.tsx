"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Calendar, Users, Newspaper, Ticket, PartyPopper, LayoutDashboard, Menu, X, LogIn, LogOut, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const ADMIN_EMAIL = "onecup2026@gmail.com";

const navItems = [
  { name: "Tournois", href: "/tournaments", icon: Trophy },
  { name: "Communauté", href: "/community", icon: Users },
  { name: "Calendrier", href: "/calendar", icon: Calendar },
  { name: "Actualités", href: "/news", icon: Newspaper },
  { name: "Billetterie", href: "/tickets", icon: Ticket },
  { name: "After Cup", href: "/after-cup", icon: PartyPopper },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const auth = useAuth();
  const { user, loading } = useUser();
  const { toast } = useToast();

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogin = async () => {
    if (!auth || isAuthenticating) return;

    setIsAuthenticating(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    try {
      await signInWithPopup(auth, provider);
      toast({ title: "Connexion réussie", description: "Bienvenue sur OneCup Elite !" });
    } catch (error: any) {
      // Ignorer l'erreur si l'utilisateur a simplement fermé la fenêtre ou si une autre requête est en cours
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        console.log("Connexion annulée par l'utilisateur.");
      } else if (error.code === 'auth/popup-blocked') {
        toast({ 
          variant: "destructive", 
          title: "Fenêtre bloquée", 
          description: "Veuillez autoriser les popups pour vous connecter." 
        });
      } else {
        toast({ 
          variant: "destructive", 
          title: "Erreur de connexion", 
          description: error.message || "Vérifiez votre clé API dans la console Firebase." 
        });
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      toast({ title: "Déconnexion", description: "À bientôt !" });
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de se déconnecter." });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center glow-blue transition-transform group-hover:scale-105">
            <Trophy className="text-white w-5 h-5" />
          </div>
          <span className="font-headline text-lg md:text-xl font-bold tracking-tighter uppercase">
            ONECUP<span className="text-primary">ELITE</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-2 transition-all hover:bg-muted/50 px-3 h-9",
                    isActive && "text-primary bg-primary/10"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-bold text-xs uppercase">{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {(loading || isAuthenticating) ? (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          ) : user ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" className="gap-2 h-9 text-xs font-bold uppercase border-primary/30 text-primary hover:bg-primary/5">
                    <ShieldCheck className="w-4 h-4" />
                    Admin
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 overflow-hidden ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">{user.displayName?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2">
                  <div className="flex flex-col space-y-1 p-2 mb-2">
                    <p className="text-sm font-bold leading-none">{user.displayName}</p>
                    <p className="text-[10px] leading-none text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/admin" className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Tableau de bord Admin</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button onClick={handleLogin} disabled={isAuthenticating} className="bg-primary hover:bg-primary/90 glow-blue h-9 text-xs font-bold uppercase px-6">
              {isAuthenticating ? "Chargement..." : "Connexion"}
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-muted-foreground hover:bg-muted/50 rounded-lg transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden absolute top-16 left-0 w-full bg-background border-b shadow-2xl transition-all duration-300 ease-in-out transform origin-top",
        isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
      )}>
        <div className="flex flex-col p-4 gap-2 bg-card/50 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {user ? (
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl mb-2">
               <Avatar className="h-10 w-10 border border-primary/20">
                <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                <AvatarFallback className="font-bold">{user.displayName?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-bold uppercase">{user.displayName}</p>
                <p className="text-[10px] text-muted-foreground">{user.email}</p>
              </div>
            </div>
          ) : null}

          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button 
                variant={pathname === item.href ? "secondary" : "ghost"} 
                className={cn(
                  "w-full justify-start gap-4 h-12 text-sm font-bold uppercase",
                  pathname === item.href && "text-primary border-l-4 border-primary rounded-none"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Button>
            </Link>
          ))}
          
          <div className="h-px bg-border my-2" />
          
          {user ? (
            <>
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" className="w-full justify-start gap-4 h-12 text-sm font-bold uppercase border-primary/20 text-primary mb-2">
                    <ShieldCheck className="w-5 h-5" />
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              <Button onClick={handleLogout} variant="destructive" className="w-full justify-start gap-4 h-12 text-sm font-bold uppercase">
                <LogOut className="w-5 h-5" /> Se déconnecter
              </Button>
            </>
          ) : (
            <Button onClick={handleLogin} disabled={isAuthenticating} className="w-full bg-primary h-12 text-sm font-bold uppercase glow-blue mt-2">
              {isAuthenticating ? "Patientez..." : "Se connecter maintenant"}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
