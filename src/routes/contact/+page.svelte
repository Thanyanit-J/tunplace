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

<div class="container">
  <Vcard {contact} />
</div>

<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f1f1f1;
  }
</style>
