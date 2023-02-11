<script>
  import { fly, fade } from "svelte/transition";
  import FaEnvelope from 'svelte-icons/fa/FaEnvelope.svelte'

  let count = 0;
  let text = "";
  let err = false;
  let errContent = "";
  let showMenu = false;
  $: posts = [
    "This is a test post to see how well the post feature will work. This post will be more than 1 line long in order to see just how well the overflow works.",
  ];

  const updateCount = () => {
    count = text.length;
  };

  const handleError = (errCont) => {
    err = true;
    errContent = errCont;
    setTimeout(() => {
      err = false;
      err = err;
    }, 3000);
  };

  const sendPost = () => {
    if (text.length >= 256 || text.length == 0) {
      handleError("Text is invalid (either too long or too short)");
      return;
    }
    posts.unshift(text);
    text = "";
    updateCount();
    posts = posts;
  };

  const toggleMenu = () => {
    showMenu = !showMenu;
  }
</script>

<nav class="navbar bg-base-200 px-8">
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
  <div class="h-[100vh] min-w-[300px] w-40vw bg-base-200 rounded-r-xl shadow-xl top-0 left-0 fixed" transition:fly={{ x:-500, duration: 500}}>
    <div class="flex">
      <div></div>
      <div></div>
    </div>
  </div>
{/if}



{#if err}
  <div
    class="alert alert-error shadow-lg absolute"
    transition:fly={{ y: -200, duration: 500 }}
  >
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
      <span>{errContent}</span>
    </div>
  </div>
{/if}

<main>
  <section
    class="w-full h-96 flex flex-col justify-center align-middle min-w-[400px] w-[50vw] mx-auto"
  >
    <h2 class="text-2xl font-medium py-3">Whats on your mind today?</h2>
    <div class="w-full relative">
      <textarea
        class="border- outline-none rounded-3xl p-3 w-full h-64 resize-none text-xl font-light bg-base-300"
        bind:value={text}
        on:input={() => updateCount()}
        on:keydown={(e) => {
          if (e.key == "Enter") {
            sendPost();
          }
        }}
        name=""
        id=""
        placeholder="Write something..."
        cols="30"
        rows="10"
      />
      <p
        class="radial-progress absolute bottom-3 right-3 z-10 text-sm {count >=
          128 && count < 200
          ? 'text-warning'
          : count >= 200
          ? 'text-error'
          : ''}"
        style="--value: {(count / 256) * 100}; --size: 2rem;"
      >
        {count > 200
          ? (count - 256) * -1
          : ""
        }
      </p>
    </div>

    <button class="btn btn-primary mt-4" on:click={(e) => sendPost(e)}
      >Submit</button
    >
  </section>

  <section
    class="w-full h-full flex flex-col justify-start min-w-[400px] w-[50vw] mx-auto mt-8"
  >
    <h1 class="text-5xl my-3 font-bold">Posts</h1>
    {#each posts as post}
      <article class="my-4 w-full min-h-64 bg-base-200 p-4 rounded-xl"  transition:fade={{ duration: 200 }}
      >
        <div class="flex flex-row justify-between mb-4">
          <div class="flex flex-row">
            <div class="h-12 w-12 rounded-full bg-base-300 mr-4" />
            <div>
              <h3 class="font-semibold cursor-pointer hover:font-bold">
                Username
              </h3>
              <p class="font-light text-sm ">01/01/2002</p>
            </div>
          </div>

          <div class="flex flex-col justify-center align-middle cursor-pointer">
            <div class="h-8 w-4 rounded-full bg-base-300" />
          </div>
        </div>

        <p class="text-xl w-full font-light break-words overflow-hidden">{post}</p>
        
      </article>
    {/each}
  </section>
</main>

<footer />
