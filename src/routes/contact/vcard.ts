type VCardVersion = '2.1' | '3.0' | '4.0'

export class VCard {
  private version: VCardVersion = '2.1'
  private readonly fields: string[] = []

  constructor(version?: VCardVersion) {
    if (version) {
      this.setVersion(version)
    }
  }

  private sanitizeValue(value: string): string {
    return value.replace(/;/g, '\\;')
  }

  setVersion(version: VCardVersion) {
    if (version === '2.1' || version === '3.0' || version === '4.0') {
      this.version = version
    } else {
      throw new Error('Invalid vCard version. Only 2.1, 3.0, or 4.0 are allowed.')
    }
  }

  addName(last: string, first: string, middle: string, prefix: string, suffix: string) {
    const cleanedLast = this.sanitizeValue(last)
    const cleanedFirst = this.sanitizeValue(first)
    const cleanedMiddle = this.sanitizeValue(middle)
    const cleanedPrefix = this.sanitizeValue(prefix)
    const cleanedSuffix = this.sanitizeValue(suffix)
    
    this.fields.push(`N:${cleanedLast};${cleanedFirst};${cleanedMiddle};${cleanedPrefix};${cleanedSuffix}`)
    this.fields.push(`FN:${[cleanedPrefix, cleanedFirst, cleanedMiddle, cleanedLast, cleanedSuffix].filter(Boolean).join(' ')}`)
  }

  addUID(uid: string) {
    this.fields.push(`UID:${this.sanitizeValue(uid)}`)
  }

  addCompany(org: string) {
    this.fields.push(`ORG:${this.sanitizeValue(org)}`)
  }

  addPhoto(base64: string, mediaType: string) {
    if (this.version === '2.1') {
      this.fields.push(`PHOTO;${mediaType};ENCODING=BASE64:${base64}`)
    } else if (this.version === '3.0') {
      this.fields.push(`PHOTO;TYPE=${mediaType};ENCODING=b:${base64}`)
    } else if (this.version === '4.0') {
      this.fields.push(`PHOTO;ENCODING=BASE64;TYPE=${mediaType}:${base64}`)
    }
  }

  addPhotoURL(url: string, mediaType: string) {
    const cleanedURL = this.sanitizeValue(url)
    if (this.version === '2.1') {
      this.fields.push(`PHOTO;${mediaType}:${cleanedURL}`)
    } else if (this.version === '3.0') {
      this.fields.push(`PHOTO;TYPE=${mediaType};VALUE=URI:${cleanedURL}`)
    } else if (this.version === '4.0') {
      this.fields.push(`PHOTO;MEDIATYPE=${mediaType}:${cleanedURL}`)
    }
  }

  addPhoneNumber(number: string, type?: string) {
    const escapedType = type ? this.sanitizeValue(type) : undefined
    this.fields.push(`TEL${escapedType ? ';TYPE=' + escapedType : ''}:${this.sanitizeValue(number)}`)
  }

  addBirthday(date: string) {
    this.fields.push(`BDAY:${this.sanitizeValue(date)}`)
  }

  addJobtitle(title: string) {
    this.fields.push(`TITLE:${this.sanitizeValue(title)}`)
  }

  addURL(url: string, type?: string) {
    const escapedType = type ? this.sanitizeValue(type) : undefined
    this.fields.push(`URL${escapedType && this.version !== '2.1' ? ';TYPE=' + escapedType : ''}:${this.sanitizeValue(url)}`)
  }

  addNote(note: string) {
    this.fields.push(`NOTE:${this.sanitizeValue(note)}`)
  }

  addRole(role: string) {
    this.fields.push(`ROLE:${this.sanitizeValue(role)}`)
  }

  addEmail(email: string, type?: string) {
    const escapedType = type ? this.sanitizeValue(type) : undefined
    this.fields.push(`EMAIL${escapedType ? ';TYPE=' + escapedType : ''}:${this.sanitizeValue(email)}`)
  }

  addLogo(base64: string, mediaType: string) {
    if (this.version === '2.1') {
      this.fields.push(`LOGO;${mediaType};ENCODING=BASE64:${base64}`)
    } else if (this.version === '3.0') {
      this.fields.push(`LOGO;TYPE=${mediaType};ENCODING=b:${base64}`)
    } else if (this.version === '4.0') {
      this.fields.push(`LOGO;ENCODING=BASE64;TYPE=${mediaType}:${base64}`)
    }
  }

  addLogoURL(url: string, mediaType: string) {
    const escapedUrl = this.sanitizeValue(url)
    if (this.version === '2.1') {
      this.fields.push(`LOGO;${mediaType}:${escapedUrl}`)
    } else if (this.version === '3.0') {
      this.fields.push(`LOGO;TYPE=${mediaType};VALUE=URI:${escapedUrl}`)
    } else if (this.version === '4.0') {
      this.fields.push(`LOGO;MEDIATYPE=${mediaType}:${escapedUrl}`)
    }
  }

  addAddress(options: {
    /** Type/Label of address e.g. HOME, WORK */
    type?: string
    ext?: string  
    street?: string
    city?: string
    state?: string
    postal?: string
    country?: string
  }) {
    const { type, ext = '', street = '', city = '', state = '', postal = '', country = '' } = options
    const escapedExt = this.sanitizeValue(ext)
    const escapedStreet = this.sanitizeValue(street)
    const escapedCity = this.sanitizeValue(city)
    const escapedState = this.sanitizeValue(state)
    const escapedPostal = this.sanitizeValue(postal)
    const escapedCountry = this.sanitizeValue(country)
    const escapedType = type ? this.sanitizeValue(type) : undefined
    
    this.fields.push(
      `ADR${escapedType ? ';TYPE=' + escapedType : ''}:${escapedExt};${escapedStreet};${escapedCity};${escapedState};${escapedPostal};${escapedCountry}`
    )
  }

  buildVCard(bypassRequiredFields = false): string {
    if (!bypassRequiredFields) {
      const hasN = this.fields.some(field => field.startsWith('N:'))
      if (!hasN) {
        throw new Error('N field is required for vCard')
      }

      if (this.version === '3.0' || this.version === '4.0') {
        const hasFN = this.fields.some(field => field.startsWith('FN:'))
        if (!hasFN) {
          throw new Error('FN field is required for vCard version 3.0 and 4.0')
        }
      }
    }

    return [`BEGIN:VCARD`, `VERSION:${this.version}`, ...this.fields, `END:VCARD`].join('\n')
  }
}
