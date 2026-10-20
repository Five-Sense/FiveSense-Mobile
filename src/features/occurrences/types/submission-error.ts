import type { AppError } from '@/shared/services/api/app-error';

export class OccurrenceSubmissionError extends Error {
  constructor(public readonly error: AppError, public readonly stage: 'uploading' | 'submitting') {
    super(error.message);
    this.name = 'OccurrenceSubmissionError';
  }
}
