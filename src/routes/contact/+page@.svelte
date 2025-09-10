<script lang="ts">
  import { getDayBasedColor } from '../dayBasedColor'
  import type { Contact } from './vcard.service'
  import Vcard from './vcard.svelte'
  import { onMount } from 'svelte'

  let contact: Contact = {
    firstName: 'Thanyanit',
    lastName: 'Jongjitragan',
    title: 'Software Developer',
    photo: {
      url: '/images/profile.webp',
      base64String: '',
      mediaType: 'WEBP',
      base64: false
    },
    email: [
      {
        label: 'Main',
        value: 'thanyanit.jon@gmail.com'
      }
    ],
    url: [
      {
        value: 'https://tunplace.com'
      }
    ],
    socialUrls: {
      linkedIn: 'https://linkedin.com/in/thanyanit-jon'
    }
  }

  let dayColor = $derived(getDayBasedColor())

  // Function to convert image URL to base64
  async function convertImageToBase64(url: string): Promise<string> {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          // Remove the data URL prefix (e.g., "data:image/webp;base64,")
          const base64 = result.split(',')[1]
          resolve(base64)
        }
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.error('Error converting image to base64:', error)
      return ''
    }
  }

  // Convert photo to base64 on component mount
  onMount(async () => {
    if (contact.photo && !Array.isArray(contact.photo) && contact.photo.url) {
      const base64String = await convertImageToBase64(contact.photo.url)
      if (base64String) {
        contact.photo = {
          ...contact.photo,
          base64String,
          base64: true
        }
      }
    }
  })
</script>

<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->

<div class="w-screen h-svh bg-{dayColor}-800 overflow-auto">
  <div class="min-h-full flex justify-center items-center p-4">
    <Vcard {contact} />
  </div>
</div>

<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->

<style>
</style>
