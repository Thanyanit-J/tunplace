<script lang="ts">
  import { getDayBasedColor } from '../dayBasedColor'
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

  function getContactHref(value: string, field: ContactField): string {
    if (field === 'email') {
      return `mailto:${value}`
    } else if (field === 'phone') {
      return `tel:${value}`
    } else if (field === 'url' || field.includes('socialUrls')) {
      return value
    }
    return '#'
  }

  function getContactTarget(field: ContactField): string {
    if (field === 'url' || field.includes('socialUrls')) {
      return '_blank'
    }
    return '_self'
  }

  // Touch handling for mobile
  let touchTimeout: ReturnType<typeof setTimeout> | null = null
  let touchStartTime = 0
  let isLongPress = false

  function onTouchStart(event: TouchEvent): void {
    touchStartTime = Date.now()
    isLongPress = false
    
    const isMobile = window.innerWidth < (48 * parseFloat(getComputedStyle(document.documentElement).fontSize)) // md breakpoint 48 rem ≈ 768px
    if (isMobile) {
      touchTimeout = setTimeout(() => {
        isLongPress = true
        // TODO: Implement long press action here
        console.log('Long press detected - implement your action here')
      }, 500)
    }
  }

  function onTouchEnd(event: TouchEvent): void {
    if (touchTimeout) {
      clearTimeout(touchTimeout)
      touchTimeout = null
    }

    // If it was a long press, prevent the <a> tag from triggered
    if (isLongPress) {
      event.preventDefault()
    }
  }

  function onTouchCancel(event: TouchEvent): void {
    if (touchTimeout) {
      clearTimeout(touchTimeout)
      touchTimeout = null
    }
    isLongPress = false
  }

  /** Prevent right click only during long press; especially when holding the buttons, which counts as right click on touchscreen */
  function onContextMenu(event: Event) {
    const isMobile = window.innerWidth < (48 * parseFloat(getComputedStyle(document.documentElement).fontSize)) // md breakpoint 48 rem ≈ 768px
    if (isMobile && isLongPress) {
      event.preventDefault()
    }
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

  let dayColor = $derived(getDayBasedColor());
</script>

<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->

<div class="max-w-svw mx-auto my-4 px-3 py-6 bg-{dayColor}-100 rounded-2xl shadow-lg">
  <!-- Profile Section -->
  <div class="text-center mb-6">
    {#if contact.photo}
      {@const photo = Array.isArray(contact.photo) ? contact.photo[0] : contact.photo}
      {#if photo?.displayedPhotoUrl || (photo?.base64 && photo?.base64String) || photo?.url}
        <img 
          src={photo?.displayedPhotoUrl || (photo?.base64 && photo?.base64String ? `data:image/${photo.mediaType.toLowerCase()};base64,${photo.base64String}` : photo?.url)} 
          alt="" 
          class="w-24 h-24 rounded-full mb-4 mx-auto object-cover" 
        />
      {/if}
    {/if}
    {#if contact.firstName}
      <h1 class="text-xl font-semibold text-gray-800 mb-2">
        {contact.firstName}
        {#if contact.lastName}
          {contact.lastName}
        {/if}
      </h1>
    {/if}
    {#if contact.title}
      <p class="text-gray-700 mb-4">{contact.title}</p>
    {/if}
    <button 
      class="w-full bg-{dayColor}-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-{dayColor}-700 active:bg-{dayColor}-900 touch-manipulation" 
      onclick={onClickDownloadContact}
    >
      Download Contact
    </button>
  </div>

  <!-- Links Section -->
  <div class="space-y-3">
    {#each contactItems as item}
      {@const values = getValue(contact, item.field)}
      {#each values as value, index}
        <div 
          class="bg-white rounded-lg overflow-hidden relative"
          id="{item.id}-{index}"
        >
          <div class="flex items-center min-h-16">
            <!-- Icon and Content -->
            <a 
              href={getContactHref(value, item.field)}
              target={getContactTarget(item.field)}
              class="flex items-center flex-1 min-w-0 p-4 min-h-16 hover:bg-{dayColor}-300 active:bg-{dayColor}-400 transition-colors touch-manipulation no-underline"
              ontouchstart={onTouchStart}
              ontouchend={onTouchEnd}
              ontouchcancel={onTouchCancel}
              oncontextmenu={onContextMenu}
            >
              <img 
                src={item.iconSrc} 
                alt="" 
                class="w-6 h-6 mr-3 flex-shrink-0 pointer-events-none select-none" 
                draggable="false"
                oncontextmenu={(e) => e.preventDefault()}
              />
              <span class="text-gray-800 truncate">{value}</span>
            </a>
            
            <!-- Copy Button Area - hidden on mobile, extends to edges on desktop -->
            <button 
              class="hidden md:flex h-full min-h-16 px-4 bg-{dayColor}-200 hover:bg-{dayColor}-300 active:bg-{dayColor}-400 text-gray-700 text-sm items-center justify-center touch-manipulation"
              onclick={() => onClickCopy(value)}
              title="Copy {value}"
            >
              Copy
            </button>
          </div>
        </div>
      {/each}
    {/each}
  </div>
</div>

<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
