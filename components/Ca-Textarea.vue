<template>
  <ValidationProvider :class="myClass" :name="name" :rules="myrules" v-slot="{ errors, valid, invalid, validated, passed }" :data-e2e="e2eAttr" tag="div">
    <div v-if="titleStr.length > 0" class="ca-textarea-heading">
      <p v-html="titleStr"></p>
    </div>
    <span :class="setValidateClass(validated, valid, invalid)">
      <div class="ca-textarea-status">
        <p v-if="required && !passed && errors.length == 0" class="formmark-required"></p>
        <p v-if="myval.length > 0 && passed" class="formmark-passed"></p>
      </div>
      <textarea :value="myval" @input="(e) => onChangeInput(e)" :placeholder="placeholder" />
    </span>
    <div v-if="errors.length > 0" class="ca-textarea-errors">
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
      const klass: any = { 'ca-textarea': true };
      let size = '-size-m';
      if (this.size && this.size === 'S') {
        size = '-size-s';
      } else if (this.size && this.size === 'M') {
        size = '-size-m';
      } else if (this.size && this.size === 'L') {
        size = '-size-l';
      }
      klass[size] = true;

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
      if (e.target instanceof HTMLTextAreaElement) {
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
.ca-textarea {
  position: relative;
}

.ca-textarea > span {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.ca-textarea > span > textarea {
  display: block;
  padding: 10px 12px;
  border: var(--form-border-color);
  border-radius: var(--form-radius);
  box-shadow: var(--form-shadow);
  font-size: var(--form-input-fontsize-normal);
  color: var(--dark);

  width: var(--form-textarea-width-normal);
}

.ca-textarea > span > textarea:focus {
  outline: none;
  border: solid 1px #888;
}

/* size */
.ca-textarea.-size-s > span > textarea {
  padding: 10px;
  /* font-size: var(--fontsize-small); */
}
.ca-textarea.-size-s .ca-textarea-text {
  font-size: var(--fontsize-small);
}

.ca-textarea.-size-l > span > textarea {
  font-size: var(--form-input-fontsize-large);
}

/* -disabled */
.ca-textarea.-disabled textarea {
  pointer-events: none;
  background-color: #eee;
}

/* errors */
.ca-textarea-errors {
  position: relative;
  height: 20px;
}
.ca-textarea-errors p {
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
.ca-textarea > span.-has-error > textarea,
.ca-textarea > span.-has-error > textarea:focus {
  border: solid 1px var(--danger);
}

/* ok */
.ca-textarea > span.-has-ok {
  position: relative;
}

.ca-textarea > span.-has-ok > textarea,
.ca-textarea > span.-has-ok > textarea:focus {
  border: solid 1px var(--ok);
}

.ca-textarea-heading {
  height: var(--form-heading-height);
}
.ca-textarea-heading > p {
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
.ca-textarea-text.-right {
  padding-left: 4px;
}

/* height */
.ca-textarea.-height-m > span {
  height: calc(var(--form-textarea-height));
}

.ca-textarea-status {
  position: absolute;
  top: 100%;
  right: 4px;
  height: 14px;
  margin-top: 4px;
}
</style>
