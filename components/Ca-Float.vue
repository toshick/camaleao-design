<template>
  <div :class="myClass">
    <div>
      <slot></slot>
    </div>
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
    vCenter: {
      default: true,
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

      if (this.vCenter) {
        klass['-vcenter'] = true;
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
}

.ca-float > div {
  display: flex;
  height: var(--form-input-height);
}

/* heading-space */
.ca-float.-with-heading-space {
  padding-top: 25px;
}

.ca-float.-vcenter > div {
  align-items: center;
}

/* size */
.ca-float.-size-s > div {
  height: var(--form-input-height-small);
}
.ca-float.-size-l > div {
  height: var(--form-button-height-large);
}
</style>
