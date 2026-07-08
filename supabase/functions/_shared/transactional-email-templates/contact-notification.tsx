import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  message?: string
  filesCount?: number
  filesInfo?: Array<{ name: string; size: number; type: string }>
  submittedAt?: string
}

const Email = ({
  name = '',
  email = '',
  phone = '',
  message = '',
  filesCount = 0,
  filesInfo = [],
  submittedAt = '',
}: Props) => (
  <Html lang="cs" dir="ltr">
    <Head />
    <Preview>Nová zpráva z webu krovykv.cz od {name || 'zákazníka'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nová zpráva z webu</Heading>
        <Text style={subtitle}>krovykv.cz — kontaktní formulář</Text>

        <Section style={card}>
          <Text style={label}>Jméno</Text>
          <Text style={value}>{name || '—'}</Text>

          <Text style={label}>E-mail</Text>
          <Text style={value}>{email || '—'}</Text>

          <Text style={label}>Telefon</Text>
          <Text style={value}>{phone || '—'}</Text>

          {submittedAt ? (
            <>
              <Text style={label}>Odesláno</Text>
              <Text style={value}>{submittedAt}</Text>
            </>
          ) : null}
        </Section>

        <Section style={card}>
          <Text style={label}>Zpráva</Text>
          <Text style={{ ...value, whiteSpace: 'pre-wrap' }}>{message || '—'}</Text>
        </Section>

        {filesCount > 0 ? (
          <Section style={card}>
            <Text style={label}>Přílohy ({filesCount})</Text>
            {filesInfo.map((f, i) => (
              <Text key={i} style={value}>
                • {f.name} ({Math.round(f.size / 1024)} KB)
              </Text>
            ))}
            <Text style={hint}>
              Soubory nejsou přiloženy k tomuto e-mailu — jsou uloženy v systému.
            </Text>
          </Section>
        ) : null}

        <Hr style={hr} />
        <Text style={footer}>
          Odpovědět můžete přímo na e-mail zákazníka: {email}
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `Nová zpráva z webu krovykv.cz${data?.name ? ` — ${data.name}` : ''}`,
  displayName: 'Kontakt: notifikace pro majitele',
  to: 'info@krovykv.cz',
  previewData: {
    name: 'Jan Novák',
    email: 'jan@example.cz',
    phone: '+420 725 000 000',
    message: 'Dobrý den, poptávám nový krov na rodinný dům.',
    filesCount: 0,
    filesInfo: [],
    submittedAt: new Date().toLocaleString('cs-CZ'),
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif',
}
const container = { padding: '32px 24px', maxWidth: '600px', margin: '0 auto' }
const h1 = {
  color: '#2d3d2a',
  fontSize: '24px',
  fontWeight: 700,
  margin: '0 0 4px',
}
const subtitle = { color: '#7a7266', fontSize: '14px', margin: '0 0 24px' }
const card = {
  backgroundColor: '#faf7f2',
  border: '1px solid #ece5d8',
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '0 0 16px',
}
const label = {
  color: '#7a7266',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '8px 0 2px',
}
const value = { color: '#2b2b2b', fontSize: '15px', margin: '0 0 8px' }
const hint = { color: '#7a7266', fontSize: '12px', margin: '8px 0 0' }
const hr = { borderColor: '#ece5d8', margin: '24px 0' }
const footer = { color: '#7a7266', fontSize: '12px', textAlign: 'center' as const }
