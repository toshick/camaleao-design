<template>
  <div :class="myClass">
    <div v-if="titleStr.length > 0" class="ca-input-heading">
      <p v-html="titleStr"></p>
    </div>
    <div class="ca-checkboxlist-list">
      <slot />
    </div>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

type State = {
  myval: boolean;
  errorMsg: string;
};

export default Vue.extend({
  name: 'CaCheckboxList',
  props: {
    name: {
      default: '',
      type: String,
    },
    title: {
      default: '',
      type: String,
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
      const klass: any = { 'ca-checkbox-list': true };
      if (this.myval) {
        klass['-checked'] = true;
      }

      return klass;
    },
    titleStr(): string {
      let str = '';
      if (this.title) {
        str = this.title;
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
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-checkboxlist-list > label {
  margin-right: 16px;
}

.ca-input-heading {
  position: relative;
  height: var(--form-heading-height);
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
