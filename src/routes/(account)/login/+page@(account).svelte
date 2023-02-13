<script>
  import { auth, db } from "../../../firebase.js";
  import FaGoogle from "svelte-icons/fa/FaGoogle.svelte";
  import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { doc, getDoc, setDoc } from "firebase/firestore" 

  const provider = new GoogleAuthProvider();
  
  


  const googleLogin = () => {
    signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      let testRef = doc(db, "Users", user.uid)
      let testSnap = await getDoc(testRef)
      // create variable tagName that is user.displayname but a slug
      let tagName = user.displayName.replace(" ", "_")

      let data = {
        bannerURL: "",
        followers: [],
        following: [],
        photoURL: user.photoURL,
        tag: `@${tagName}`,
        twoots: [],
        username: user.displayName
      }
      if (!testSnap.data()) {
        setDoc(doc(db, "Users", user.uid), data)
      }




      // redirect to home page
        window.location.href = "/"
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
    <input disabled type="text" class="input" placeholder="Email Address..." />
    <input disabled type="password" class="input mt-4" placeholder="Password..." />
    <button disabled class="btn btn-primary mt-4">Login</button>
    <button on:click={() => googleLogin()} class="btn btn-secondary mt-4"
      ><span class="w-6 h-6 mr-2"><FaGoogle /></span> Sign in with Google
    </button>
  </div>
</main>
