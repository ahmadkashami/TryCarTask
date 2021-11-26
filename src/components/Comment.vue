<template>
  <div class="d-flex mb-4 comment">
    <div class="flex-shrink-0">
      <v-avatar size="40">
        <img
            alt="user"
            :src='"https://picsum.photos/200/300?random="+comment.id'
        >
      </v-avatar>
    </div>
    <div class="ml-4">
      <div class="font-weight-bold ">{{ comment.name.toUpperCase() }}</div>
      <div class="co-body mb-4">
        {{ comment.body.charAt(0).toUpperCase() + comment.body.substring(1) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ['comment']
}
</script>

<style scoped>
.comment {
  border-bottom: 1px #0000000a solid;
}
.co-body {
  font-size: 14px;
}
</style>