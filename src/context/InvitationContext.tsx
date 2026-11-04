import React, { createContext, useContext } from 'react'
import { weddingData, WeddingConfig } from '../config/weddingData'
import { storeConfig, TemplateItem, CustomOrderData } from '../config/storeConfig'

interface InvitationContextValue {
  data: WeddingConfig
  activeTemplate: TemplateItem
  isOpened?: boolean
}

const InvitationContext = createContext<InvitationContextValue>({
  data: weddingData,
  activeTemplate: storeConfig.templates[0],
  isOpened: false
})

export const useInvitationData = () => useContext(InvitationContext)

export const buildMergedWeddingData = (
  template: TemplateItem,
  customOrder?: Partial<CustomOrderData> | null
): WeddingConfig => {
  let groomShort = template.sampleCouple?.groomShort || 'Tamu'
  let groomFull = template.sampleCouple?.groomFull || 'Mempelai Pria'
  let brideShort = template.sampleCouple?.brideShort || ''
  let brideFull = template.sampleCouple?.brideFull || 'Mempelai Wanita'

  if (template.eventType === 'khitan') {
    const childName =
      customOrder?.khitanChildShortName?.trim() ||
      customOrder?.khitanChildFullName?.trim() ||
      template.eventMeta?.primaryTitle ||
      template.sampleCouple.groomShort
    groomShort = childName
    brideShort = 'Khitan'
    groomFull = customOrder?.khitanChildFullName?.trim() || template.eventMeta?.primaryTitle || template.sampleCouple.groomFull
    brideFull = template.eventMeta?.secondaryTitle || 'Walimatul Khitan'
  } else if (template.eventType === 'birthday') {
    const bdayName =
      customOrder?.birthdayCelebrantName?.trim() ||
      template.eventMeta?.primaryTitle ||
      template.sampleCouple.groomShort
    groomShort = bdayName
    brideShort = customOrder?.birthdayAge ? `${customOrder.birthdayAge}` : 'Birthday'
    groomFull = bdayName
    brideFull = template.eventMeta?.secondaryTitle || 'Birthday Celebration'
  } else if (template.eventType === 'aqiqah') {
    const babyName =
      customOrder?.aqiqahBabyName?.trim() ||
      template.eventMeta?.primaryTitle ||
      template.sampleCouple.groomShort
    groomShort = babyName
    brideShort = 'Aqiqah'
    groomFull = babyName
    brideFull = template.eventMeta?.secondaryTitle || 'Tasyakuran Aqiqah'
  } else if (template.eventType === 'graduation') {
    groomShort = customOrder?.gradInstitution?.trim() || template.eventMeta?.primaryTitle || template.sampleCouple.groomShort
    brideShort = 'Wisuda'
    groomFull = customOrder?.gradInstitution?.trim() || template.eventMeta?.primaryTitle || template.sampleCouple.groomFull
    brideFull = customOrder?.gradDegreeTitle?.trim() || template.eventMeta?.secondaryTitle || 'Graduation Ceremony'
  } else {
    // Wedding default
    groomShort = customOrder?.groomShortName?.trim() || template.sampleCouple.groomShort
    groomFull = customOrder?.groomFullName?.trim() || template.sampleCouple.groomFull
    brideShort = customOrder?.brideShortName?.trim() || template.sampleCouple.brideShort
    brideFull = customOrder?.brideFullName?.trim() || template.sampleCouple.brideFull
  }

  const rawGroomParents =
    customOrder?.khitanParents?.trim() ||
    customOrder?.aqiqahParents?.trim() ||
    customOrder?.groomParents?.trim() ||
    template.eventMeta?.parentsOrHost ||
    template.sampleCouple.groomParents ||
    ''
  const groomParentsParts = rawGroomParents.split('&')

  const rawBrideParents = customOrder?.brideParents?.trim() || template.sampleCouple.brideParents || ''
  const brideParentsParts = rawBrideParents.split('&')

  const eventTitleAkad =
    template.eventType === 'khitan'
      ? 'Walimatul Khitan'
      : template.eventType === 'birthday'
      ? 'Pesta Ulang Tahun'
      : template.eventType === 'aqiqah'
      ? 'Tasyakuran Aqiqah'
      : template.eventType === 'graduation'
      ? 'Sidang Terbuka Wisuda'
      : 'Akad Nikah'

  const eventTitleResepsi =
    template.eventType === 'wedding'
      ? 'Resepsi Pernikahan'
      : 'Ramah Tamah & Syukuran'

  return {
    ...weddingData,
    meta: {
      ...weddingData.meta,
      title: `${groomShort} ${brideShort ? '& ' + brideShort : ''}`,
      description: `Undangan Digital ${groomFull} - ${brideFull}`
    },
    couple: {
      ...weddingData.couple,
      groom: {
        ...weddingData.couple.groom,
        shortName: groomShort,
        fullName: groomFull,
        fatherName: groomParentsParts[0]?.trim() || weddingData.couple.groom.fatherName,
        motherName: groomParentsParts[1]?.trim() || weddingData.couple.groom.motherName,
        instagram: customOrder?.groomIg?.replace('@', '').trim() || weddingData.couple.groom.instagram,
        photo: template.sampleCouple.groomPhoto
      },
      bride: {
        ...weddingData.couple.bride,
        shortName: brideShort,
        fullName: brideFull,
        fatherName: brideParentsParts[0]?.trim() || weddingData.couple.bride.fatherName,
        motherName: brideParentsParts[1]?.trim() || weddingData.couple.bride.motherName,
        instagram: customOrder?.brideIg?.replace('@', '').trim() || weddingData.couple.bride.instagram,
        photo: template.sampleCouple.bridePhoto
      }
    },
    events: {
      akad: {
        ...weddingData.events.akad,
        title: eventTitleAkad,
        date: customOrder?.akadDate?.trim() || template.eventMeta?.dateText || template.sampleCouple.dateText,
        time: customOrder?.akadTime?.trim() || weddingData.events.akad.time,
        venue: customOrder?.akadVenue?.trim() || template.eventMeta?.venueText || template.sampleCouple.venueText,
        address: customOrder?.mapsAddress?.trim() || weddingData.events.akad.address,
        mapsUrl: customOrder?.mapsLink?.trim() || weddingData.events.akad.mapsUrl
      },
      resepsi: {
        ...weddingData.events.resepsi,
        title: eventTitleResepsi,
        date: customOrder?.resepsiDate?.trim() || customOrder?.akadDate?.trim() || template.eventMeta?.dateText || template.sampleCouple.dateText,
        time: customOrder?.resepsiTime?.trim() || weddingData.events.resepsi.time,
        venue: customOrder?.resepsiVenue?.trim() || template.eventMeta?.venueText || template.sampleCouple.venueText,
        address: customOrder?.mapsAddress?.trim() || weddingData.events.resepsi.address,
        mapsUrl: customOrder?.mapsLink?.trim() || weddingData.events.resepsi.mapsUrl
      }
    },
    gift: {
      ...weddingData.gift,
      accounts: customOrder?.giftBankInfo?.trim()
        ? [
            {
              bank: 'Rekening Hadiah / Kado',
              accountNumber: customOrder.giftBankInfo.split('a.n')[0]?.replace(/[^0-9]/g, '') || customOrder.giftBankInfo,
              accountHolder: customOrder.giftBankInfo.includes('a.n')
                ? customOrder.giftBankInfo.split('a.n')[1]?.trim()
                : `${groomShort}`,
              holderName: customOrder.giftBankInfo.includes('a.n')
                ? customOrder.giftBankInfo.split('a.n')[1]?.trim()
                : `${groomShort}`,
              logoText: customOrder.giftBankInfo.split(' ')[0]?.toUpperCase() || 'BANK'
            },
            ...weddingData.gift.accounts.slice(1)
          ]
        : weddingData.gift.accounts
    }
  }
}

export const InvitationProvider: React.FC<{
  template: TemplateItem
  customOrder?: Partial<CustomOrderData> | null
  isOpened?: boolean
  children: React.ReactNode
}> = ({ template, customOrder, isOpened = false, children }) => {
  const mergedData = buildMergedWeddingData(template, customOrder)

  return (
    <InvitationContext.Provider value={{ data: mergedData, activeTemplate: template, isOpened }}>
      {children}
    </InvitationContext.Provider>
  )
}
