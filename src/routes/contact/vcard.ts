type VCardVersion = '2.1' | '3.0' | '4.0'

export class VCard {
  private version: VCardVersion = '2.1'
  private readonly fields: string[] = []

  constructor(version?: VCardVersion) {
    if (version) {
      this.setVersion(version)
    }
  }

  setVersion(version: VCardVersion) {
    if (version === '2.1' || version === '3.0' || version === '4.0') {
      this.version = version
    } else {
      throw new Error('Invalid vCard version. Only 2.1, 3.0, or 4.0 are allowed.')
    }
  }

  addName(last: string, first: string, middle: string, prefix: string, suffix: string) {
    this.fields.push(`N:${last};${first};${middle};${prefix};${suffix}`)
    this.fields.push(`FN:${[prefix, first, middle, last, suffix].filter(Boolean).join(' ')}`)
  }

  addUID(uid: string) {
    this.fields.push(`UID:${uid}`)
  }

  addCompany(org: string) {
    this.fields.push(`ORG:${org}`)
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

  addPhotoURL(url: string) {
    // Assume JPEG for demonstration, but you may want to pass mediaType
    const mediaType = 'JPEG'
    if (this.version === '2.1') {
      this.fields.push(`PHOTO;${mediaType}:${url}`)
    } else if (this.version === '3.0') {
      this.fields.push(`PHOTO;TYPE=${mediaType};VALUE=URI:${url}`)
    } else if (this.version === '4.0') {
      this.fields.push(`PHOTO;MEDIATYPE=image/jpeg:${url}`)
    }
  }

  addPhoneNumber(number: string, type?: string) {
    this.fields.push(`TEL${type ? ';TYPE=' + type : ''}:${number}`)
  }

  addBirthday(date: string) {
    this.fields.push(`BDAY:${date}`)
  }

  addJobtitle(title: string) {
    this.fields.push(`TITLE:${title}`)
  }

  addURL(url: string, type?: string) {
    this.fields.push(`URL${type && this.version !== '2.1' ? ';TYPE=' + type : ''}:${url}`)
  }

  addNote(note: string) {
    this.fields.push(`NOTE:${note}`)
  }

  addRole(role: string) {
    this.fields.push(`ROLE:${role}`)
  }

  addEmail(email: string, type?: string) {
    this.fields.push(`EMAIL${type ? ';TYPE=' + type : ''}:${email}`)
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

  addLogoURL(url: string) {
    // Assume JPEG for demonstration, but you may want to pass mediaType
    const mediaType = 'JPEG'
    if (this.version === '2.1') {
      this.fields.push(`LOGO;${mediaType}:${url}`)
    } else if (this.version === '3.0') {
      this.fields.push(`LOGO;TYPE=${mediaType};VALUE=URI:${url}`)
    } else if (this.version === '4.0') {
      this.fields.push(`LOGO;MEDIATYPE=image/jpeg:${url}`)
    }
  }

  addAddress(
    label?: string,
    ext?: string,
    street?: string,
    city?: string,
    state?: string,
    postal?: string,
    country?: string,
    type?: string
  ) {
    this.fields.push(
      `ADR${type ? ';TYPE=' + type : ''}:$${label};${ext};${street};${city};${state};${postal};${country}`
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
