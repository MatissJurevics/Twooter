<script>
    import { fly } from "svelte/transition";
    import FaEnvelope from 'svelte-icons/fa/FaEnvelope.svelte'
    import { theme } from "../stores.js";
    
    let showMenu = false;
    
    const toggleMenu = () => {
        showMenu = !showMenu;
    }
</script>

<nav class="navbar bg-base-200 px-8 fixed z-10">
    <div class="navbar-start">
      <button class="w-8 h-8 rounded-full bg-white cursor-pointer" on:click={() => toggleMenu()}>
      </button>
    </div>
    <div class="navbar-middle">
      <h2 class="text-2xl font-bold">Twooter!</h2>
    </div>
    <div class="navbar-end">
      <div class="h-8 w-8 cursor-pointer">
        <FaEnvelope />
      </div>
    </div>
  </nav>
  
  {#if showMenu}
    <div class="h-[100vh] min-w-[300px] w-40vw bg-base-200 rounded-r-xl shadow-xl top-0 left-0 fixed z-20 p-8" transition:fly={{ x:-500, duration: 500}}>
        <div class="flex flex-row">
          <div>
            <img src="https://picsum.photos/200" alt="" class="h-12 w-12 rounded-full">
          </div>
          <div>
            <div class="ml-4">
                <p class="font-semibold text-xl">Username</p>
                <p>IDK Yet</p>
          </div>
          </div>
        </div>

        <ul class="mt-16 w-full h-auto">
            <li class="py-4 w-full border-y-2 border-y-base-100 hover:bg-base-100 cursor-pointer">Home</li>
            <li class="py-4 w-full border-y-2 border-y-base-100 hover:bg-base-100 cursor-pointer">Profile</li>
            <li class="py-4 w-full border-y-2 border-y-base-100 hover:bg-base-100 cursor-pointer">Settings</li>
            <li class="py-4 w-full border-y-2 border-y-base-100 hover:bg-base-100 cursor-pointer">Logout</li>
        </ul>
        <select class="select absolute bottom-4 left-4" name="theme" bind:value={$theme} id="">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="night">night</option>
            <option value="fantasy">fantasy</option>
            <option value="corporate">corporate</option>
        </select>
    </div>
  
    
  {/if}

  