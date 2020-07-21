<template>
  <transition name="fade">
    <div v-if="visible" :class="myClass" @click.stop.prevent="onClose">
      <div class="ca-modal-body">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

type State = {
  visible: boolean;
};

export default Vue.extend({
  name: 'CaModal',
  props: {},
  computed: {
    myClass(): any {
      const klass: any = { 'ca-modal': true };

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

    this.$nextTick(() => {
      this.$children.forEach((child) => {
        child.$once('close', this.onClose);
      });
    });
  },

  methods: {
    onClose() {
      this.$emit('close');
    },
  },
  beforeDestroy() {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease 0s;
}
</style>
