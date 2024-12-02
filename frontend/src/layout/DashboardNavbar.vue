<template>
  <base-nav
    class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
    <div
      class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
    />
    <!-- <form
      class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
    >
      <div class="form-group mb-0">
        <base-input
          placeholder="Search"
          class="input-group-alternative"
          alternative=""
          addon-right-icon="fas fa-search"
        >
        </base-input>
      </div>
    </form> -->
    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
          <div class="media align-items-center" slot="title">
            <span class="avatar avatar-sm rounded-circle">
              <img v-bind:src="photoURL" alt="Image placeholder" />
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm  font-weight-bold">{{ username }}</span>
            </div>
          </div>

          <template>
            <router-link to="/login" class="dropdown-item">
              <span v-on:click="logout">
                <i class="ni ni-user-run"></i>
                <span>Logout</span>
              </span>
            </router-link>
          </template>
        </base-dropdown>
      </li>
    </ul>
  </base-nav>
</template>
<script>
export default {
  beforeMount() {
    var request = indexedDB.open("firebaseLocalStorageDb", 1);

    var vm = this;
    request.onsuccess = async function() {
      let db = request.result;

      var transaction = db.transaction("firebaseLocalStorage", "readwrite");
      var objectStore = transaction.objectStore("firebaseLocalStorage");
      var req = await objectStore.getAll();

      req.onsuccess = (result) => {
        console.log(result.target.result[0].value);
        vm.username = result.target.result[0].value.displayName;
        vm.photoURL = result.target.result[0].value.photoURL;
      };

      // Enable our buttons once the IndexedDB instance is available.
    };
  },
  data() {
    return {
      username: "",
      photoURL: "",
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
    };
  },
  methods: {
    logout() {
      localStorage.clear();
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
