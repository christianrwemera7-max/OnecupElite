'use client';

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  context: SecurityRuleContext;
  constructor(context: SecurityRuleContext) {
    super(`Permission refusée : tentative de ${context.operation} sur ${context.path}`);
    this.name = 'FirestorePermissionError';
    this.context = context;
  }
}
