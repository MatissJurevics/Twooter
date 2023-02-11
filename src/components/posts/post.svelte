<script>
    import { fade } from "svelte/transition";

    export let content;
</script>

<article
  class="my-4 w-full min-h-64 bg-base-200 p-4 rounded-xl"
  transition:fade={{ duration: 200 }}
>
  <div class="flex flex-row justify-between mb-4">
    <div class="flex flex-row">
      <div class="h-12 w-12 rounded-full bg-base-300 mr-4" />
      <div>
        <h3 class="font-semibold cursor-pointer hover:font-bold">Username</h3>
        <p class="font-light text-sm ">01/01/2002</p>
      </div>
    </div>

    <div class="flex flex-col justify-center align-middle cursor-pointer">
      <div class="h-8 w-4 rounded-full bg-base-300" />
    </div>
  </div>

  <p class="text-xl w-full font-light break-words overflow-hidden">{content}</p>
</article>
