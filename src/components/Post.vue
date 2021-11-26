<template>
  <v-col cols="12" xl="3" lg="3" md="4" sm="6">
    <v-card class="mx-auto" max-width="400">
      <v-img
          class="white--text align-end"
          height="300px"
          :src="'https://picsum.photos/600/300/?image='+post.id"
      >
      </v-img>
      <v-card-title class="title"><p>{{ post.title.toUpperCase() }}</p></v-card-title>
      <v-card-subtitle class="pb-0">
        <span><strong>By :</strong></span> {{ post.user.name }}
      </v-card-subtitle>
      <v-card-subtitle class="pt-0">
        <v-icon small color="green darken-2">mdi-phone</v-icon>
        {{ post.user.phone }}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn color="orange" text @click="viewPost(post.id)">
          View Post
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'Post',
  props: ["post"],
  data: () => ({}),
  methods: {
    viewPost(postId) {
      this.$router.push({name: 'PostView', params: {postId: postId}})
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  p {
    line-height: 1.5em;
    height: 3em;
    overflow: hidden;
  }

  &:hover {
    color: #0e90db;
    cursor: pointer;
  }
}

.v-card {
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}
</style>
