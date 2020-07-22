<template>
  <button :class="buttonClass" @click.stop="onClick">
    <template v-if="loading">
      <CaSpinner :size="size" class="spin"></CaSpinner>
    </template>
    <span class="label">
      <slot></slot>
    </span>
  </button>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
type PropSize = 'S' | 'M' | 'L';
export default Vue.extend({
  name: 'CaButton',
  props: {
    size: {
      default: 'F',
      type: String as PropType<PropSize>,
    },
    width: {
      default: 'F',
      type: String as PropType<PropSize>,
    },

    color: {
      default: () => [],
      type: Array as PropType<string[]>,
    },
    type: {
      default: '',
      type: String,
    },
    loading: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    buttonClass(): any {
      const klass: any = { 'ca-button': true };
      let size = '-size-m';
      if (this.size && this.size === 'S') {
        size = '-size-s';
      } else if (this.size && this.size === 'L') {
        size = '-size-l';
      }
      klass[size] = true;

      let width = '';
      if (this.width && this.width === 'S') {
        width = '-width-s';
      } else if (this.width && this.width === 'L') {
        width = '-width-l';
      }
      klass[width] = true;

      if (this.type) {
        klass[`-${this.type}`] = true;
      }
      if (this.loading) {
        klass['-loading'] = true;
      }

      return klass;
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-button {
  position: relative;
  padding: 0 14px;
  border: none;
  border-radius: 16px 4px 16px 4px;
  /* border-radius: 16px 16px 4px 4px; */
  box-shadow: var(--form-shadow);
  font-size: var(--fontsize-normal);
  height: var(--form-button-height);
  background-color: #fff;
  color: #666;
  letter-spacing: 0.05em;
}
.ca-button:hover {
  filter: brightness(96%);
  cursor: pointer;
}
.ca-button:active {
  filter: brightness(94%);
}

/* size */
.ca-button.-size-s {
  font-size: var(--fontsize-small);
  height: var(--form-button-height-small);
}
.ca-button.-size-l {
  font-size: var(--fontsize-large);
  height: var(--form-button-height-large);
}
.ca-button.-long {
  display: inline-block;
  min-width: 320px;
}

/* width */
.ca-button.-width-s {
  min-width: 200px;
}
.ca-button.-width-l {
  min-width: 300px;
}

/* positive */
.ca-button.-positive {
  background-color: var(--positive);
  color: #796a1a;
  text-shadow: 0 0 1px rgba(30, 30, 30, 0.2);
  box-shadow: 0 0 3px 0px rgba(51, 51, 51, 0.1);
}

/* danger */
.ca-button.-danger {
  background-color: var(--danger);
  color: #640f0f;
  text-shadow: 0 0 1px rgba(30, 30, 30, 0.2);
  box-shadow: 0 0 3px 0px rgba(51, 51, 51, 0.1);
}

/* loading */
.ca-button.-loading {
  pointer-events: none;
  filter: brightness(90%);
}
.ca-button.-loading > .label {
  visibility: hidden;
}

/* spin */
.ca-button > .spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
