<template>
  <span :class="myClass">
    <i class="ca-spinner-body"> </i>
  </span>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
type PropSize = 'S' | 'M' | 'L';
export default Vue.extend({
  name: 'CaSpinner',
  props: {
    size: {
      default: 'F',
      type: String as PropType<PropSize>,
    },
    type: {
      default: '',
      type: String,
    },
  },
  computed: {
    myClass(): any {
      const klass: any = { 'ca-spinner': true };
      let size = '-size-m';
      if (this.size && this.size === 'S') {
        size = '-size-s';
      } else if (this.size && this.size === 'M') {
        size = '-size-m';
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
.ca-spinner {
  display: inline-block;
  position: relative;
  min-width: 40px;
  height: 100%;
}
.ca-spinner.-size-s .ca-spinner-body {
  transform: translate(-50%, -50%) scale(0.18, 0.18);
}

.ca-spinner-body {
  position: absolute;
  top: 50%;
  left: 50%;
  --size: 1em;
  display: block;
  color: var(--dark);
  font-size: var(--size);
  width: var(--size);
  height: var(--size);
  border-radius: calc(var(--size) / 2);
  animation: load4 0.8s infinite linear;
  transform: translate(-50%, -50%) scale(0.25, 0.25);
}

@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
</style>
