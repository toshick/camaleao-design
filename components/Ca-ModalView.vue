<template>
  <div :class="myClass" data-e2e="ca-modalview">
    <div class="ca-modalview-center">
      <slot></slot>
    </div>
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
  display: grid;
  grid-template-rows: min-content auto min-content;

  box-shadow: var(--form-shadow);
  overflow: hidden;

  width: 100%;
  height: 100%;
  background-color: var(--modalview-bg-color);
  border-radius: var(--modalview-radius);
  border: var(--modalview-border);
}

.ca-modalview-center {
  overflow: scroll;
}
</style>
