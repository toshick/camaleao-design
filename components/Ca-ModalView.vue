<template>
  <div :class="myClass" data-e2e="ca-modalview">
    <slot></slot>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

type State = {};

export default Vue.extend({
  name: 'CaModalView',
  components: {},
  data(): State {
    return {};
  },
  props: {},
  computed: {
    myClass(): any {
      const klass: any = { 'ca-modalview': true };
      return klass;
    },
  },
  mounted() {
    this.setupCloseEvent(true);
  },
  methods: {
    onClickClose() {
      console.log('CaModalViewからのcloseイベント');
      this.$emit('close');
    },
    setupCloseEvent(flg: boolean) {
      this.$children.forEach((child: any) => {
        if (child.onClickIcon) {
          if (flg) {
            child.$on('close', this.onClickClose);
          } else {
            child.$off('close', this.onClickClose);
          }
        }
      });
    },
  },
  beforeDestroy() {
    this.setupCloseEvent(false);
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-modalview {
  position: relative;

  width: 100%;
  height: 100%;

  background-color: var(--modalview-bg-color);
  border-radius: var(--modalview-radius);
  border: var(--modalview-border);
}
</style>
