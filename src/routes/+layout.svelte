<script>
  import '../app.css'
</script>

<!-- 
  Hidden div to ensure Tailwind includes all dynamic color classes
  This div is completely hidden but forces Tailwind to generate the CSS for these classes
-->
<div style="display: none;">
  <!-- Red colors -->
  <div class="bg-red-100"></div>
  <div class="bg-red-200"></div>
  <div class="bg-red-300"></div>
  <div class="bg-red-400"></div>
  <div class="bg-red-700"></div>
  <div class="bg-red-800"></div>
  <div class="bg-red-900"></div>
  <div class="hover:bg-red-300"></div>
  <div class="hover:bg-red-700"></div>
  <div class="active:bg-red-400"></div>
  <div class="active:bg-red-900"></div>
  <div class="focus:bg-red-300"></div>
  <div class="focus:bg-red-700"></div>
  
  <!-- Yellow colors -->
  <div class="bg-yellow-100"></div>
  <div class="bg-yellow-200"></div>
  <div class="bg-yellow-300"></div>
  <div class="bg-yellow-400"></div>
  <div class="bg-yellow-700"></div>
  <div class="bg-yellow-800"></div>
  <div class="bg-yellow-900"></div>
  <div class="hover:bg-yellow-300"></div>
  <div class="hover:bg-yellow-700"></div>
  <div class="active:bg-yellow-400"></div>
  <div class="active:bg-yellow-900"></div>
  <div class="focus:bg-yellow-300"></div>
  <div class="focus:bg-yellow-700"></div>
  
  <!-- Pink colors -->
  <div class="bg-pink-100"></div>
  <div class="bg-pink-200"></div>
  <div class="bg-pink-300"></div>
  <div class="bg-pink-400"></div>
  <div class="bg-pink-700"></div>
  <div class="bg-pink-800"></div>
  <div class="bg-pink-900"></div>
  <div class="hover:bg-pink-300"></div>
  <div class="hover:bg-pink-700"></div>
  <div class="active:bg-pink-400"></div>
  <div class="active:bg-pink-900"></div>
  <div class="focus:bg-pink-300"></div>
  <div class="focus:bg-pink-700"></div>
  
  <!-- Green colors -->
  <div class="bg-green-100"></div>
  <div class="bg-green-200"></div>
  <div class="bg-green-300"></div>
  <div class="bg-green-400"></div>
  <div class="bg-green-700"></div>
  <div class="bg-green-800"></div>
  <div class="bg-green-900"></div>
  <div class="hover:bg-green-300"></div>
  <div class="hover:bg-green-700"></div>
  <div class="active:bg-green-400"></div>
  <div class="active:bg-green-900"></div>
  <div class="focus:bg-green-300"></div>
  <div class="focus:bg-green-700"></div>
  
  <!-- Orange colors -->
  <div class="bg-orange-100"></div>
  <div class="bg-orange-200"></div>
  <div class="bg-orange-300"></div>
  <div class="bg-orange-400"></div>
  <div class="bg-orange-700"></div>
  <div class="bg-orange-800"></div>
  <div class="bg-orange-900"></div>
  <div class="hover:bg-orange-300"></div>
  <div class="hover:bg-orange-700"></div>
  <div class="active:bg-orange-400"></div>
  <div class="active:bg-orange-900"></div>
  <div class="focus:bg-orange-300"></div>
  <div class="focus:bg-orange-700"></div>
  
  <!-- Blue colors -->
  <div class="bg-blue-100"></div>
  <div class="bg-blue-200"></div>
  <div class="bg-blue-300"></div>
  <div class="bg-blue-400"></div>
  <div class="bg-blue-700"></div>
  <div class="bg-blue-800"></div>
  <div class="bg-blue-900"></div>
  <div class="hover:bg-blue-300"></div>
  <div class="hover:bg-blue-700"></div>
  <div class="active:bg-blue-400"></div>
  <div class="active:bg-blue-900"></div>
  <div class="focus:bg-blue-300"></div>
  <div class="focus:bg-blue-700"></div>
  
  <!-- Purple colors -->
  <div class="bg-purple-100"></div>
  <div class="bg-purple-200"></div>
  <div class="bg-purple-300"></div>
  <div class="bg-purple-400"></div>
  <div class="bg-purple-700"></div>
  <div class="bg-purple-800"></div>
  <div class="bg-purple-900"></div>
  <div class="hover:bg-purple-300"></div>
  <div class="hover:bg-purple-700"></div>
  <div class="active:bg-purple-400"></div>
  <div class="active:bg-purple-900"></div>
  <div class="focus:bg-purple-300"></div>
  <div class="focus:bg-purple-700"></div>
  
  <!-- Gray colors (fallback) -->
  <div class="bg-gray-100"></div>
  <div class="bg-gray-200"></div>
  <div class="bg-gray-300"></div>
  <div class="bg-gray-400"></div>
  <div class="bg-gray-700"></div>
  <div class="bg-gray-800"></div>
  <div class="bg-gray-900"></div>
  <div class="hover:bg-gray-300"></div>
  <div class="hover:bg-gray-700"></div>
  <div class="active:bg-gray-400"></div>
  <div class="active:bg-gray-900"></div>
  <div class="focus:bg-gray-300"></div>
  <div class="focus:bg-gray-700"></div>
</div>

<slot />
