<template>
  <div id="app">

    <v-layout row justify-center>
      <v-app-bar app dark color="#1976d2" class="hidden-xs-and-down">
        <v-toolbar-title>TryCar Task</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              v-for="item in nav"
              :key="item.icon"
              :to="item.to"
              :title="item.title"
              text

          >
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            {{ item.text }}
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <v-app-bar app dark color="#1976d2" class="hidden-sm-and-up">
        <v-toolbar-title>TryCar Task</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon dark v-on="on"></v-app-bar-nav-icon>
          </template>
          <v-card>

            <v-toolbar
                color="primary"
                dark
            >
              <v-toolbar-title>TryCar Task</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click.native="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list nav dense>
              <v-list-item-group color="primary">

                <v-list-item v-for="(item, index) in nav"
                             :key="index"
                             :to="item.to"  @click="dialog=!dialog">
                  <v-list-item-content class="text-center">
                    <v-list-item-title>
                      <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                      {{ item.text }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-dialog>

      </v-app-bar>


    </v-layout>

  </div>
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      dialog: false,
      nav: [
        {
          icon: 'mdi-home',
          text: 'Home',
          title: 'Back to Home page',
          active: true,
          to: "/"
        }
      ]
    }
  },
};
</script>
<style scoped>
.v-toolbar {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2),
  0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0) !important;
}


</style>
