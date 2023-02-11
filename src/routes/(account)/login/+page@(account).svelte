<script>
  import { auth } from "../../../firebase.js";
  import FaGoogle from "svelte-icons/fa/FaGoogle.svelte";
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { redirect } from "@sveltejs/kit";

  const provider = new GoogleAuthProvider();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      redirect(302, "/");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

</script>

<main class="flex flex-col h-screen w-screen items-center justify-center">
  <div
    class="min-h-[400px] min-w-[300px] bg-base-300 h-[60vh] w-[40vw] rounded-2xl flex flex-col justify-center items-center"
  >
    <h1 class="text-3xl font-bold mb-4">Login</h1>
    <input type="text" class="input" placeholder="Email Address..." />
    <input type="password" class="input mt-4" placeholder="Password..." />
    <button class="btn btn-primary mt-4">Login</button>
    <button on:click={() => googleLogin()} class="btn btn-secondary mt-4"
      ><span class="w-6 h-6 mr-2"><FaGoogle /></span> Sign in with Google
    </button>
  </div>
</main>
