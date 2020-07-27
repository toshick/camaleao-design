<template>
  <ValidationObserver ref="obs" slim>
    <ValidationProvider :class="myClass" :name="name" :rules="rules" v-slot="{ errors, valid, invalid, validated, passed }" :data-e2e="e2eAttr" tag="div">
      <input type="hidden" :value="myval" />
      <div v-if="titleStr.length > 0" class="ca-input-heading">
        <p v-html="titleStr"></p>
      </div>
      <div class="ca-input-status">
        <p v-if="required && !passed && errors.length == 0" class="formmark-required">＊</p>
        <p v-if="myval.length > 0 && passed" class="formmark-passed"></p>
      </div>
      <button class="ca-pulldown-btn" @click.stop.prevent="onClick">
        {{ selectedDisp }}
        <i class="arrow"></i>
      </button>

      <transition name="fade">
        <ul class="ca-pulldown-list" v-show="isOpen">
          <li v-for="i in itemsAry" :key="`item-${i.pull.label}`" :class="{ '-selected': i.pull.selected }">
            <a @click.stop.prevent="() => onClickItem(i.pull)">
              <CaIcon type="check" size="S" class="check" />
              {{ i.pull.label }}
            </a>
          </li>
        </ul>
      </transition>

      <div v-if="errors.length > 0" class="ca-input-errors">
        <p>{{ getErrMessage(errors) }}</p>
      </div>
    </ValidationProvider>
  </ValidationObserver>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { ValidationProvider, ValidationObserver, validate } from 'vee-validate';
import CaIcon from './Ca-Icon.vue';
import { getErrMessage } from './helper.ts';

export type CaPulldownItem = {
  value: string;
  label: string;
  default?: boolean;
  selected?: boolean;
};

type State = {
  myval: string;
  errorMsg: string;
  isOpen: boolean;
  getErrMessage: (errors: string[]) => string;
};

type Item = {
  klass: string;
  pull: CaPulldownItem;
};

