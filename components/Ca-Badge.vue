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
  --icon-size: 16px;
  position: relative;
  font-size: 10px;
  width: var(--icon-size);
  height: var(--icon-size);
  border-radius: calc(var(--icon-size) / 2);
  background-color: var(--chat-color-red);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.9);
  text-align: center;
  color: #fff;
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
