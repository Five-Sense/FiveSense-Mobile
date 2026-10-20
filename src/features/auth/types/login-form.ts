import type { AlertVariant } from '@/shared/components/feedback/alert';

export type LoginValues = { identifier: string; password: string };
export type LoginField = keyof LoginValues;
export type LoginFeedback = {
  variant: AlertVariant;
  title: string;
  description: string;
  fields: readonly LoginField[];
};
