<template>
  <!-- モーダル user -->
  <article class="cont-sample">ModalContSampleなんだぜ</article>
</template>

<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'ModalContSample',
  props: {
    msg: String,
  },
  components: {},
  data(): State {
    return {};
  },
  mounted() {},
  methods: {},
});
</script>


<style scoped lang="scss">
.cont-sample {
  padding: 100px;
}
</style>
