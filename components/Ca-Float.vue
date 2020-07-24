<template>
  <div :class="myClass">
    <slot></slot>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

type State = {};
type PropSize = 'S' | 'L';

export default Vue.extend({
  name: 'CaFloat',
  components: {},
  props: {
    size: {
      default: '',
      type: String as PropType<PropSize>,
    },
    withHeadingSpace: {
      default: false,
      type: Boolean,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    myClass(): any {
      const klass: any = { 'ca-float': true };
      let size = '-size-m';
      if (this.size && this.size === 'S') {
        size = '-size-s';
      } else if (this.size && this.size === 'L') {
        size = '-size-l';
      }
      klass[size] = true;

      if (this.withHeadingSpace) {
        klass['-with-heading-space'] = true;
      }

      return klass;
    },
  },
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-float {
  display: flex;
}
/* heading-space */
.ca-float.-with-heading-space {
  padding-top: 25px;
}

/* size */
.ca-float.-size-s {
  height: var(--form-button-height-small);
}
.ca-float.-size-l {
  height: var(--form-button-height-large);
}
</style>
