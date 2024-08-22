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

  function onClickDownload(): void {
    generateVCard(contact)
  }
</script>

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
  <button class="download-contact-btn" onclick={onClickDownload}>Download Contact</button>

  <div class="info-container">
    {#if contact.email}
      <Item iconSrc={'/icons/email.svg'} id="1" value={contact.email} copy={onClickCopy} />
    {/if}
    {#if contact.cellPhone}
      <Item iconSrc={'/icons/phone.svg'} id="2" value={contact.cellPhone} copy={onClickCopy} />
    {/if}
    {#if contact.url}
      <Item iconSrc={'/icons/website.svg'} id="3" value={contact.url} copy={onClickCopy} />
    {/if}
    {#if contact.socialUrls?.['linkedin']}
      <Item
        iconSrc={'/icons/linkedin.svg'}
        id="4"
        value={contact.socialUrls['linkedin']}
        copy={onClickCopy}
      />
    {/if}
    {#if contact.socialUrls?.['facebook']}
      <Item
        iconSrc={'/icons/facebook.svg'}
        id="5"
        value={contact.socialUrls['facebook']}
        copy={onClickCopy}
      />
    {/if}
    {#if contact.socialUrls?.['instagram']}
      <Item
        iconSrc={'/icons/instagram.svg'}
        id="6"
        value={contact.socialUrls['instagram']}
        copy={onClickCopy}
      />
    {/if}
    {#if contact.socialUrls?.['twitter']}
      <Item
        iconSrc={'/icons/twitter.svg'}
        id="7"
        value={contact.socialUrls['twitter']}
        copy={onClickCopy}
      />
    {/if}
    {#if contact.socialUrls?.['line']}
      <Item
        iconSrc={'/icons/line.svg'}
        id="8"
        value={contact.socialUrls['line']}
        copy={onClickCopy}
      />
    {/if}
  </div>
</div>

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
