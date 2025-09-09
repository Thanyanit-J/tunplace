<script lang="ts">
  import { getDayBasedColor } from '../dayBasedColor'
  import type { Contact } from './vcard.service'
  import Vcard from './vcard.svelte'

  let contact: Contact = {
    firstName: 'Thanyanit',
    lastName: 'Jongjitragan',
    title: 'Software Developer',
    photo: {
      url: '/images/profile.webp',
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
