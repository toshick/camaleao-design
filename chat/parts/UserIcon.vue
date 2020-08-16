<template>
  <div class="usericon">
    <img src="https://avatars3.githubusercontent.com/u/6635142?s=460&v=4" alt="" />
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'UserIcon',
  components: {},
  props: {},
  data(): State {
    return {};
  },
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.usericon img {
  --size: 50px;
  display: block;
  width: var(--size);
  height: var(--size);
  border-radius: calc(var(--size) * 0.5);
}
</style>
