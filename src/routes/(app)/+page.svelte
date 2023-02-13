<script>
  // Importing Libraries
    import { auth, db } from "../../firebase.js";
  import { onMount } from "svelte";
  import { user, twoots } from "../../stores.js";
  import { collection, query, limit, getDocs, doc, getDoc, addDoc, Timestamp, orderBy, onSnapshot } from "firebase/firestore";
  // Importing Components
  import Post from "../../components/posts/post.svelte";
  import Error from "../../components/error/error.svelte";
  
  
  let count = 0;
  let text = "";
  let err = false;
  let errContent = "";


  onMount(() => {
    auth.onAuthStateChanged(async (userData) => {
      if (!userData) {
        window.location.href = "/login";
      } else {
        let docRef = doc(db, "Users", userData.uid)
        let docSnap = await getDoc(docRef)

        $user = docSnap.data()
        
      }
  })});

  // load twoots from firestore
  const getTwoots = async () => {
    const twootRef = collection(db, "Twoots")
    const q = query(twootRef, limit(10), orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    $twoots = [];

    querySnapshot.forEach((doc) => {
      $twoots = [doc.data(), ...$twoots];
    });

    return $twoots;
  };

  let unsub = onSnapshot(collection(db, "Twoots"), (docs) => {
    $twoots = [];
    docs.forEach((doc) => {
      $twoots = [doc.data(), ...$twoots];
    });
    console.log($twoots);
  });

  // update the wordcount for the wordcounter in the textbox to work
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

  const sendPost = async () => {
    if (text.length >= 256 || text.length == 0) {
      handleError("Text is invalid (either too long or too short)");
      return;
    }
    let userRef = doc(db, "Users", "l6dOY7tIpidTxYxwjdQA1NgZ1Z12");
    let data = {
      creator: userRef,
      createdAt: Timestamp.now(),
      likes: [],
      textContent: text,
    }
    let docRef = collection(db, "Twoots")
    await addDoc(docRef, data)
    text = "";
    updateCount();
  };

  

</script>




{#if err}
  <Error message={errContent} />
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
    
    {#await getTwoots()}
      <p>loading...</p>
    {:then two} 
      {#each $twoots as twoot}
        <Post info={twoot} />
      {/each}
    {/await}
    
    
  </section>
</main>

<footer />
