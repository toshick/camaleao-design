<template>
  <span :class="myClass">
    <i />
  </span>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
export default Vue.extend({
  name: 'CaIcon',
  props: {
    type: {
      default: '',
      type: String,
    },
    size: {
      default: '',
      type: String,
    },
  },
  computed: {
    myClass(): any {
      const klass: any = { 'ca-icon': true };
      if (this.type) {
        klass[`-${this.type}`] = true;
      }
      let size = '';
      if (this.size && this.size === 'S') {
        size = '-size-s';
      } else if (this.size && this.size === 'L') {
        size = '-size-l';
      }
      klass[size] = true;

      return klass;
    },
  },
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--icon-size-normal);
  width: var(--icon-size-normal);
}

.ca-icon.-size-s {
  height: var(--icon-size-small);
  width: var(--icon-size-small);
}

.ca-icon.-size-s {
  height: var(--icon-size-small);
  width: var(--icon-size-small);
}

.ca-icon.-size-l {
  height: var(--icon-size-large);
  width: var(--icon-size-large);
}

/* check */
.ca-icon.-check > i {
  display: block;
  height: 70%;
  width: 40%;
}

.ca-icon.-check > i {
  --color: #999999;
  display: inline-block;
  transform: rotate(45deg) translate(-20%, -20%);

  border-bottom: 2px solid var(--color);
  border-right: 2px solid var(--color);
  vertical-align: middle;
}
.ca-icon.-check.-size-l > i {
  border-bottom: 3px solid var(--color);
  border-right: 3px solid var(--color);
}
</style>
