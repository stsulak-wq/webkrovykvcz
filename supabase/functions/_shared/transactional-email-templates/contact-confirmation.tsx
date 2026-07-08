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
  message?: string
}

const Email = ({ name = '', message = '' }: Props) => (
  <Html lang="cs" dir="ltr">
    <Head />
    <Preview>Děkujeme za vaši zprávu — krovykv.cz</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Děkujeme za vaši zprávu</Heading>
        <Text style={p}>
          {name ? `Dobrý den ${name},` : 'Dobrý den,'}
        </Text>
        <Text style={p}>
          děkujeme, že jste nás kontaktovali přes web krovykv.cz. Vaši zprávu
          jsme přijali a ozveme se vám zpět co nejdříve, obvykle do 24 hodin.
        </Text>

        {message ? (
          <Section style={card}>
            <Text style={label}>Vaše zpráva</Text>
            <Text style={{ ...value, whiteSpace: 'pre-wrap' }}>{message}</Text>
          </Section>
        ) : null}

        <Text style={p}>
          Pokud potřebujete rychlou odpověď, můžete nám zavolat na{' '}
          <strong>+420 725 716 937</strong>.
        </Text>

        <Hr style={hr} />
        <Text style={footer}>
          krovykv.cz — tesařství, krovy, pergoly a dřevěné balkony<br />
          Hornická 26, 360 01 Karlovy Vary
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Děkujeme za vaši zprávu — krovykv.cz',
  displayName: 'Kontakt: potvrzení zákazníkovi',
  previewData: {
    name: 'Jan',
    message: 'Dobrý den, poptávám nový krov na rodinný dům.',
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
  margin: '0 0 16px',
}
const p = { color: '#2b2b2b', fontSize: '15px', lineHeight: '22px', margin: '0 0 12px' }
const card = {
  backgroundColor: '#faf7f2',
  border: '1px solid #ece5d8',
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '16px 0',
}
const label = {
  color: '#7a7266',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 4px',
}
const value = { color: '#2b2b2b', fontSize: '15px', margin: 0 }
const hr = { borderColor: '#ece5d8', margin: '24px 0' }
const footer = { color: '#7a7266', fontSize: '12px', textAlign: 'center' as const }
