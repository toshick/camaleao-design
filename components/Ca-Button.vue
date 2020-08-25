<template>
  <button :class="myClass" @click.stop.prevent="onClick">
    <template v-if="loading">
      <CaSpinner :size="size" class="spin"></CaSpinner>
    </template>
    <span class="ca-button-label">
      <slot></slot>
    </span>
  </button>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
type PropSize = 'S' | 'L';
export default Vue.extend({
  name: 'CaButton',
  props: {
    size: {
      default: '',
      type: String as PropType<PropSize>,
    },
    width: {
      default: '',
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
    text: {
      default: false,
      type: Boolean,
    },
    submit: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    myClass(): any {
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
      if (this.text) {
        klass['-text'] = true;
      }
      if (this.submit) {
        klass['-submit'] = true;
      }
      if (this.disabled) {
        klass['-disabled'] = true;
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
  padding: var(--button-padding);
  border: var(--button-border-color);
  border-radius: var(--button-radius);
  box-shadow: var(--form-shadow);
  font-size: var(--fontsize-medium);
  height: var(--button-height-normal);
  background-color: var(--button-bg-color);
  color: var(--button-label-color);
  letter-spacing: var(--button-letter-spacing);
}
.ca-button:hover {
  filter: var(--button-hover-filter);
  cursor: pointer;
}
.ca-button:active {
  filter: var(--button-active-filter);
}

.ca-button-label {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* size */
.ca-button.-size-s {
  font-size: var(--fontsize-small);
  height: var(--button-height-small);
}
.ca-button.-size-l {
  font-size: var(--fontsize-large);
  height: var(--button-height-large);
}

/* width */
.ca-button.-width-s {
  min-width: var(--button-width-small);
  padding-top: 0;
  padding-bottom: 0;
}
.ca-button.-width-l {
  min-width: var(--button-width-large);
  padding-top: 0;
  padding-bottom: 0;
}

/* positive */
.ca-button.-positive {
  background-color: var(--positive);
  color: #796a1a;
  text-shadow: var(--button-text-shadow);
}

/* danger */
.ca-button.-danger {
  background-color: var(--danger);
  color: #640f0f;
  text-shadow: var(--button-text-shadow);
}

/* loading */
.ca-button.-loading {
  pointer-events: none;
  filter: brightness(90%);
}
.ca-button.-loading > .ca-button-label {
  visibility: hidden;
}

/* text */
.ca-button.-text {
  border: none;
  background-color: transparent;
  box-shadow: none;
}
.ca-button.-text:hover .ca-button-label {
  text-decoration: underline;
}

/* text */
.ca-button.-submit {
  border: var(--form-border-color);
  box-shadow: var(--form-shadow);
  color: var(--dark);
  background-color: #eee;
}

/* spin */
.ca-button > .spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* -disabled */
.ca-button.-disabled {
  pointer-events: none;
}
.ca-button.-disabled .ca-button-label {
  opacity: 0.3;
}

.ca-button ion-icon {
  color: inherit;
}
</style>
