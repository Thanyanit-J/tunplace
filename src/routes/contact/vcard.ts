import vCardsJS from 'vcards-js'

export type Contact = Partial<{
  uid: string
  birthday: Date
  anniversary: Date
  cellPhone: string
  pagerPhone: string
  email: string
  workEmail: string
  otherEmail: string
  firstName: string
  formattedName: string
  gender: 'M' | 'F'
  homeAddress: Partial<{
    label: string
    street: string
    city: string
    stateProvince: string
    postalCode: string
    countryRegion: string
  }>
  homePhone: string
  homeFax: string
  lastName: string
  logo: {
    url?: string
    base64String?: string
    mediaType: string
    base64: false | true
  }
  middleName: string
  namePrefix: string
  nameSuffix: string
  nickname: string
  note: string
  organization: string
  isOrganization: false | true
  photo: {
    url?: string
    base64String?: string
    mediaType: string
    base64: false | true
  }
  role: string
  socialUrls: Partial<{
    facebook: string
    linkedIn: string
    twitter: string
    flickr: string
    [custom: string]: string
  }>
  source: string
  title: string
  url: string
  workUrl: string
  workAddress: Partial<{
    label: string
    street: string
    city: string
    stateProvince: string
    postalCode: string
    countryRegion: string
  }>
  workPhone: string
  workFax: string
  otherPhone: string
  version: string
}>

export function generateVCard(contact: Contact) {
  if (!contact) return

  const vCard = vCardsJS()

  // Set basic properties
  if (contact.firstName) vCard.firstName = contact.firstName
  if (contact.middleName) vCard.middleName = contact.middleName
  if (contact.lastName) vCard.lastName = contact.lastName
  if (contact.uid) vCard.uid = contact.uid
  if (contact.organization) vCard.organization = contact.organization

  // Link to image (you can replace with actual image data if needed)
  if (contact.photo?.base64) {
    if (contact.photo.base64String && contact.photo.mediaType)
      vCard.photo.embedFromString(contact.photo.base64String, contact.photo.mediaType)
  } else if (contact.photo?.url) {
    if (contact.photo.url && contact.photo.mediaType)
      vCard.photo.attachFromUrl(contact.photo.url, contact.photo.mediaType)
  }

  if (contact.workPhone) vCard.workPhone = contact.workPhone
  if (contact.birthday) vCard.birthday = new Date(contact.birthday)
  if (contact.title) vCard.title = contact.title
  if (contact.url) vCard.url = contact.url
  if (contact.workUrl) vCard.workUrl = contact.workUrl
  if (contact.note) vCard.note = contact.note

  // Set other vitals
  if (contact.nickname) vCard.nickname = contact.nickname
  if (contact.namePrefix) vCard.namePrefix = contact.namePrefix
  if (contact.nameSuffix) vCard.nameSuffix = contact.nameSuffix
  if (contact.gender) vCard.gender = contact.gender
  if (contact.anniversary) vCard.anniversary = new Date(contact.anniversary)
  if (contact.role) vCard.role = contact.role

  // Set other phone numbers
  if (contact.homePhone) vCard.homePhone = contact.homePhone
  if (contact.cellPhone) vCard.cellPhone = contact.cellPhone
  if (contact.pagerPhone) vCard.pagerPhone = contact.pagerPhone

  // Set fax/facsimile numbers
  if (contact.homeFax) vCard.homeFax = contact.homeFax
  if (contact.workFax) vCard.workFax = contact.workFax

  // Set email addresses
  if (contact.email) vCard.email = contact.email
  if (contact.workEmail) vCard.workEmail = contact.workEmail

  // Set logo
  if (contact.logo?.base64) {
    if (contact.logo.base64String && contact.logo.mediaType)
      vCard.logo.embedFromString(contact.logo.base64String, contact.logo.mediaType)
  } else if (contact.logo?.url) {
    if (contact.logo.url && contact.logo.mediaType)
      vCard.logo.attachFromUrl(contact.logo.url, contact.logo.mediaType)
  }

  // Set URL where the vCard can be found
  if (contact.source) vCard.source = contact.source

  // Set address information
  if (contact.homeAddress) {
    vCard.homeAddress.label = contact.homeAddress.label ?? 'Home'
    vCard.homeAddress.street = contact.homeAddress.street ?? ''
    vCard.homeAddress.city = contact.homeAddress.city ?? ''
    vCard.homeAddress.stateProvince = contact.homeAddress.stateProvince ?? ''
    vCard.homeAddress.postalCode = contact.homeAddress.postalCode ?? ''
    vCard.homeAddress.countryRegion = contact.homeAddress.countryRegion ?? ''
  }

  if (contact.workAddress) {
    vCard.workAddress.label = contact.workAddress.label ?? 'Work'
    vCard.workAddress.street = contact.workAddress.street ?? ''
    vCard.workAddress.city = contact.workAddress.city ?? ''
    vCard.workAddress.stateProvince = contact.workAddress.stateProvince ?? ''
    vCard.workAddress.postalCode = contact.workAddress.postalCode ?? ''
    vCard.workAddress.countryRegion = contact.workAddress.countryRegion ?? ''
  }

  // Set social media URLs
  if (contact.socialUrls) {
    for (const [platform, url] of Object.entries(contact.socialUrls)) {
      vCard.socialUrls[platform] = url ?? ''
    }
  }

  // Set default version to v2.1 because most Android only support vCard up to v2.1
  vCard.version = contact.version ?? '2.1'

  toFile(vCard.getFormattedString())
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
