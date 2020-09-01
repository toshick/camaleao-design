<template>
  <div :class="myClass" data-e2e="ca-modalview">
    <header>
      <a class="btn-back" @click="onClickClose"><ion-icon name="chevron-down-outline" size="medium" /></a>
      <h1 v-if="title">
        <slot name="titleicon" class="titleicon"></slot>
        {{ title }}
      </h1>
    </header>
    <div class="ca-modal-view-center">
      <slot></slot>
    </div>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import CaButton from './Ca-Button.vue';

export default Vue.extend({
  name: 'CaModalView',
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
      const klass: any = { 'ca-modal-view': true };

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
.ca-modal-view {
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

.ca-modal-view-center {
  overflow: scroll;
}

header {
  display: flex;
  align-items: center;
  background-color: var(--modalview-header-bgcolor);
  padding: var(--modalview-header-padding);
  box-shadow: var(--modalview-header-shadow);
  height: var(--modalview-header-height);
  background-image: var(--modalview-header-bg-img);
  color: var(--modalview-header-color);
  line-height: 1;
}

header h1 {
  display: flex;
  align-items: center;
  font-size: var(--modalview-header-fontsize);
  font-weight: normal;
}

header ion-icon {
  color: inherit;
}

.ca-modal-titleicon {
  margin-right: 0.2em;
}

.btn-back {
  display: block;
  height: min-content;
  margin: 0 0.5em;
}
</style>
