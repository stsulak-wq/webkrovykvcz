import * as React from 'npm:react@18.3.1'
import { template as contactNotification } from './contact-notification.tsx'
import { template as contactConfirmation } from './contact-confirmation.tsx'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-notification': contactNotification,
  'contact-confirmation': contactConfirmation,
}
