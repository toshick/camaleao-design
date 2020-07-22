<template>
  <div :class="myClass">
    <button @click.stop="onClick">
      <template v-if="loading">
        <CaSpinner :size="size" class="spin"></CaSpinner>
      </template>
      <span class="label">
        <slot></slot>
      </span>
    </button>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

type State = {};
type PropSize = 'S' | 'L';
export default Vue.extend({
  name: 'CaInputButton',
  components: {},
  props: {
    withHeadingSpace: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '-',
    },
    value: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
    size: {
      default: 'F',
      type: String as PropType<PropSize>,
    },
    // type: {
    //   default: '',
    //   type: String,
    // },
    placeholder: {
      default: '',
      type: String,
    },
    loading: {
      default: false,
      type: Boolean,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    titleStr(): string {
      let str = '';
      if (this.title !== '-') {
        if (this.title === '') {
          str = '&emsp;';
        } else if (this.title) {
          str = this.title;
        }
      }
      return str;
    },
    myClass(): any {
      const klass: any = { 'ca-input-button': true };
      let size = '';
      if (this.size && this.size === 'S') {
        size = '-size-s';
      }
      klass[size] = true;
      // if (this.type) {
      //   klass[`-${this.type}`] = true;
      // }
      if (this.withHeadingSpace) {
        klass['-with-heading-space'] = true;
      }
      if (this.loading) {
        klass['-loading'] = true;
      }

      return klass;
    },
  },
  mounted() {},
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
.ca-input-button > button {
  position: relative;

  padding: 0px 22px;
  border: solid 1px #ccc;
  border-radius: 4px;
  box-shadow: var(--form-shadow);
  font-size: var(--fontsize-small);
  color: var(--dark);
  height: calc(var(--form-input-height));
  cursor: pointer;
  letter-spacing: 0.1em;
  background-color: #eee;
}
.ca-input-button > button:hover {
  background-color: #f4f4f4;
}
.ca-input-button > button:active {
  filter: brightness(96%);
}
.ca-input-button > button > .label {
  white-space: nowrap;
}

/* loading */
.ca-input-button.-loading {
  pointer-events: none;
  filter: brightness(90%);
}
.ca-input-button.-loading > button > .label {
  visibility: hidden;
}

/* spin */
.ca-input-button > button > .spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* heading-space */
.ca-input-button.-with-heading-space {
  padding-top: 25px;
}

/* size */
.ca-input-button.-size-s > button {
  height: calc(var(--form-input-height-small));
}
</style>
