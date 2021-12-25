<template>
  <component :is="tag" :to="to" class="link"><slot></slot></component>
</template>

<script>
export default {
  name: 'UiLink',
  props: {
    tag: {
      type : String,
      default: 'router-link'
    },
    to: {
      type: [String, Object]
    },
  },
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
