<script>
    import { fly, fade } from "svelte/transition";
    import FaEnvelope from 'svelte-icons/fa/FaEnvelope.svelte'
    import { theme } from "../stores.js";
    import Cookies from 'js-cookie';


    let newTheme = $theme
    let showMenu = false;

    const updateTheme = () => {
        $theme = newTheme;
        Cookies.set('theme', newTheme);
    }
    
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
    <div class="h-[100vh] min-w-[300px] w-40vw bg-base-200 rounded-r-xl shadow-xl top-0 left-0 fixed z-20 p-8" transition:fly={{ x:-500, duration: 300}}>
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
        <select class="select absolute bottom-4 left-4 select-ghost" name="theme" bind:value={newTheme} on:change={() => updateTheme()} id="">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="night">Night</option>
            <option value="fantasy">Fantasy</option>
            <option value="corporate">Corporate</option>
        </select>
    </div>
    <div class="z-10 bg-black/10 h-screen w-screen absolute top-0 left-0" on:keydown={(e) => {if (e.key = "escape") {toggleMenu()}}} on:click={() => toggleMenu()} transition:fade>

    </div>
  
    
  {/if}

  