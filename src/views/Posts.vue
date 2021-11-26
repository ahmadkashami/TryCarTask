<template>
  <v-container>
   <div>
     <p class="py-4  title font-weight-bold">New Our Posts</p>
   </div>
    <v-row>
      <Post :post="post" v-for="(post, index) in posts" :key="index"/>
    </v-row>
    <v-pagination
        v-if="posts.length>0"
        v-model="page"
        class="my-12"
        :length="pages"
        @input="nextPage"
    ></v-pagination>
  </v-container>
</template>

<script>
import Post from '../components/Post'

export default {
  name: 'Home',

  components: {
    Post,
  },
  data() {
    return {
      url: "https://jsonplaceholder.typicode.com/posts?_limit=16&_page=",
      page: 1,

    }
  },
  methods: {
    nextPage() {
      let url = this.url + this.page;
      localStorage.setItem('currentPage', this.page)
      this.$store.dispatch("getPosts", url);
    }
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    pages() {
      return Number(this.$store.state.pages)
    },

  },
  created() {
    this.page = Number(localStorage.getItem('currentPage')) ?? Number(this.$store.getters.currentPage)
    this.$store.dispatch("getPosts", this.url + this.page);

  },
}
</script>
<style scoped>
.title{
  text-align: center;
  font-size: 2rem !important;
}
</style>