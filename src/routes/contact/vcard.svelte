<script lang="ts">
  import { generateVCard, type Contact } from './vcard.service'

  type vCardProps = {
    contact: Contact
  }

  let { contact }: vCardProps = $props()

  function onClickCopy(value: string): void {
    navigator.clipboard.writeText(value)
    // TODO: Implement "{{item}} is copied" toast
  }

  function onClickDownloadContact(): void {
    generateVCard(contact)
  }
  
  type ContactItem = {
    field: ContactField
    iconSrc: string
    id: string
  }

  const contactItems: ContactItem[] = [
    { field: 'email', iconSrc: '/icons/email.svg', id: '1' },
    { field: 'phone', iconSrc: '/icons/phone.svg', id: '2' },
    { field: 'url', iconSrc: '/icons/website.svg', id: '3' },
    { field: 'socialUrls.linkedIn', iconSrc: '/icons/linkedin.svg', id: '4' },
    { field: 'socialUrls.facebook', iconSrc: '/icons/facebook.svg', id: '5' },
    { field: 'socialUrls.instagram', iconSrc: '/icons/instagram.svg', id: '6' },
    { field: 'socialUrls.twitter', iconSrc: '/icons/twitter.svg', id: '7' },
    { field: 'socialUrls.LINE', iconSrc: '/icons/line.svg', id: '8' }
  ];
  
  type IsPlainObject<T> =
  T extends object
    ? T extends Function | Date | readonly any[] ? false : true
    : false;

  type ObjectKeyChaining<T> = {
    [K in keyof T & string]:
      IsPlainObject<NonNullable<T[K]>> extends true
        ? `${K}.${ObjectKeyChaining<NonNullable<T[K]>>}`
        : K
  }[keyof T & string];

  type ContactField = ObjectKeyChaining<Contact>;

  function getValue(contact: Contact, field: ContactField): string[] {
    const parts = field.split(".");
    let value: unknown = contact;
    for (const part of parts) {
      if (value === null || value === undefined) return [];
      value = (value as Record<string, unknown>)?.[part];
    }
    
    if (value === null || value === undefined) return [];
    
    // Handle array values
    if (Array.isArray(value)) {
      return value.map(item => {
        if (typeof item === 'string') return item;
        if (typeof item === 'object' && item !== null && 'value' in item) {
          return (item as { value: unknown }).value as string;
        }
        return String(item);
      }).filter(Boolean);
    }
    
    // Handle single values
    if (typeof value === 'object' && value !== null && 'value' in value) {
      const extractedValue = (value as { value: unknown }).value;
      return extractedValue ? [String(extractedValue)] : [];
    }
    
    return value ? [String(value)] : [];
  }

</script>

<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->

<div class="card">
  {#if contact.photo}
    {@const photo = Array.isArray(contact.photo) ? contact.photo[0] : contact.photo}
    {#if photo?.base64}
      <img src={photo.base64String} alt="" class="profile-image" />
    {:else if photo?.url}
      <img src={photo.url} alt="" class="profile-image" />
    {/if}
  {/if}
  {#if contact.firstName}
    <h2>
      {contact.firstName}
      {#if contact.lastName}
        {contact.lastName}
      {/if}
    </h2>
  {/if}
  {#if contact.role}
    <p>{contact.role}</p>
  {/if}
  <button class="download-contact-btn" onclick={onClickDownloadContact}>Download Contact</button>

  <div class="info-container">
    {#each contactItems as item}
      {@const values = getValue(contact, item.field)}
      {#each values as value, index}
        <div class="item-container" id="{item.id}-{index}">
          <img src={item.iconSrc} alt="" class="item-icon" height="25px" />
          <div class="item-value">{value}</div>
          <button class="item-copy-btn" onclick={() => onClickCopy(value)}>Copy</button>
        </div>
      {/each}
    {/each}
  </div>
</div>

<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->

<style>
  .card {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
  }

  .profile-image {
    border-radius: 50%;
    height: 100px;
    width: 100px;
  }

  .download-contact-btn {
    background-color: #6200ea;
    border: none;
    color: white;
    padding: 12px 24px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px;
    transition:
      background-color 0.1s,
      box-shadow 0.1s;
    cursor: pointer;
  }

  .download-contact-btn:hover {
    background-color: #3700b3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .download-contact-btn:active {
    background-color: #6200ea;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .info-container {
    display: grid;
    gap: 10px;
    margin: 20px;
  }

  .item-container {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 10px;
    align-content: center;
    justify-content: center;
    align-items: center;
    justify-items: start;
  }

  .item-icon {
    width: 25px;
  }

  .item-value {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-copy-btn {
    background-color: #6200ea;
    border: none;
    color: white;
    padding: 4px 8px;
    text-align: center;
    font-size: 12px;
    border-radius: 4px;
    transition:
      background-color 0.1s,
      box-shadow 0.1s;
    cursor: pointer;
  }

  .item-copy-btn:hover {
    background-color: #3700b3;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
