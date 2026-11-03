import React, { createContext, useContext } from 'react'
import { weddingData, WeddingConfig } from '../config/weddingData'
import { storeConfig, TemplateItem, CustomOrderData } from '../config/storeConfig'

interface InvitationContextValue {
  data: WeddingConfig
  activeTemplate: TemplateItem
}

const InvitationContext = createContext<InvitationContextValue>({
  data: weddingData,
  activeTemplate: storeConfig.templates[0]
})

export const useInvitationData = () => useContext(InvitationContext)

export const buildMergedWeddingData = (
  template: TemplateItem,
  customOrder?: Partial<CustomOrderData> | null
): WeddingConfig => {
  const groomShort = customOrder?.groomShortName?.trim() || template.sampleCouple.groomShort
  const groomFull = customOrder?.groomFullName?.trim() || template.sampleCouple.groomFull
  const brideShort = customOrder?.brideShortName?.trim() || template.sampleCouple.brideShort
  const brideFull = customOrder?.brideFullName?.trim() || template.sampleCouple.brideFull

  const groomParentsParts = (customOrder?.groomParents?.trim() || template.sampleCouple.groomParents).split('&')
  const brideParentsParts = (customOrder?.brideParents?.trim() || template.sampleCouple.brideParents).split('&')

  return {
    ...weddingData,
    meta: {
      ...weddingData.meta,
      title: `Pernikahan ${groomShort} & ${brideShort}`,
      description: `Undangan Pernikahan Online ${groomFull} & ${brideFull}`
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
        date: customOrder?.akadDate?.trim() || template.sampleCouple.dateText,
        time: customOrder?.akadTime?.trim() || weddingData.events.akad.time,
        venue: customOrder?.akadVenue?.trim() || template.sampleCouple.venueText,
        address: customOrder?.mapsAddress?.trim() || weddingData.events.akad.address,
        mapsUrl: customOrder?.mapsLink?.trim() || weddingData.events.akad.mapsUrl
      },
      resepsi: {
        ...weddingData.events.resepsi,
        date: customOrder?.resepsiDate?.trim() || customOrder?.akadDate?.trim() || template.sampleCouple.dateText,
        time: customOrder?.resepsiTime?.trim() || weddingData.events.resepsi.time,
        venue: customOrder?.resepsiVenue?.trim() || template.sampleCouple.venueText,
        address: customOrder?.mapsAddress?.trim() || weddingData.events.resepsi.address,
        mapsUrl: customOrder?.mapsLink?.trim() || weddingData.events.resepsi.mapsUrl
      }
    },
    gift: {
      ...weddingData.gift,
      accounts: customOrder?.giftBankInfo?.trim()
        ? [
            {
              bank: 'Rekening Pengantin',
              accountNumber: customOrder.giftBankInfo.split('a.n')[0]?.replace(/[^0-9]/g, '') || customOrder.giftBankInfo,
              accountHolder: customOrder.giftBankInfo.includes('a.n')
                ? customOrder.giftBankInfo.split('a.n')[1]?.trim()
                : `${groomShort} & ${brideShort}`,
              holderName: customOrder.giftBankInfo.includes('a.n')
                ? customOrder.giftBankInfo.split('a.n')[1]?.trim()
                : `${groomShort} & ${brideShort}`,
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
  children: React.ReactNode
}> = ({ template, customOrder, children }) => {
  const mergedData = buildMergedWeddingData(template, customOrder)

  return (
    <InvitationContext.Provider value={{ data: mergedData, activeTemplate: template }}>
      {children}
    </InvitationContext.Provider>
  )
}
