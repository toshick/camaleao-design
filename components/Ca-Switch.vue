<template>
  <ValidationProvider :class="myClass" :name="name" :rules="myrules" v-slot="{ errors, passed }" :data-e2e="e2eAttr" tag="span">
    <label class="ca-switch-toggle">
      <i class="ca-switch-icon" />
      <p>{{ label }}</p>
      <input :value="myval" @input="(e) => onChangeInput(e)" type="checkbox" />
      <span v-if="required && !passed" class="formmark-required"></span>
      <span v-if="errors.length > 0" class="ca-input-errors">
        {{ getErrMessage(errors) }}
      </span>
    </label>
  </ValidationProvider>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { ValidationProvider } from 'vee-validate';
import { getErrMessage } from './helper';

type State = {
  myval: boolean;
  getErrMessage: (errors: string[]) => string;
};

export default Vue.extend({
  name: 'CaSwitch',
  components: {
    ValidationProvider,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    required: {
      default: false,
      type: Boolean,
    },
    type: {
      default: '',
      type: String,
    },
    size: {
      default: '',
      type: String,
    },
    label: {
      default: '',
      type: String,
    },
    withHeadingSpace: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    myClass(): any {
      const klass: any = { 'ca-switch': true };
      let size = '';
      if (this.size && this.size === 'S') {
        size = '-size-s';
      }
      if (this.size && this.size === 'L') {
        size = '-size-l';
      }
      klass[size] = true;
      if (this.myval) {
        klass['-checked'] = true;
      }
      if (this.withHeadingSpace) {
        klass['-with-heading-space'] = true;
      }
      return klass;
    },
    myrules(): object {
      let str: object = {};
      if (this.required) {
        str = { required: { allowFalse: false } };
      }
      return str;
    },
    e2eAttr(): string {
      return `e2e-${this.name}`;
    },
  },
  data(): State {
    return {
      myval: false,
      getErrMessage,
    };
  },
  mounted() {
    this.myval = this.value;
    if (this.value) {
      this.$emit('change', this.myval);
    }
  },
  methods: {
    onClick() {
      this.myval = !this.myval;
    },
    /**
     * onChangeInput
     */
    onChangeInput(e: Event) {
      if (e.target instanceof HTMLInputElement) {
        this.myval = Boolean(e.target.checked);
        console.log('onChangeInput', this.myval);
        this.$emit('input', this.myval);
      }
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-switch {
  display: inline-flex;
  align-items: center;
  font-size: var(--fontsize-normal);
  padding-right: 6px;
}
.ca-switch input {
  display: none;
}
.ca-switch-toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: var(--switch-size-normal);
}
.ca-switch-toggle p {
  display: inline-block;
  white-space: nowrap;
  line-height: 1;
  cursor: pointer;
  color: var(--dark);
  margin: 0;
}
.ca-switch-icon {
  display: flex;
  align-items: center;

  background-color: var(--switch-color-bg);
  border-radius: 20px;
  margin-right: 6px;
  padding: 0 4px;
  width: calc(var(--switch-size-normal) * 2);
  height: var(--switch-size-normal);
}
.ca-switch-icon::before {
  display: block;
  content: '';
  width: calc(var(--switch-size-normal) - 6px);
  height: calc(var(--switch-size-normal) - 6px);
  border-radius: 50%;
  background-color: var(--switch-color-circle);
}
.ca-switch-icon::after {
  --smallcircle-size: calc(var(--switch-size-normal) / 2 - 3px);
  display: none;
  content: '';
  background-color: var(--switch-color-circle2);
  width: 0px;
  height: 0px;
  border: var(--smallcircle-size) solid transparent;
  border-top: var(--smallcircle-size) solid var(--switch-color-circle1);
  border-right: var(--smallcircle-size) solid var(--switch-color-circle1);
  border-radius: 100%;
  animation: ratate 2s linear infinite;
}
@keyframes ratate {
  100% {
    transform: rotate(360deg);
  }
}

/* checked */
.ca-switch.-checked .ca-switch-icon {
  background-color: var(--switch-color-bg-checked);
}
.ca-switch.-checked .ca-switch-icon::before {
  display: none;
}
.ca-switch.-checked .ca-switch-icon::after {
  display: block;
  margin-left: auto;
}

/* size s */
.ca-switch.-size-s .ca-switch-toggle {
  height: var(--switch-size-small);
}
.ca-switch.-size-s .ca-switch-icon {
  width: calc(var(--switch-size-small) * 2);
  height: var(--switch-size-small);
}
.ca-switch.-size-s .ca-switch-icon::before {
  width: calc(var(--switch-size-small) - 6px);
  height: calc(var(--switch-size-small) - 6px);
}
.ca-switch.-size-s .ca-switch-icon::after {
  --smallcircle-size: calc(var(--switch-size-small) / 2 - 3px);
  content: '';
  background-color: var(--switch-color-circle2);
  width: 0px;
  height: 0px;
  border: var(--smallcircle-size) solid transparent;
  border-top: var(--smallcircle-size) solid var(--switch-color-circle1);
  border-right: var(--smallcircle-size) solid var(--switch-color-circle1);
  border-radius: 100%;
  animation: ratate 2s linear infinite;
}

/* size l */
.ca-switch.-size-l .ca-switch-toggle {
  height: var(--switch-size-large);
}
.ca-switch.-size-l .ca-switch-icon {
  width: calc(var(--switch-size-large) * 2);
  height: var(--switch-size-large);
}
.ca-switch.-size-l .ca-switch-icon::before {
  width: calc(var(--switch-size-large) - 6px);
  height: calc(var(--switch-size-large) - 6px);
}
.ca-switch.-size-l .ca-switch-icon::after {
  --smallcircle-size: calc(var(--switch-size-large) / 2 - 3px);
  content: '';
  background-color: var(--switch-color-circle2);
  width: 0px;
  height: 0px;
  border: var(--smallcircle-size) solid transparent;
  border-top: var(--smallcircle-size) solid var(--switch-color-circle1);
  border-right: var(--smallcircle-size) solid var(--switch-color-circle1);
  border-radius: 100%;
  animation: ratate 2s linear infinite;
}

/* heading-space */
.ca-switch.-with-heading-space {
  padding-top: var(--form-heading-height);
}

.formmark-required {
  margin-left: 0.5em;
}
.ca-input-errors {
  font-size: var(--fontsize-small);
  color: var(--danger);
  white-space: nowrap;
  padding: 0;
  margin: 0px 0 0 0;
}
</style>
