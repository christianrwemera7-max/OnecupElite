'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      // En production, cela pourrait être loggé silencieusement
      // En développement/prototypage, on affiche une alerte contextuelle
      toast({
        variant: "destructive",
        title: "Erreur de Permission Firestore",
        description: `L'opération '${error.context.operation}' sur '${error.context.path}' a été refusée par les règles de sécurité.`,
      });
      
      // On log également pour l'outil de debug
      console.error("Détails de l'erreur Firestore:", error.context);
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [toast]);

  return null;
}