type PropSize = 'S' | 'L';
export default Vue.extend({
  name: 'CaPulldown',
  components: {
    CaIcon,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    value: {
      default: '',
      type: String,
    },
    title: {
      default: '',
      type: String,
    },
    withHeadingSpace: {
      default: false,
      type: Boolean,
    },
    size: {
      default: '',
      type: String as PropType<PropSize>,
    },
    items: {
      default: [],
      type: Array as PropType<CaPulldownItem[]>,
    },
    hoverOpen: {
      default: false,
      type: Boolean,
    },
    rules: {
      type: String,
      default: '',
    },
  },
  data(): State {
    return {
      myval: '',
      errorMsg: '',
      isOpen: false,
      getErrMessage,
    };
  },
  computed: {
    e2eAttr(): string {
      return `e2e-${this.name}`;
    },
    titleStr(): string {
      let str = '';
      if (this.title) {
        str = this.title;
      }

      return str;
    },
    myClass(): any {
      const klass: any = { 'ca-pulldown': true };
      let size = '-size-m';
      if (this.size && this.size === 'S') {
        size = '-size-s';
      } else if (this.size && this.size === 'L') {
        size = '-size-l';
      }
      klass[size] = true;
      if (this.hoverOpen) {
        klass['-hover-open'] = true;
      }
      if (this.withHeadingSpace) {
        klass['-with-heading-space'] = true;
      }

      return klass;
    },
    itemsAry(): Item[] {
      return this.items.map((pull: CaPulldownItem) => {
        const klass: any = { 'ca-pulldown-item': true };
        if (this.myval === pull.value) {
          pull.selected = true;
        } else {
          pull.selected = false;
        }
        return { pull, klass };
      });
    },
    selectedDisp(): string {
      const noval = '選択してください';
      if (this.myval) {
        const find = this.items.find((pull: CaPulldownItem) => {
          return pull.value === this.myval;
        });
        return find ? find.label : noval;
      }
      return noval;
    },
    required(): boolean {
      return this.rules.includes('required');
    },
  },
  mounted() {
    this.setWindowClick(true);

    if (this.value) {
      this.myval = this.value;
    }
  },
  methods: {
    onClick() {
      this.isOpen = !this.isOpen;
    },
    onClickItem(i: CaPulldownItem) {
      if (this.myval === i.value) {
        this.myval = '';
      } else {
        this.myval = i.value;
      }

      this.doValidate();
      this.$emit('input', this.myval);
      this.isOpen = false;
    },
    closeMenu() {
      this.isOpen = false;
    },
    setWindowClick(flg: boolean) {
      if (typeof window !== 'undefined') {
        window.removeEventListener('click', this.windowClick);
        if (flg) {
          window.addEventListener('click', this.windowClick);
        }
      }
    },
    doValidate() {
      this.$nextTick(() => {
        const obs = this.$refs.obs as ValidationObserver;
        obs.validate();
      });
    },
    windowClick(e: MouseEvent) {
      if (!this.$el.contains(e.target as Element)) {
        this.closeMenu();
      }
    },
  },
  beforeDestroy() {
    this.setWindowClick(false);
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-pulldown {
  position: relative;

  display: inline-block;
}
.ca-pulldown.-hover-open:hover .ca-pulldown-list {
  display: block;
}

/* heading-space */
.ca-pulldown.-with-heading-space {
  padding-top: 25px;
}

/* size */
.ca-pulldown.-size-s .ca-pulldown-btn {
  font-size: var(--fontsize-small);
  height: var(--form-button-height-small);
}
.ca-pulldown.-size-s .ca-input-status {
  top: 33px;
}

.ca-pulldown.-size-m .ca-pulldown-btn {
  font-size: var(--fontsize-normal);
  height: var(--form-button-height);
}
.ca-pulldown.-size-l .ca-pulldown-btn {
  font-size: var(--fontsize-large);
  height: var(--form-button-height-large);
}

.ca-pulldown-list {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  list-style: none;
  width: max-content;
  box-shadow: var(--form-shadow);
  border-radius: 6px;
  overflow: hidden;
  border: solid 1px #ccc;
  margin-top: 4px;
}

.ca-pulldown-list li .check {
  position: absolute;
  top: 50%;
  left: 6px;
  transform: translate(0, -50%);
  display: none;
}

/* selected */

.ca-pulldown-list li.-selected .check {
  display: inline-flex;
}

.ca-pulldown-list li a {
  position: relative;
  display: block;
  cursor: pointer;
  background-color: #fff;
  padding: 6px 20px 6px 34px;
  max-width: 400px;

  font-size: var(--fontsize-small);
  border-bottom: solid 1px #ddd;
}
.ca-pulldown-list li:last-child a {
  border-bottom: none;
}
.ca-pulldown-list li a:hover {
  background-color: #f9f9f9;
}

.ca-pulldown-btn {
  position: relative;
  padding: 0 34px 0 14px;
  border: solid 1px #ccc;
  border-radius: 4px;
  box-shadow: var(--form-shadow);
  text-align: left;

  background-color: #fff;
  color: #666;
  letter-spacing: 0.05em;
  cursor: pointer;
}

/* heading */
.ca-input-heading {
  position: relative;
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

/* arrow */
.arrow {
  position: absolute;
  top: 52%;
  right: 12px;
  transform: translate(0, -80%);
  display: block;
}
.arrow::after {
  --color: #666;
  display: block;
  content: '';
  width: 6px;
  height: 6px;
  transform: rotate(45deg);

  border-bottom: 1px solid var(--color);
  border-right: 1px solid var(--color);
}

.ca-input-status {
  position: absolute;
  top: 43px;
  right: 4px;
  width: 14px;
  height: 14px;
}

.formmark-passed {
  position: absolute;
  top: -18px;
  left: 5px;
}

/* .ca-pulldown */
.ca-pulldown .formmark-required {
  font-size: 10px !important;
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
</style>
