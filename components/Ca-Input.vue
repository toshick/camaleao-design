<template>
  <ValidationProvider
    :class="myClass"
    :name="name"
    :rules="myrules"
    v-slot="{ errors, valid, invalid, validated, passed }"
    :data-e2e="e2eAttr"
    tag="div"
  >
    <div v-if="titleStr.length > 0" class="ca-input-heading">
      <p v-html="titleStr"></p>
    </div>
    <span :class="setValidateClass(validated, valid, invalid)">
      <div class="ca-input-status">
        <p
          v-if="required && !passed && errors.length == 0"
          class="formmark-required"
        ></p>
        <p v-if="myval.length > 0 && passed" class="formmark-passed"></p>
      </div>
      <input
        :type="myType"
        :value="myval"
        @input="(e) => onChangeInput(e)"
        :placeholder="placeholder"
      />
      <a v-show="myval" class="btn-remove-cross" @click="resetText" />
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
import { getErrMessage } from './helper';

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
    hasRemoveBtn: {
      default: true,
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
      } else if (this.width && this.width === '100') {
        width = '-width-100';
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

      if (this.hasRemoveBtn) {
        klass['-has-remove-btn'] = true;
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
    myType(): string {
      return this.type || 'text';
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
    resetText() {
      this.myval = '';
      this.$emit('input', this.myval);
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
  border: var(--form-border-color);
  border-radius: var(--form-radius);
  box-shadow: var(--form-shadow);
  font-size: var(--form-input-fontsize-normal);
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
  /* font-size: var(--fontsize-small); */
  height: calc(var(--form-input-height-small));
}
.ca-input.-size-s .ca-input-text {
  font-size: var(--fontsize-small);
}
.ca-input.-size-s .ca-input-status {
  top: 33px;
}

.ca-input.-size-l > span > input {
  padding: 16px 120px;
  font-size: var(--form-input-fontsize-large);
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
.ca-input.-width-100 > span {
  display: block;
}
.ca-input.-width-100 > span > input {
  width: 100%;
}

/* btn-remove-cross */
.btn-remove-cross {
  display: none;
}
.ca-input.-has-remove-btn > span > input {
  padding-right: 36px;
}
.ca-input.-has-remove-btn .btn-remove-cross {
  display: block;
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
  height: var(--form-heading-height);
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
  top: 43px;
  right: 4px;
  /* width: 14px; */
  height: 14px;
}
</style>
