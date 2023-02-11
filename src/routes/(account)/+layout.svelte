<script>
    import "../../app.css";
    import { theme } from "../../stores.js";
    
  </script>
  
  <div class="min-h-screen w-screen" data-theme="{$theme || 'night'}">
    <slot />
  </div>