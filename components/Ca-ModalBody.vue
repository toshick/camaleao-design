<template>
  <div :class="myClass" data-e2e="ca-modalbody">
    <header>
      <h1 v-if="title">
        <slot name="titleicon" class="titleicon"></slot>
        {{ title }}
      </h1>
      <!-- <a class="icon icon-cross btn-close-header" @click="onClickClose"></a> -->
    </header>
    <div class="ca-modal-body-center">
      <slot></slot>
    </div>
    <!-- <footer>
      <CaButton width="S" @click="onClickClose" type="positive" :disabled="true">OK</CaButton>
      <CaButton width="S" @click="onClickClose">キャンセル</CaButton>
    </footer> -->
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
    fit: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    myClass(): any {
      const klass: any = { 'ca-modal-body': true };
      if (this.fit) {
        klass['-fit-content'] = true;
      }
      return klass;
    },
  },

  methods: {
    onClickClose() {
      this.$emit('close');
    },
    setWindowClick(flg: boolean) {
      if (typeof window !== 'undefined') {
        window.removeEventListener('click', this.windowClick);
        if (flg) {
          window.addEventListener('click', this.windowClick);
        }
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

  box-shadow: var(--form-shadow);
  overflow: hidden;

  width: var(--modalbody-width);
  height: var(--modalbody-height);

  background-image: var(--modalbody-bg-img);
  background-color: var(--modalbody-bg-color);
  border-radius: var(--modalbody-radius);
  border: var(--modalbody-border);
}
.ca-modal-body.-fit-content {
  max-width: var(--modalbody-width);
  max-height: var(--modalbody-height);
  width: min-content;
  height: min-content;
}
.ca-modal-body.-fit-content .ca-modal-body-center {
  overflow: visible;
}

.ca-modal-body-center {
  overflow: scroll;
}

header {
  display: flex;
  align-items: center;

  background-color: var(--modalbody-header-bgcolor);
  padding: var(--modalbody-header-padding);
  box-shadow: var(--modalbody-header-shadow);
  height: var(--modalbody-header-height);
  background-image: var(--modalbody-header-bg-img);
}
header h1 {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: normal;
  color: var(--modalbody-header-color);
  line-height: 1;
}
header h1 ion-icon {
  color: inherit;
}
.titleicon {
  border: solid 1px #ff0000;
}

.btn-close-header {
  display: block;
  margin-left: auto;
}
footer {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--modalbody-footer-padding);
  background-color: var(--modalbody-footer-bgcolor);
  box-shadow: var(--modalbody-footer-shadow);
}
footer button {
  margin: 0 10px;
}
</style>
