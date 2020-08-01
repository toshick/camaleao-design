<template>
  <button :class="myClass" @click.stop.prevent="onClick">
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
type PropSize = 'S' | 'L';
export default Vue.extend({
  name: 'CaButton',
  props: {
    size: {
      default: 'F',
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
  padding: 0 24px;
  border: solid 1px #ccc;
  border-radius: 16px 4px 16px 4px;
  /* border-radius: 16px 16px 4px 4px; */
  box-shadow: var(--form-shadow);
  font-size: var(--fontsize-medium);
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
  min-width: 140px;
  padding: 0 14px;
}
.ca-button.-width-l {
  min-width: 300px;
  padding: 0 14px;
}

/* positive */
.ca-button.-positive {
  background-color: var(--positive);
  color: #796a1a;
  text-shadow: 0 0 1px rgba(30, 30, 30, 0.2);
}

/* danger */
.ca-button.-danger {
  background-color: var(--danger);
  color: #640f0f;
  text-shadow: 0 0 1px rgba(30, 30, 30, 0.2);
}

/* loading */
.ca-button.-loading {
  pointer-events: none;
  filter: brightness(90%);
}
.ca-button.-loading > .label {
  visibility: hidden;
}

/* text */
.ca-button.-text {
  border: none;
  background-color: transparent;
  box-shadow: none;
}
.ca-button.-text:hover .label {
  text-decoration: underline;
}

/* text */
.ca-button.-submit {
  border: solid 1px #ccc;
  border-radius: 4px;
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
.ca-button.-disabled .label {
  opacity: 0.3;
}
</style>
