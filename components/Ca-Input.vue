<template>
  <ValidationProvider :class="myClass" :name="name" :rules="rules" v-slot="{ errors, valid, invalid, validated }" :data-e2e="e2eAttr" tag="div">
    <div v-if="titleStr.length > 0" class="ca-input-heading">
      <p v-html="titleStr"></p>
    </div>
    <span :class="setValidateClass(validated, valid, invalid)">
      <input type="text" :value="myval" @input="(e) => onChangeInput(e)" :placeholder="placeholder" />
    </span>
    <span v-if="textRight" class="ca-input-text -right">{{ textRight }}</span>
    <p v-if="errors.length > 0" class="ca-input-errors">{{ getErrMessage(errors) }}</p>
  </ValidationProvider>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export type ValidationState = {
  passed: boolean;
  failed: boolean;
  errors: any[];
};

type State = {
  myval: string | null;
  errorMsg: string;
};
type PropSize = 'S' | 'L';
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
      default: 'F',
      type: String as PropType<PropSize>,
    },
    width: {
      default: 'F',
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
  },
  data(): State {
    return {
      myval: '',
      errorMsg: '',
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
      } else if (this.width && this.width === 'L') {
        width = '-width-l';
      }
      klass[width] = true;

      if (this.type) {
        klass[`-${this.type}`] = true;
      }

      return klass;
    },
    e2eAttr(): string {
      return `e2e-${this.name}`;
    },
  },
  created() {
    if (!this.name) {
      throw new Error('CaInput: name is required!');
    }
  },
  mounted() {
    this.myval = this.value;
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
    /**
     * getErrMessage
     */
    getErrMessage(errors: string[]) {
      let msg = '';
      if (errors && errors.length > 0) {
        msg = errors.join(',');
      }
      return msg;
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

.ca-input > span > input {
  padding: 0px 12px;
  border: solid 1px #ccc;
  border-radius: 4px;
  /* border-radius: 16px 2px 16px 2px; */
  box-shadow: var(--form-shadow);
  font-size: var(--fontsize-normal);
  color: var(--dark);
  height: calc(var(--form-input-height));
  width: 220px;
}

.ca-input > span > input:focus {
  outline: none;
  border: solid 1px #888;
}

/* size */
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
  width: 90px;
}
.ca-input.-width-l > span > input {
  width: 300px;
}

/* positive */
.ca-input-errors {
  font-size: var(--fontsize-small);
  color: var(--danger);
  margin: 1em 0 0;
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
.ca-input > span.-has-ok::after {
  position: absolute;
  top: 30%;
  right: 24px;
  display: block;
  content: '';
  transform: rotate(45deg) translate(0, -50%);
  height: 10px;
  width: 5px;
  border-bottom: 4px solid var(--ok);
  border-right: 4px solid var(--ok);
}
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
  font-size: var(--fontsize-normal);
  color: var(--dark);
  margin: 0;
  padding-bottom: 6px;
  white-space: nowrap;
}

/* side text */
.ca-input-text.-right {
  padding-left: 4px;
}
</style>
