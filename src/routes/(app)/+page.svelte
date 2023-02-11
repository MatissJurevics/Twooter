<script>
  import { fly, fade } from "svelte/transition";
  import Post from "../../components/posts/post.svelte";
  import { auth } from "../../firebase.js";
  import { redirect } from "@sveltejs/kit"

  // if (!auth.currentUser) {
  //   throw redirect(302, "/login");
  // }
  let count = 0;
  let text = "";
  let err = false;
  let errContent = "";
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

</script>




{#if err}
  <div
    class="alert alert-error shadow-lg absolute top-24"
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

<main class="pt-24">
  <section
    class=" h-96 flex flex-col justify-center align-middle min-w-[300px] w-[40vw] mx-auto"
  >
    <h2 class="text-2xl font-medium py-3">Whats on your mind today?</h2>
    <div class="w-full relative">
      <textarea
        class="border- outline-none rounded-3xl p-3 w-full h-64 resize-none text-xl font-light bg-base-300 focus:border-[2px] border-base-content/20"
        bind:value={text}
        on:input={() => updateCount()}
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
    class=" h-full flex flex-col justify-start min-w-[300px] w-[40vw] mx-auto mt-8"
  >
    <h1 class="text-5xl my-3 font-bold">Posts</h1>
    {#each posts as post}
      <Post content={post} />
    {/each}
  </section>
</main>

<footer />
