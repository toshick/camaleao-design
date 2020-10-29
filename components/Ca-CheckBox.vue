<template>
  <ValidationProvider :class="myClass" :name="name" :rules="rules" v-slot="{ passed, errors }" :data-e2e="e2eAttr" tag="label">
    <div :class="labelClass(errors)">
      <i class="ca-checkbox-box" />
      <input :value="myval" @input="(e) => onChangeInput(e)" type="checkbox" />
      <div>
        <!-- <span v-if="errors.length > 0" class="ca-input-errors">（{{ getErrMessage(errors) }}）</span> -->
        {{ label }}
      </div>
      <p v-if="required && !passed" class="formmark-required"></p>
    </div>
  </ValidationProvider>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { ValidationProvider } from 'vee-validate';

type State = {
  myval: boolean;
  errorMsg: string;
};
type PropSize = 'S' | 'L';

export default Vue.extend({
  name: 'CaCheckbox',
  components: {
    ValidationProvider,
  },
  props: {
    name: {
      default: '',
      type: String,
    },
    value: {
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      type: String,
    },
    required: {
      default: false,
      type: Boolean,
    },
    withHeadingSpace: {
      default: false,
      type: Boolean,
    },
    size: {
      default: '',
      type: String as PropType<PropSize>,
    },
  },
  data(): State {
    return {
      myval: false,
      errorMsg: '',
    };
  },
  computed: {
    myClass(): any {
      const klass: any = { 'ca-checkbox': true };
      if (this.myval) {
        klass['-checked'] = true;
      }
      let size = '-size-m';
      if (this.size && this.size === 'S') {
        size = '-size-s';
      } else if (this.size && this.size === 'L') {
        size = '-size-l';
      }
      klass[size] = true;

      return klass;
    },
    e2eAttr(): string {
      return `e2e-${this.name}`;
    },
    rules(): object {
      let str: object = {};
      if (this.required) {
        str = { required: { allowFalse: false } };
      }
      return str;
    },
  },
  mounted() {
    if (this.value) {
      this.myval = this.value;
    }
  },
  methods: {
    /**
     * onChangeInput
     */
    onChangeInput(e: Event) {
      if (e.target instanceof HTMLInputElement) {
        this.myval = Boolean(e.target.checked);
        this.$emit('input', this.myval);
      }
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
    labelClass(errors: string[]): string {
      const klass: any = { 'ca-checkbox-label': true };

      if (errors.length > 0) {
        klass['-has-error'] = true;
      }

      return klass;
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-checkbox {
  display: inline-flex;
  align-items: center;
}

.ca-checkbox-label {
  display: block;
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: var(--fontsize-normal);
  color: var(--dark);
}

.ca-checkbox-label.-has-error > div {
  color: var(--danger);
}

.ca-checkbox-label > input {
  display: none;
}

.ca-checkbox-box {
  position: relative;
  display: inline-block;
  content: '';
  width: var(--form-checkbox-size);
  height: var(--form-checkbox-size);
  background-color: var(--white);
  border: var(--form-border-color);
  border-radius: 6px;
  margin-right: 10px;
  box-shadow: var(--form-shadow);
  flex-shrink: 0;
}

.ca-checkbox-box::after {
  --ok: #999;
  display: none;
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  margin-left: -6px;

  transform: rotate(45deg) translate(-50%, -50%);
  height: 15px;
  width: 10px;
  border-bottom: 4px solid var(--ok);
  border-right: 4px solid var(--ok);
}

.ca-checkbox.-checked .ca-checkbox-box::after {
  display: block;
}
/* errors */

.ca-input-errors {
  font-size: var(--fontsize-small);
  color: var(--danger);
  white-space: nowrap;
  padding: 0;
  margin: 0px 0 0 0;
}
.formmark-required {
  padding-left: 4px;
}

/* size */

.ca-checkbox.-size-s > .ca-checkbox-label {
  min-height: var(--button-height-small);
}
.ca-checkbox.-size-m > .ca-checkbox-label {
  min-height: var(--button-height-normal);
}
.ca-checkbox.-size-l > .ca-checkbox-label {
  min-height: var(--button-height-large);
}
</style>
