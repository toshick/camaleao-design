<template>
  <header :class="myClass">
    <a class="btn-back" @click.stop.prevent="close"><ion-icon :name="backIcon" size="medium" /></a>
    <h1>
      {{ title }}
    </h1>
    <slot></slot>
  </header>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

type State = {};

export default Vue.extend({
  name: 'CaModalHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
    drilldown: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    myClass(): any {
      const klass: any = { 'ca-modalview-header': true };
      return klass;
    },
    backIcon(): string {
      if (this.drilldown) {
        return 'chevron-back-outline';
      }
      return 'chevron-down-outline';
    },
  },
  data(): State {
    return {};
  },
  mounted() {},

  methods: {
    close() {
      this.$emit('close');
    },
  },
  beforeDestroy() {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-modalview-header {
  display: flex;
  align-items: center;
  background-color: var(--modalview-header-bgcolor);
  padding: var(--modalview-header-padding);
  box-shadow: var(--modalview-header-shadow);
  height: var(--modalview-header-height);
  background-image: var(--modalview-header-bg-img);
  color: var(--modalview-header-color);
  font-size: var(--modalview-header-fontsize);
  line-height: 1;
}

.ca-modalview-header h1 {
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: var(--modalview-header-fontsize);
}

.ca-modalview-header ion-icon {
  color: inherit;
}
.btn-back {
  margin: 0 0.5em 0 0;
}

.ca-modalview-header-icons {
  display: inline-flex;
  align-items: center;
  margin-left: auto;
  margin-right: 0.5em;
}

.ca-modalview-header-icons a {
  display: block;
  height: min-content;
  margin-left: 1em;
  font-size: var(--modalview-header-action-fontsize);
}
</style>
