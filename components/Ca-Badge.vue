<template>
  <p :class="myClass">
    <span>{{ num }}</span>
  </p>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
export default Vue.extend({
  name: 'CaBadge',
  props: {
    num: {
      default: 0,
      type: Number,
    },
  },
  computed: {
    myClass(): any {
      const klass: any = { 'ca-badge': true };

      return klass;
    },
  },
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-badge {
  position: relative;
  font-size: 10px;
  width: var(--badge-size);
  height: var(--badge-size);
  border-radius: calc(var(--badge-size) / 2);
  background-color: var(--badge-bg-color);
  box-shadow: var(--badge-shadow);
  text-align: center;
  color: var(--badge-text-color);
  font-weight: bold;
  line-height: 1;
  pointer-events: none;
}
.ca-badge span {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
