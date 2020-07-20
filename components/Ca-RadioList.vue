<template>
  <ValidationProvider :class="myClass" :name="name" :rules="rules" :data-e2e="e2eAttr" tag="div">
    <div v-if="titleStr.length > 0" class="ca-input-heading">
      <p v-html="titleStr"></p>
    </div>
    <ul>
      <li v-for="(i, index) in itemsAry" :class="i.klass" :key="`${index}-${i.radio.value}`">
        <label>
          <input v-model="myval" type="radio" :value="i.radio.value" @input="(e) => onChangeInput(e, i.radio)" />
          {{ i.radio.label }}
        </label>
      </li>
    </ul>

    <!-- <span v-if="errors.length > 0" class="ca-input-errors">{{ getErrMessage(errors) }}</span> -->
  </ValidationProvider>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { ValidationProvider } from 'vee-validate';

export type CaRadio = {
  value: string;
  label: string;
  checked?: boolean;
};

export type Item = {
  klass: string;
  radio: CaRadio;
};

type State = {
  myval: string;
  errorMsg: string;
};

export default Vue.extend({
  name: 'CaRadioList',
  components: {
    ValidationProvider,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
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
    items: {
      default: () => [],
      type: Array as PropType<CaRadio[]>,
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
      if (this.title) {
        str = this.title;
      }

      return str;
    },
    myClass(): any {
      const klass: any = { 'ca-radiolist': true };

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
    itemsAry(): Item[] {
      return this.items.map((radio: CaRadio) => {
        const klass: any = { 'ca-radiolist-item': true };
        if (radio.value === this.myval) {
          radio.checked = true;
          klass['-checked'] = true;
        } else {
          radio.checked = false;
        }
        return { radio, klass };
      });
    },
  },
  methods: {
    /**
     * onChangeInput
     */
    onChangeInput(e: Event, radio: CaRadio) {
      if (e.target instanceof HTMLInputElement) {
        this.myval = String(e.target.value);
        this.$emit('input', { ...radio, checked: true });
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
.ca-radiolist {
  position: relative;
}
.ca-radiolist-item {
  position: relative;
  list-style: none;
  line-height: 1;
}
.ca-radiolist-item input[type='radio'] {
  display: none;
}

.ca-radiolist-item > label {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  line-height: 1;
}
.ca-radiolist-item > label:hover {
  opacity: 0.9;
}

.ca-radiolist-item label::before {
  position: relative;

  display: block;
  content: '';
  width: var(--form-radio-size);
  height: var(--form-radio-size);
  background-color: var(--white);
  border: solid 1px #ccc;
  border-radius: calc(var(--form-radio-size) / 2);
  margin-right: calc(var(--form-radio-size) / 2);
  box-shadow: var(--form-shadow);
}
.ca-radiolist-item label::after {
  --ok: #999;
  --smallcircle-size: calc(var(--form-radio-size) - 14px);
  display: none;
  content: '';
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #999;

  width: var(--smallcircle-size);
  height: var(--smallcircle-size);

  border-radius: calc(var(--form-radio-size) - 8px * 0.5);
  animation: radioanime 1.6s ease infinite;
}

@keyframes radioanime {
  0% {
    transform: scale(1, 1);
    background-color: #999;
  }
  50% {
    transform: scale(1.4, 1.4);
    background-color: #bbb;
  }
}

/* checked */
.ca-radiolist-item.-checked::after {
  display: block;
}

.ca-radiolist-item.-checked > label::after {
  display: block;
}

.ca-input-errors {
  color: var(--danger);
}

.ca-input-heading {
  position: relative;
  height: 35px;
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
</style>
