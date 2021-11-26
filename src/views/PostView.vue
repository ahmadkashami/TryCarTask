<template>
  <v-container class="mt-5 mx-auto" v-if="currentPost">
    <v-row class="justify-center align-center"  >
      <v-col>
        <article>
          <header class="mb-4">
            <h1 class="font-weight-bold mb-1 text-sx-h1">{{ currentPost.title.toUpperCase() }}</h1>
            <div class="grey--text font-italic mb-2">{{ currentPost.user.name }} <span class="mx-2">-</span>
              <v-icon
                  small
                  color="green darken-2"
              >
                mdi-phone
              </v-icon>
              {{ currentPost.user.phone.split(' ')[0] }}
            </div>
          </header>
          <figure class="mb-4">
            <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                src="https://picsum.photos/id/11/500/300"
                height="30vh"
            ></v-img>
          </figure>
          <section class="mb-5 body-post ">
            <p class="  mb-4">{{ currentPost.body.charAt(0).toUpperCase() + currentPost.body.substring(1) }}</p>
          </section>
        </article>
        <!-- Comments section-->
        <section class="mb-2">
          <v-row>
            <v-col cols="12" lg="8" xl="8">
              <v-card class="custom-card">
                <v-card-title>Last Comments</v-card-title>
                <div class="card-body" v-if="currentComments">
                  <Comment :comment="comment" v-for="(comment, index) in currentComments" :key="index"/>
                  <div>
                    <p class="blue--text  align-center see-more" @click="seeMore"
                       v-if="!((currentComments.length)<this.limit)">read more...</p>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Comment from "../components/Comment";

export default {
  name: "PostView",
  components: {Comment},
  data() {
    return {
      postId: null,
      limit: 3,
    }
  },
  methods: {
    async seeMore() {
      this.limit = this.limit + 3;
      let params = {
        postId: this.postId,
        limit: this.limit
      };
      await this.$store.dispatch("getComments", params);
    }
  },

  async mounted() {
    this.postId = this.$route.params.postId;
    await this.$store.dispatch("getPost", this.postId);
    let params = {
      postId: this.postId,
      limit: this.limit
    };
    await this.$store.dispatch("getComments", params);
  },
  computed: {
    currentPost() {
      return this.$store.state.currentPost;
    },
    currentComments() {
      return this.$store.state.comments;
    },
  }

}
</script>

<style scoped lang="scss">

.custom-card {
  background-color: rgb(248 249 250 / 53%) !important;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%) !important;;
}

.card-body {
  flex: 1 1 auto;
  padding: 1rem 1rem;
}

.body-post {
  font-size: 1rem !important;
  color: rgb(33, 37, 41);
  font-weight: 400;
  line-height: 30px;
  text-align: start;
  min-height: 20vh;
}

.see-more {
  text-align: center;

  &:hover {
    color: #0e90db;
    cursor: pointer;
  }
}
</style>