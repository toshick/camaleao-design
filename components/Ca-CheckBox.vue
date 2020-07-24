<template>
  <ValidationProvider :class="myClass" :name="name" :rules="rules" v-slot="{ errors, valid, invalid, validated }" :data-e2e="e2eAttr" tag="label">
    <span>
      <input :value="myval" @input="(e) => onChangeInput(e)" type="checkbox" />
      {{ label }}
    </span>
    <!-- <span v-if="errors.length > 0" class="ca-input-errors">{{ getErrMessage(errors) }}</span> -->
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
      default: 'F',
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
    rules(): any {
      let str: any = null;
      if (this.required) {
        str = { required: { allowFalse: false } };
      }
      return str;
    },
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
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-checkbox {
  display: inline-flex;
  line-height: 1.4;
}
.ca-checkbox > span {
  display: block;
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: var(--fontsize-normal);
  color: var(--dark);
}
.ca-checkbox > span > input {
  display: none;
}
.ca-checkbox > span::before {
  display: inline-block;
  content: '';
  width: var(--form-checkbox-size);
  height: var(--form-checkbox-size);
  background-color: var(--white);
  border: solid 1px #ccc;
  border-radius: 6px;
  margin-right: 10px;
  box-shadow: var(--form-shadow);
  flex-shrink: 0;
}
.ca-checkbox > span::after {
  --ok: #999;
  display: none;
  content: '';
  position: absolute;
  top: 50%;
  left: 3px;
  margin-top: -4px;

  transform: rotate(45deg) translate(0, -50%);
  height: 10px;
  width: 5px;
  border-bottom: 4px solid var(--ok);
  border-right: 4px solid var(--ok);
}

.ca-checkbox.-checked > span::after {
  display: block;
}
.ca-input-errors {
  color: var(--danger);
}

/* size */

.ca-checkbox.-size-s > span {
  min-height: var(--form-button-height-small);
}
.ca-checkbox.-size-m > span {
  min-height: var(--form-button-height);
}
.ca-checkbox.-size-l > span {
  min-height: var(--form-button-height-large);
}
</style>
