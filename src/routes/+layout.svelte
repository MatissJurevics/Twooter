<script>
  import "../app.css";
  import { theme } from "../stores.js";
  import Navbar from "../components/navbar.svelte";
  
</script>

<div class="min-h-screen w-screen" data-theme="{$theme}">
  <Navbar />
  <slot />
</div>