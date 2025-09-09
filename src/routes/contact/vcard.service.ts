import { VCard } from './vcard'

export type ContactAddress = Partial<{
  label: string
  street: string
  city: string
  stateProvince: string
  postalCode: string
  countryRegion: string
}>

export type ContactImage = {
  url?: string
  base64String?: string
  mediaType: string
  base64: false | true
}

export type ContactPhone = {
  value: string
  label?: string
}

export type ContactEmail = {
  value: string
  label?: string
}

export type ContactFax = {
  value: string
  label?: string
}

export type ContactUrl = {
  value: string
  label?: string
}

export type Contact = Partial<{
  uid: string
  birthday: Date
  anniversary: Date
  firstName: string
  formattedName: string
  gender: string
  lastName: string
  middleName: string
  namePrefix: string
  nameSuffix: string
  note: string
  organization: string
  isOrganization: false | true
  role: string
  source: string
  title: string
  version: string

  address: ContactAddress | ContactAddress[]
  phone: string | string[] | ContactPhone | ContactPhone[]
  fax: string | string[] | ContactFax | ContactFax[]
  email: string | string[] | ContactEmail | ContactEmail[]
  url: string | string[] | ContactUrl | ContactUrl[]
  logo: ContactImage | ContactImage[]
  photo: ContactImage | ContactImage[]

  socialUrls: Partial<{
    facebook: string | string[]
    linkedIn: string | string[]
    twitter: string | string[]
    flickr: string | string[]
    [custom: string]: string | string[]
  }>
}>

export function generateVCard(contact: Contact) {
  if (!contact) return

  const vCard = new VCard()

  // Add name
  vCard.addName(
    contact.lastName ?? '',
    contact.firstName ?? '',
    contact.middleName ?? '',
    contact.namePrefix ?? '',
    contact.nameSuffix ?? ''
  )

  // Add UID
  if (contact.uid) vCard.addUID(contact.uid)

  // Add organization
  if (contact.organization) vCard.addCompany(contact.organization)

  // Add photo(s)
  let photos: ContactImage[] = [];
  if (Array.isArray(contact.photo)) {
    photos = contact.photo;
  } else if (contact.photo) {
    photos = [contact.photo];
  }
  for (const photo of photos) {
    if (photo.base64) {
      if (photo.base64String && photo.mediaType)
        vCard.addPhoto(photo.base64String, photo.mediaType)
    } else if (photo.url && photo.mediaType) {
      vCard.addPhotoURL(photo.url, photo.mediaType)
    }
  }

  // Add logo(s)
  let logos: ContactImage[] = [];
  if (Array.isArray(contact.logo)) {
    logos = contact.logo;
  } else if (contact.logo) {
    logos = [contact.logo];
  }
  for (const logo of logos) {
    if (logo.base64) {
      if (logo.base64String && logo.mediaType)
        vCard.addLogo(logo.base64String, logo.mediaType)
    } else if (logo.url && logo.mediaType) {
      vCard.addLogoURL(logo.url, logo.mediaType)
    }
  }

  // Add birthday
  if (contact.birthday) vCard.addBirthday(contact.birthday.toISOString().slice(0, 10))

  // Add title
  if (contact.title) vCard.addJobtitle(contact.title)

  // Add note
  if (contact.note) vCard.addNote(contact.note)

  // Add role
  if (contact.role) vCard.addRole(contact.role)

  // Add phone(s)
  let phones: (string | ContactPhone)[] = [];
  if (Array.isArray(contact.phone)) {
    phones = contact.phone;
  } else if (contact.phone) {
    phones = [contact.phone];
  }
  for (const phone of phones) {
    if (typeof phone === 'string') {
      vCard.addPhoneNumber(phone);
    } else if (phone && typeof phone === 'object' && 'value' in phone) {
      vCard.addPhoneNumber(phone.value, phone.label);
    }
  }

  // Add fax(s)
  let faxes: (string | ContactFax)[] = [];
  if (Array.isArray(contact.fax)) {
    faxes = contact.fax;
  } else if (contact.fax) {
    faxes = [contact.fax];
  }
  for (const fax of faxes) {
    if (typeof fax === 'string') {
      vCard.addPhoneNumber(fax, 'FAX');
    } else if (fax && typeof fax === 'object' && 'value' in fax) {
      vCard.addPhoneNumber(fax.value, fax.label ?? 'FAX');
    }
  }

  // Add email(s)
  let emails: (string | ContactEmail)[] = [];
  if (Array.isArray(contact.email)) {
    emails = contact.email;
  } else if (contact.email) {
    emails = [contact.email];
  }
  for (const email of emails) {
    if (typeof email === 'string') {
      vCard.addEmail(email);
    } else if (email && typeof email === 'object' && 'value' in email) {
      vCard.addEmail(email.value, email.label);
    }
  }

  // Add url(s)
  let urls: (string | ContactUrl)[] = [];
  if (Array.isArray(contact.url)) {
    urls = contact.url;
  } else if (contact.url) {
    urls = [contact.url];
  }
  for (const url of urls) {
    if (typeof url === 'string') {
      vCard.addURL(url);
    } else if (url && typeof url === 'object' && 'value' in url) {
      vCard.addURL(url.value, url.label);
    }
  }

  // Add address(es)
  let addresses: ContactAddress[] = [];
  if (Array.isArray(contact.address)) {
    addresses = contact.address;
  } else if (contact.address) {
    addresses = [contact.address];
  }
  for (const address of addresses) {
    vCard.addAddress({
      type: address.label ?? '',
      street: address.street ?? '',
      city: address.city ?? '',
      state: address.stateProvince ?? '',
      postal: address.postalCode ?? '',
      country: address.countryRegion ?? ''
    })
  }

  // Add social media URLs
  if (contact.socialUrls) {
    for (const [platform, value] of Object.entries(contact.socialUrls)) {
      if (Array.isArray(value)) {
        for (const url of value) {
          if (url) vCard.addURL(url, platform)
        }
      } else if (value) {
        vCard.addURL(value, platform)
      }
    }
  }

  // Output vCard
  toFile(vCard.buildVCard())
}

function toFile(vCard: string, filename: string = 'contact.vcf') {
  const blob = new Blob([vCard], { type: 'text/vcard' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
