// emailStore.ts
import { Email } from '@/app/(with sidenav)/detail-lead/utils/fetchActivites';
import {create} from 'zustand';

interface EmailStore {
  emails: Email[] | null;
  error: string | null;
  selectedEmail: Email | null;
  setEmails: (emails: Email[]) => void;
  setSelectedEmail: (email: Email) => void;
  setError: (error: string) => void;
}

export const useEmailStore = create<EmailStore>((set) => ({
  emails: null,
  selectedEmail: null,
  error: null,
  setEmails: (emails) => set({ emails }),
  setSelectedEmail: (email) => set({ selectedEmail: email }),
  setError: (error) => set({ error }),
}));
