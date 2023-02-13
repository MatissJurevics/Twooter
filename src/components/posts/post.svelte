<script>
    import { fade } from "svelte/transition";
    import { getDoc } from "firebase/firestore";

    export let info;
    let { creator, textContent } = info

    // using the creator reference get the user info
    const getUserInfo = async () => {
        const docSnap = await getDoc(creator);
        return docSnap.data()
    }
</script>

<article
  class="my-4 w-full min-h-64 bg-base-200 p-4 rounded-xl"
  transition:fade={{ duration: 200 }}
>
  <div class="flex flex-row justify-between mb-4">
    {#await getUserInfo()}
    <div class="flex flex-row">
      <div class="h-12 w-12 rounded-full bg-base-300 mr-4" />
      <div>
        <h3 class="font-semibold cursor-pointer hover:font-bold">Loading...</h3>
        <p class="font-light text-sm ">01/01/2002</p>
      </div>
    </div>

    <div class="flex flex-col justify-center align-middle cursor-pointer">
      <div class="h-8 w-4 rounded-full bg-base-300" />
    </div>
    {:then userData} 
    <div class="flex flex-row">
      
        <img class="h-12 w-12 mask mask-hexagon bg-base-300 mr-4" src="{userData.photoURL}" alt="">
      
      <div>
        <h3 class="font-semibold cursor-pointer hover:font-bold">{ userData.username }</h3>
        <p class="font-light text-sm ">{ userData.tag}</p>
      </div>
    </div>

    <div class="flex flex-col justify-center align-middle cursor-pointer relative">
      <div class="h-8 w-4 rounded-full bg-base-content group"> 
        <ul class="menu bg-base-100 w-56 p-2 rounded-box absolute z-10 hidden group-hover:flex">
          <li><p>Delete</p></li>
          <li><p>IDK</p></li>
          <li><p>IDK</p></li>
        </ul>
      </div>
    </div>
    {/await}

    
  </div>

  <p class="text-xl w-full font-light break-words overflow-hidden whitespace-pre-wrap">{textContent}</p>
</article>
