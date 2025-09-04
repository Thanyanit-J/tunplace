<script lang="ts">
  import Item from './item.svelte'
  import { generateVCard, type Contact } from './vcard'

  type vCardProps = {
    contact: Contact
  }

  let { contact }: vCardProps = $props()

  function onClickCopy(id: string): void {
    // TODO: Implement "{{item}} is copied" toast
    console.log(`${id} is copied`)
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
    { field: 'cellPhone', iconSrc: '/icons/phone.svg', id: '2' },
    { field: 'url', iconSrc: '/icons/website.svg', id: '3' },
    { field: 'socialUrls.linkedIn', iconSrc: '/icons/linkedin.svg', id: '4' },
    { field: 'socialUrls.facebook', iconSrc: '/icons/facebook.svg', id: '5' },
    { field: 'socialUrls.instagram', iconSrc: '/icons/instagram.svg', id: '6' },
    { field: 'socialUrls.twitter', iconSrc: '/icons/twitter.svg', id: '7' },
    { field: 'socialUrls.line', iconSrc: '/icons/line.svg', id: '8' }
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

  type DeepObjectType<T, P extends string> =
    P extends keyof T
      ? T[P]
      : P extends `${infer K}.${infer R}`
        ? K extends keyof T
          ? IsPlainObject<NonNullable<T[K]>> extends true
            ? DeepObjectType<NonNullable<T[K]>, R>
            : never
          : never
        : never;

  function getValue(contact: Contact, field: ContactField): DeepObjectType<Contact, ContactField> {
    const parts = field.split(".");
    let value: unknown = contact;
    for (const part of parts) {
      if (value === null || value === undefined) return undefined;
      value = (value as Record<string, unknown>)?.[part];
    }
    return value as DeepObjectType<Contact, ContactField>;
  }

</script>

<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->

<div class="card">
  {#if contact.photo}
    {#if contact.photo.base64}
      <img src={contact.photo.base64String} alt="" class="profile-image" />
    {:else}
      <img src={contact.photo.url} alt="" class="profile-image" />
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
      {@const value = getValue(contact, item.field)?.toString()}
      {#if value}
        <Item
          iconSrc={item.iconSrc}
          id={item.id}
          value={value ?? ''}
          copy={onClickCopy}
        ></Item>
      {/if}
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
</style>
