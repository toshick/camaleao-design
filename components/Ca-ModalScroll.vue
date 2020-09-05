<template>
  <div class="ca-modalview-scroll">
    <slot></slot>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

type State = {};

export default Vue.extend({
  name: 'CaModalScroll',
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-modalview-scroll {
  display: grid;
  grid-template-rows: min-content auto min-content;
  width: 100%;
  height: 100%;
}
</style>
