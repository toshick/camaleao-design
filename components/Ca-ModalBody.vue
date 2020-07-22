<template>
  <div :class="myClass">
    <header>
      <CaButton class="btn-close-header" size="S" @click="onClickClose">とじる</CaButton>
    </header>
    <div class="ca-modal-body-center">
      <slot></slot>
    </div>

    <footer>
      <CaButton size="S" @click="onClickClose">とじる</CaButton>
    </footer>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import CaButton from './Ca-Button.vue';

export default Vue.extend({
  name: 'CaModalBody',
  components: {
    CaButton,
  },
  props: {},
  computed: {
    myClass(): any {
      const klass: any = { 'ca-modal-body': true };

      return klass;
    },
  },

  methods: {
    onClickClose() {
      this.$emit('close');
    },
    setWindowClick(flg: boolean) {
      window.removeEventListener('click', this.windowClick);
      if (flg) {
        window.addEventListener('click', this.windowClick);
      }
    },
    windowClick(e: MouseEvent) {
      if (!this.$el.contains(e.target as Element)) {
        this.onClickClose();
      }
    },
  },
  beforeDestroy() {
    this.setWindowClick(false);
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-modal-body {
  display: grid;
  grid-template-rows: min-content auto min-content;

  width: 600px;
  height: 600px;
  background-color: #fff;
  border-radius: 32px 6px 32px 6px;
  box-shadow: var(--form-shadow);
  overflow: hidden;
}
.ca-modal-body-center {
  overflow: scroll;
}

header {
  display: flex;
  align-items: center;

  background-color: #ddd;
  padding: 6px 10px 6px 30px;
  border-radius: 0px 6px 22px 0px;
  box-shadow: 0 0 1px 2px rgba(21, 21, 21, 0.2);
}
.btn-close-header {
  margin-left: auto;
}
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  padding: 10px 30px 10px 10px;
}
</style>
