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
      <div class="ca-drumroll-waku" v-wheel="handleScroll" :class="{ '-smooth': xTimer !== 0 }">
        <!-- リスト -->
        <ul class="ca-drumroll-list" :style="{ top: scrollVal + 'px' }">
          <li v-for="i in itemsAry" :key="`item-${i.pull.label}`" :class="{ '-selected': i.pull.selected }">
            <a @click.stop.prevent="() => onClickItem(i.pull)">
              {{ i.pull.label }}
            </a>
          </li>
        </ul>
        <i class="arrow"></i>
      </div>

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
import { getErrMessage, throttle } from './helper.ts';
import { DirectiveBinding } from 'vue/types/options';

export type CaDrumrollItem = {
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
  scrollVal: number;
  scrollSpeed: number;
  xTimer: number;
  currentPage: number;
};

type Item = {
  klass: string;
  pull: CaDrumrollItem;
};

export default Vue.extend({
  name: 'CaPulldown',
  components: {
    CaIcon,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    wheel: {
      inserted: (el: HTMLElement, binding: DirectiveBinding) => {
        const f = (evt: MouseWheelEvent) => {
          if (binding.value(evt, el)) {
            el.removeEventListener('wheel', f);
          }
        };
        el.addEventListener('wheel', f);
      },
    },
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
      type: String as PropType<'S' | 'L'>,
    },
    items: {
      default: [],
      type: Array as PropType<CaDrumrollItem[]>,
    },
    hoverOpen: {
      default: false,
      type: Boolean,
    },
    rules: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '-',
    },
  },
  data(): State {
    return {
      myval: '',
      errorMsg: '',
      isOpen: false,
      getErrMessage,
      scrollVal: 0,
      scrollSpeed: 0,
      xTimer: 0,
      currentPage: 0,
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
      const klass: any = { 'ca-drumroll': true };
      let size = '';
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
      const defaultVal: CaDrumrollItem = { value: '', label: this.placeholder, default: true };
      const items2 = [defaultVal, ...this.items];
      return items2.map((pull: CaDrumrollItem) => {
        const klass: any = { 'ca-drumroll-item': true };
        if (this.myval === pull.value) {
          pull.selected = true;
        } else {
          pull.selected = false;
        }
        return { pull, klass };
      });
    },
    required(): boolean {
      return this.rules.includes('required');
    },
    cellHeight(): number {
      if (this.size && this.size === 'S') {
        return 28;
      }
      return 38;
    },
    cellHeightMax(): number {
      return (this.itemsAry.length - 1) * this.cellHeight;
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
    onClickItem(i: CaDrumrollItem) {
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

    limitScrollVal(): boolean {
      if (this.scrollVal > 0) {
        this.scrollVal = 0;
        this.scrollSpeed = 0;
        this.currentPage = 0;
        return true;
      } else if (this.scrollVal < -this.cellHeightMax) {
        this.scrollVal = -this.cellHeightMax;
        this.scrollSpeed = 0;
        this.currentPage = this.itemsAry.length - 1;
        return true;
      }
      return false;
    },

    handleScroll(evt: MouseWheelEvent, el: HTMLElement) {
      evt.stopPropagation();
      evt.preventDefault();
      clearTimeout(this.xTimer);

      this.scrollSpeed += 0;
      let val = -evt.deltaY * 0.2;
      val = val < 0 ? val - this.scrollSpeed : val + this.scrollSpeed;

      if (this.xTimer !== 0) {
        this.scrollVal += val;
      }

      if (this.limitScrollVal()) {
        return;
      }

      this.xTimer = <any>setTimeout(() => {
        this.xTimer = 0;
        this.scrollSpeed = 0;
        this.fixScrollVal();
      }, 120);
    },

    /**
     * スクロール量を高さの倍数にして表示をぴったりに合わせる
     */
    fixScrollVal() {
      let v = this.scrollVal;
      const amari = Math.abs(v % this.cellHeight);
      const page = Math.floor(v / this.cellHeight);
      const addPage = amari > this.cellHeight / 2 ? 0 : 1;
      v = (page + addPage) * this.cellHeight;
      this.currentPage = Math.abs(page + addPage);

      this.scrollVal = v;
      this.limitScrollVal();
    },
  },
  beforeDestroy() {
    clearTimeout(this.xTimer);
    this.setWindowClick(false);
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-drumroll {
  position: relative;

  display: inline-block;
}

/* heading-space */
.ca-drumroll.-with-heading-space {
  padding-top: 25px;
}

.ca-drumroll-waku {
  position: relative;
  min-width: var(--form-input-width-normal);
  width: max-content;
  height: var(--form-input-height);
  border: solid 1px #ccc;
  border-radius: 4px;
  box-shadow: var(--form-shadow);
  overflow: hidden;
  scroll-behavior: smooth;
}
/* .ca-drumroll-waku:hover .arrow {
  opacity: 0.1;
} */

.ca-drumroll-waku.-smooth .ca-drumroll-list {
  transition: none;
}

.ca-drumroll-list {
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 1;
  list-style: none;
  width: 100%;

  transition: 0.4s all cubic-bezier(0.39, 0.575, 0.565, 1);
}

.ca-drumroll-list li {
  width: 100%;
}

.ca-drumroll-list li .check {
  position: absolute;
  top: 50%;
  left: 6px;
  transform: translate(0, -50%);

  display: none;
}

/* selected */

.ca-drumroll-list li.-selected .check {
  display: inline-flex;
}

.ca-drumroll-list li a {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  background-color: #fff;
  padding: 0 30px 0 20px;
  white-space: nowrap;

  width: 100%;
  height: var(--form-input-height);

  font-size: var(--fontsize-normal);
  border-bottom: solid 1px #ddd;
  box-shadow: inset 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
}
.ca-drumroll-list li:last-child a {
  border-bottom: none;
}
.ca-drumroll-list li a:hover {
  background-color: #f9f9f9;
}

.ca-drumroll-btn {
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
  top: 50%;
  right: 12px;
  z-index: 1;
  margin-top: -6px;
  /* transform: translate(0, -80%); */
  display: block;
  pointer-events: none;
}
.arrow::before {
  --color: #666;
  display: block;
  content: '';
  width: 6px;
  height: 6px;
  transform: rotate(45deg);

  border-top: 1px solid var(--color);
  border-left: 1px solid var(--color);
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

/* .ca-drumroll */
.ca-drumroll .formmark-required {
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

/* size */
.ca-drumroll.-size-s .ca-drumroll-waku {
  height: var(--form-input-height-small);
}
.ca-drumroll.-size-s .ca-drumroll-list li a {
  height: var(--form-input-height-small);
}
</style>
