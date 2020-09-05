<template>
  <div class="modalview-child">
    <h1>ModalViewSampleChild</h1>

    <CaButton @click="emit" size="S">親へ通知</CaButton>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'ModalViewSampleChild',
  props: {},
  components: {},
  data(): State {
    return {};
  },
  mounted() {},
  methods: {
    emit() {
      this.$emit('fromChild');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.modalview-child {
  background-color: #bbb;
  padding: 20px;
}
h1 {
  margin-bottom: 2em;
}
</style>
