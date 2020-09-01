<template>
  <transition :name="transition">
    <div v-if="visible" :class="myClass" data-e2e="ca-modal">
      <slot></slot>
    </div>
  </transition>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { windowScrollable } from './helper';

type State = {
  visible: boolean;
};

export default Vue.extend({
  name: 'CaModal',
  props: {
    easyClose: {
      type: Boolean,
      default: true,
    },
    fixed: {
      type: Boolean,
      default: true,
    },
    transition: {
      type: String,
      default: 'fade',
    },
  },
  computed: {
    myClass(): any {
      const klass: any = { 'ca-modal': true };
      if (this.fixed) {
        klass['-fixed'] = true;
      }
      return klass;
    },
  },
  data(): State {
    return {
      visible: false,
    };
  },
  mounted() {
    this.visible = true;
    windowScrollable(false);

    this.$nextTick(() => {
      this.$children.forEach((child: any) => {
        child.$once('close', this.onClose);
        if (this.easyClose && child.setWindowClick) {
          child.setWindowClick(true);
        }
      });
    });

    if (this.easyClose) {
      this.setCloseKeyListener(true);
    }
  },

  methods: {
    close() {
      this.onClose();
    },
    onClose() {
      this.$emit('close');
    },
    setCloseKeyListener(flg: boolean) {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', this.keydown);
        if (flg) {
          window.addEventListener('keydown', this.keydown);
        }
      }
    },
    keydown(e: KeyboardEvent) {
      if (!e.isComposing && e.keyCode === 27) {
        this.onClose();
      }
    },
  },
  beforeDestroy() {
    this.setCloseKeyListener(false);
    this.$children.forEach((child: any) => {
      child.$once('close', null);
    });
    windowScrollable(true);
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-modal {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background-color: var(--modal-bg);
}
.ca-modal.-fixed {
  position: fixed;
}
</style>
