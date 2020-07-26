<template>
  <ValidationProvider :class="myClass" :name="name" :rules="myrules" v-slot="{ errors, valid, invalid, validated, passed }" :data-e2e="e2eAttr" tag="div">
    <div v-if="titleStr.length > 0" class="ca-input-heading">
      <p v-html="titleStr"></p>
    </div>
    <span :class="setValidateClass(validated, valid, invalid)">
      <div class="ca-input-status">
        <p v-if="required && !passed" class="formmark-required">＊</p>
        <p v-if="myval.length > 0 && passed" class="formmark-passed"></p>
      </div>
      <input type="text" :value="myval" @input="(e) => onChangeInput(e)" :placeholder="placeholder" />
    </span>
    <span v-if="textRight" class="ca-input-text -right">{{ textRight }}</span>
    <div v-if="errors.length > 0" class="ca-input-errors">
      <p>{{ getErrMessage(errors) }}</p>
    </div>
  </ValidationProvider>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { getErrMessage } from './helper.ts';

export type ValidationState = {
  passed: boolean;
  failed: boolean;
  errors: any[];
};

type State = {
  myval: string;
  errorMsg: string;
  getErrMessage: (errors: string[]) => string;
};
type PropSize = 'S' | 'M' | 'L';
export default Vue.extend({
  name: 'CaInput',
  components: {
    ValidationProvider,
  },
  props: {
    name: {
      type: String,
      default: '',
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
      default: '',
      type: String as PropType<PropSize>,
    },
    width: {
      default: '',
      type: String as PropType<PropSize>,
    },
    type: {
      default: '',
      type: String,
    },
    placeholder: {
      default: '',
      type: String,
    },
    textRight: {
      default: '',
      type: String,
    },
    height: {
      default: '',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  watch: {
    disabled(newval, oldval) {
      if (newval === true) {
        this.myval = '';
      }
    },
  },
  data(): State {
    return {
      myval: '',
      errorMsg: '',
      getErrMessage,
    };
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
      const klass: any = { 'ca-input': true };
      let size = '-size-m';
      if (this.size && this.size === 'S') {
        size = '-size-s';
      } else if (this.size && this.size === 'M') {
        size = '-size-m';
      } else if (this.size && this.size === 'L') {
        size = '-size-l';
      }
      klass[size] = true;

      let width = '';
      if (this.width && this.width === 'S') {
        width = '-width-s';
      } else if (this.width && this.width === 'M') {
        width = '-width-m';
      } else if (this.width && this.width === 'L') {
        width = '-width-l';
      }
      klass[width] = true;

      if (this.height && this.height === 'M') {
        klass['-height-m'] = true;
      }
      if (this.disabled) {
        klass['-disabled'] = true;
      }

      if (this.type) {
        klass[`-${this.type}`] = true;
      }

      return klass;
    },
    e2eAttr(): string {
      return `e2e-${this.name}`;
    },
    required(): boolean {
      if (this.disabled) return false;
      return this.rules.includes('required');
    },
    myrules(): string {
      if (this.disabled) return '';
      return this.rules;
    },
  },
  created() {
    if (!this.name) {
      throw new Error('CaInput: name is required!');
    }
  },
  mounted() {
    this.myval = this.value;
    if (this.value) {
      this.$emit('change', this.myval);
    }
  },
  methods: {
    /**
     * onChangeInput
     */
    onChangeInput(e: Event) {
      if (e.target instanceof HTMLInputElement) {
        this.myval = String(e.target.value);
        this.$emit('input', this.myval);
      }
    },
    /**
     * getFieldType
     */
    getFieldType(state: ValidationState) {
      const { passed, failed } = state;
      if (passed) return 'is-success';
      if (failed) return 'is-danger';
      return '';
    },
    setValidateClass(validated: boolean, valid: boolean, invalid: boolean) {
      const klass: any = {};
      if (validated && invalid) {
        klass['-has-error'] = true;
      } else if (validated && valid && this.myval.length > 0) {
        klass['-has-ok'] = true;
      }
      return klass;
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-input {
  position: relative;
}

.ca-input > span {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: calc(var(--form-input-height));
}

.ca-input > span > input {
  padding: 0px 12px;
  border: solid 1px #ccc;
  border-radius: 4px;
  /* border-radius: 16px 2px 16px 2px; */
  box-shadow: var(--form-shadow);
  font-size: var(--fontsize-normal);
  color: var(--dark);

  width: var(--form-input-width-normal);
  height: calc(var(--form-input-height));
}

.ca-input > span > input:focus {
  outline: none;
  border: solid 1px #888;
}

/* size */
.ca-input.-size-s > span {
  height: calc(var(--form-input-height-small));
}
.ca-input.-size-s > span > input {
  padding: 0 10px;
  font-size: var(--fontsize-small);
  height: calc(var(--form-input-height-small));
}
.ca-input.-size-s .ca-input-text {
  font-size: var(--fontsize-small);
}

.ca-input.-size-l > span > input {
  padding: 16px 120px;
  font-size: 18px;
}

/* width */
.ca-input.-width-s > span > input {
  width: var(--form-input-width-small);
}
.ca-input.-width-m > span > input {
  width: var(--form-input-width-medium);
}
.ca-input.-width-l > span > input {
  width: var(--form-input-width-large);
}

/* -disabled */
.ca-input.-disabled input {
  pointer-events: none;
  background-color: #eee;
}

/* errors */
.ca-input-errors {
  position: relative;
  height: 20px;
}
.ca-input-errors p {
  position: absolute;
  top: 0;
  left: 0;
  font-size: var(--fontsize-small);
  color: var(--danger);
  white-space: nowrap;
  padding: 0;
  margin: 6px 0 0;
}

/* ng */
.ca-input > span.-has-error > input,
.ca-input > span.-has-error > input:focus {
  border: solid 1px var(--danger);
}

/* ok */
.ca-input > span.-has-ok {
  position: relative;
}
/* .ca-input > span.-has-ok::after {
  position: absolute;
  top: 35%;
  right: 20px;
  display: block;
  content: '';
  transform: rotate(45deg) translate(0, -50%);
  height: 10px;
  width: 5px;
  border-bottom: 4px solid var(--ok);
  border-right: 4px solid var(--ok);
} */
.ca-input > span.-has-ok > input,
.ca-input > span.-has-ok > input:focus {
  border: solid 1px var(--ok);
}

.ca-input-heading {
  height: 25px;
}
.ca-input-heading > p {
  position: absolute;
  top: 0;
  left: 0;
  font-size: var(--fontsize-small);
  color: var(--dark);
  margin: 0;
  padding-bottom: 6px;
  white-space: nowrap;
}

/* side text */
.ca-input-text.-right {
  padding-left: 4px;
}

/* height */
.ca-input.-height-m > span {
  height: calc(var(--form-input-height));
}

.ca-input-status {
  position: absolute;
  top: -14px;
  right: 4px;
  width: 14px;
  height: 14px;
}

.formmark-passed {
  position: absolute;
  top: -18px;
  left: 5px;
}
</style>
