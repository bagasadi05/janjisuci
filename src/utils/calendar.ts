/**
 * Universal iCalendar (.ics) generator for Apple Calendar, Outlook, and mobile devices.
 */

function formatToIcsDate(rawDate?: string, fallback = '20271024T100000'): string {
  if (!rawDate) return fallback
  const clean = rawDate.replace(/[-:]/g, '')
  if (clean.length === 8) return `${clean}T090000`
  return clean
}

export interface IcsEventOptions {
  title: string
  description: string
  location: string
  start: string // YYYYMMDDTHHmmss
  end: string   // YYYYMMDDTHHmmss
  url?: string
}

export function generateIcsContent({
  title,
  description,
  location,
  start,
  end,
  url = 'https://janjisuci.web.id'
}: IcsEventOptions): string {
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const uid = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}@janjisuci.web.id`

  const safeStart = formatToIcsDate(start)
  const safeEnd = formatToIcsDate(end)

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JanjiSuci Digital Studio//NONSGML v1.0//ID',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${safeStart}`,
    `DTEND:${safeEnd}`,
    `SUMMARY:${title.replace(/[\n\r]/g, ' ')}`,
    `DESCRIPTION:${description.replace(/[\n\r]/g, '\\n')}`,
    `LOCATION:${location.replace(/[\n\r]/g, ', ')}`,
    `URL:${url}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Pengingat: Besok ${title}`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Pengingat: 2 jam lagi ${title}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')
}

export function downloadIcsFile(options: IcsEventOptions, filename = 'undangan-janjisuci.ics'): void {
  const icsData = generateIcsContent(options)
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

