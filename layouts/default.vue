<template>
  <v-app>
  <v-app-bar app>
    <v-btn text nuxt to="/">Home</v-btn>
    <v-btn text nuxt to="/rooms/1">Room</v-btn>
    <v-spacer></v-spacer>
    <div v-if="!$auth.loggedIn">
      <v-btn text nuxt to="/login">login</v-btn>
      <v-btn text nuxt to="/register">register</v-btn>
    </div>  
    <div v-else>
      {{ $auth.user.name }}}
      <v-btn text nuxt to="/dashboard">dashboard</v-btn>
      <v-btn text>logout</v-btn>
    </div>
  </v-app-bar>

  <v-main>
      <Nuxt/>
  </v-main>

  <v-footer color="white">
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Provided by WIP </strong>
    </v-col>
  </v-footer>
</v-app>
</template>

<script>
import NuxtLogo from '~/components/NuxtLogo.vue';
import Pages from '~/pages/login.vue';
export default {
    name: "DefaultLayout",
    components: { NuxtLogo }
}
</script>