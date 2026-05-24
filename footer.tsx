
import Link from "next/link";
import { Trophy, Instagram, Twitter, Youtube, Facebook, ArrowUpRight, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Trophy className="text-white w-5 h-5" />
            </div>
            <span className="font-headline text-lg font-bold">ONECUP ELITE</span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            L'écosystème premium pour le sport compétitif et le divertissement numérique. Propulser les équipes et les athlètes vers l'excellence.
          </p>
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium pt-2">
            <div className="w-3 h-3 flex items-center justify-center">
               <Mail className="w-3 h-3 text-primary" />
            </div>
            <a href="mailto:onecup2026@gmail.com" className="hover:text-primary transition-colors">onecup2026@gmail.com</a>
          </div>
          <div className="flex gap-4 pt-2">
            <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary transition-colors hover:text-white">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link 
              href="https://www.instagram.com/digitaleventcd?igsh=aXVmcHVkZDYyazNx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-muted rounded-full hover:bg-primary transition-colors hover:text-white"
            >
              <Instagram className="w-4 h-4" />
            </Link>
            <Link 
              href="https://www.tiktok.com/@one.cup16?_r=1&_t=ZS-96bXcJmCEVO" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-muted rounded-full hover:bg-primary transition-colors hover:text-white"
            >
              <svg 
                viewBox="0 0 24 24" 
                width="16" 
                height="16" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </Link>
            <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary transition-colors hover:text-white">
              <Youtube className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-6 text-sm uppercase tracking-widest text-primary">Plateforme</h4>
          <ul className="space-y-3">
            <li><Link href="/tournaments" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">Tous les Tournois <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            <li><Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">Hub Communautaire <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            <li><Link href="/results" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">Résultats Live <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            <li><Link href="/tickets" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">Billetterie <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-6 text-sm uppercase tracking-widest text-primary">Entreprise</h4>
          <ul className="space-y-3">
            <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">À propos d'OneCup</Link></li>
            <li><Link href="/sponsors" className="text-muted-foreground hover:text-foreground transition-colors">Partenariat</Link></li>
            <li><Link href="/news" className="text-muted-foreground hover:text-foreground transition-colors">Presse & Actualités</Link></li>
            <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contactez-nous</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-6 text-sm uppercase tracking-widest text-primary">Support</h4>
          <ul className="space-y-3">
            <li><Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
            <li><Link href="/rules" className="text-muted-foreground hover:text-foreground transition-colors">Règlement des Tournois</Link></li>
            <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Confidentialité</Link></li>
            <li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Conditions d'Utilisation</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
        © 2026 ONE CUP Platform. Tous droits réservés. Conçu pour la performance.
      </div>
    </footer>
  );
}
