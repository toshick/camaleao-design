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
    size: {
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
    float: {
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
      if (this.float) {
        klass['-float'] = true;
      }
      let size = '';
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
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 1;
}
.ca-radiolist-item > label:hover {
  opacity: 0.8;
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
  --circle-color: #ddd;
  --smallcircle-size: calc(var(--form-radio-size) - 15px);
  display: none;
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: #bbb;

  width: 0px;
  height: 0px;

  border: var(--smallcircle-size) solid transparent;
  border-top: var(--smallcircle-size) solid var(--circle-color);
  border-right: var(--smallcircle-size) solid var(--circle-color);
  /* border-bottom: var(--smallcircle-size) solid var(--circle-color); */

  /* border-radius: calc(var(--form-radio-size) - 8px * 0.5); */
  /* animation: radioanime 1.6s ease infinite; */
  border-radius: 100%;
  animation: ratate 2s linear infinite;
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
@keyframes ratate {
  100% {
    transform: rotate(360deg);
  }
}

/* checked */
.ca-radiolist-item.-checked {
  pointer-events: none;
}
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

/* size */
.ca-radiolist.-size-s label {
  font-size: var(--fontsize-small);
}

/* float */
.ca-radiolist.-float ul {
  display: flex;
}
.ca-radiolist.-float li {
  margin-right: 1em;
}
</style>
