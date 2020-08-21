<template>
  <header class="app-header">
    <slot></slot>
  </header>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'AppHeader',
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
/* ------------------ 
 app header
 ------------------ */
.app-header {
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(var(--chat-base-color) 60%, var(--chat-base-color2) 0%);
  padding: 0px 10px;
  height: 40px;
}

.app-header .chat-usericon {
  margin-right: 0.5em;
}

.app-header p {
  color: #fff;
  font-size: 12px;
}
.app-header h1 {
  color: #fff;
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  width: 100%;
  letter-spacing: 0.2em;
}
</style>
