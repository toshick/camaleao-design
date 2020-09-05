<template>
  <div class="ca-modalview-body">
    <slot></slot>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

type State = {};

export default Vue.extend({
  name: 'Ca-ModalViewBody',
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-modalview-body {
  padding: var(--modalview-body-padding);
  overflow: scroll;
}
</style>
