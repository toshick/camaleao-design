<template>
  <div :class="myClass">
    <input type="hidden" v-model="myval" />
    <div v-if="titleStr.length > 0" class="ca-input-heading">
      <p v-html="titleStr"></p>
    </div>
    <button class="ca-pulldown-btn" @click.stop="onClick">
      {{ selected.label }}
      <i class="arrow"></i>
    </button>

    <transition name="fade">
      <ul class="ca-pulldown-list" v-show="isOpen">
        <li v-for="i in itemsAry" :key="`item-${i.pull.label}`" :class="{ '-selected': i.pull.selected }">
          <a @click.stop="() => onClickItem(i.pull)">
            <CaIcon type="check" size="S" class="check" />
            {{ i.pull.label }}
          </a>
        </li>
      </ul>
    </transition>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import CaIcon from './Ca-Icon.vue';

export type CaPulldownItem = {
  value: string;
  label: string;
  default?: boolean;
  selected?: boolean;
};

type State = {
  myval: CaPulldownItem;
  errorMsg: string;
  isOpen: boolean;
};

type Item = {
  klass: string;
  pull: CaPulldownItem;
};

const defaultItem = { value: '', label: '選択してください', default: true, selected: false };

type PropSize = 'S' | 'L';
export default Vue.extend({
  name: 'CaPulldown',
  components: {
    CaIcon,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    withHeadingSpace: {
      default: false,
      type: Boolean,
    },
    size: {
      default: 'F',
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
  },
  data(): State {
    return {
      myval: { ...defaultItem },
      errorMsg: '',
      isOpen: false,
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
        if (this.myval && this.myval.value === pull.value) {
          pull.selected = true;
        } else {
          pull.selected = false;
        }
        return { pull, klass };
      });
    },
    selected(): CaPulldownItem {
      if (this.myval.value) {
        return this.myval;
      }
      return defaultItem;
    },
  },
  mounted() {
    this.setWindowClick(true);
  },
  methods: {
    onClick() {
      // this.$emit('click');
      this.isOpen = !this.isOpen;
    },
    onClickItem(i: CaPulldownItem) {
      if (this.myval.value === i.value) {
        this.myval = defaultItem;
      } else {
        this.myval = i;
      }
      // this.isOpen = false;
    },
    closeMenu() {
      this.isOpen = false;
    },
    setWindowClick(flg: boolean) {
      window.removeEventListener('click', this.windowClick);
      if (flg) {
        window.addEventListener('click', this.windowClick);
      }
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
</style>
