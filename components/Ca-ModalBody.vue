<template>
  <div :class="myClass">
    <header>
      <h1 v-if="title">{{ title }}</h1>
      <a class="icon icon-cross btn-close-header" @click="onClickClose"></a>
    </header>
    <div class="ca-modal-body-center">
      <slot></slot>
    </div>
    <footer>
      <CaButton width="S" @click="onClickClose" type="positive">OK</CaButton>
      <CaButton width="S" @click="onClickClose">キャンセル</CaButton>
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
  props: {
    title: {
      default: '',
      type: String,
    },
  },
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
  position: relative;
  display: grid;
  grid-template-rows: min-content auto min-content;

  width: 800px;
  height: 90vh;
  background-image: url('../img/subtle-dark-vertical.png');
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
  background-color: #fff;
  padding: 6px 14px 6px 20px;
  box-shadow: 0 0 2px 0px rgba(21, 21, 21, 0.4);
  height: 40px;
}
header h1 {
  display: block;
  font-size: 18px;
  font-weight: normal;
  color: #999;
  margin: 6px 0 0;
}
.btn-close-header {
  display: block;
  margin-left: auto;
}
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 30px 20px 10px;
  background-color: #fff;
  box-shadow: 0 0 2px 0px rgba(21, 21, 21, 0.4);
}
footer button {
  margin: 0 10px;
}
</style>
