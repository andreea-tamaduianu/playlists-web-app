<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>
          <div class="btn-wrapper text-center">
            <!-- <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/github.svg"
              /></span>
              <span class="btn-inner--text">Github</span>
            </a> -->
            <a
              v-on:click="googleLogin"
              href="#"
              class="btn btn-neutral btn-icon"
            >
              <span class="btn-inner--icon"
                ><img src="img/icons/common/google.svg"
              /></span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div>
        <!-- <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Or sign in with credentials</small>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            >
            </base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            >
            </base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <base-button
                v-on:click="emailLogin(model.email, model.password)"
                type="primary"
                class="my-4"
                >Sign in</base-button
              >
            </div>
          </form>
        </div> -->
      </div>
      <div class="row mt-3">
        <!-- <div class="col-6">
          <a href="#" class="text-light"><small>Forgot password?</small></a>
        </div> -->
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"
            ><small>Create new account</small></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { auth, firebase } from "../configs/firebase";
import Axios from "../configs/axios";

export default {
  name: "login",
  methods: {
    async googleLogin() {
      // 1 - init Google Auth Provider
      const provider = new firebase.auth.GoogleAuthProvider();
      // 2 - create the popup signIn
      await auth.signInWithPopup(provider).then(
        async () => {
          // 3 - pick the result and store the token
          const token = await auth.currentUser.getIdToken(true);
          // 4 - check if have token in the current user
          if (token) {
            // 5 - put the token at localStorage (We'll use this to make requests)
            localStorage.setItem("@token", token);

            Axios.defaults.headers.common["authorization"] = "Bearer " + token;

            // 6 - navigate user to the book list
            this.$router.push("dashboard");
          }
        },
        function(error) {
          console.log(error);
        },
      );
    },
    async emailLogin(email, password) {
      // 2 - create the popup signIn
      await auth.signInWithEmailAndPassword(email, password).then(
        async (result) => {
          console.log(result);
          // 3 - pick the result and store the token
          const token = await auth.currentUser.getIdToken(true);
          // 4 - check if have token in the current user
          if (token) {
            // 5 - put the token at localStorage (We'll use this to make requests)
            localStorage.setItem("@token", token);
            // 6 - navigate user to the book list
          }
        },
        function(error) {
          console.log(error);
        },
      );
    },
  },
  data() {
    return {
      model: {
        email: "",
        password: "",
      },
    };
  },
};
</script>
<style></style>
