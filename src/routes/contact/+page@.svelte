<script lang="ts">
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
</script>

<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->

<div class="flex justify-center items-center h-screen w-screen max-h-screen max-w-screen bg-gray-100">
  <Vcard {contact} />
</div>

<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->

<style>
</style>
