<template>
  <span :class="buttonClass" @click.stop.prevent="onClick">
    <slot></slot>
  </span>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
export default Vue.extend({
  name: 'CaTag',
  props: {
    type: {
      default: '',
      type: String,
    },
  },
  computed: {
    buttonClass(): any {
      const klass: any = { 'ca-tag': true };
      if (this.type) {
        klass[`-${this.type}`] = true;
      }
      if (this.isClickable) {
        klass['-clickable'] = true;
      }
      return klass;
    },
    isClickable(): boolean {
      return Boolean(this.$listeners.click);
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-tag {
  display: inline-block;

  padding: var(--tag-padding-normal);
  border: none;
  border-radius: var(--tag-radius-normal);
  box-shadow: var(--form-shadow);
  font-size: var(--tag-fontsize-normal);
  background-color: #fff;
  color: var(--dark);
  letter-spacing: var(--tag-letter-spacing);
  pointer-events: none;
}
.ca-tag:hover {
  filter: brightness(96%);
  cursor: pointer;
}
.ca-tag:active {
  filter: brightness(94%);
}
.ca-tag.-size-s {
  padding: var(--tag-padding-small);
  font-size: var(--tag-fontsize-small);
}
.ca-tag.-size-l {
  padding: var(--tag-padding-large);
  font-size: var(--tag-fontsize-large);
}
.ca-tag.-long {
  display: inline-block;
  min-width: 320px;
}

.ca-tag.-clickable {
  pointer-events: all;
}

/* yellow */
.ca-tag.-yellow {
  background-color: var(--positive);
  color: #796a1a;
  box-shadow: 0 0 3px 0px rgba(51, 51, 51, 0.1);
}

/* red */
.ca-tag.-red {
  background-color: var(--danger);
  color: #640f0f;
  box-shadow: 0 0 3px 0px rgba(51, 51, 51, 0.1);
}

/* green */
.ca-tag.-green {
  background-color: var(--ok);
  color: #42684a;
  box-shadow: 0 0 3px 0px rgba(51, 51, 51, 0.1);
}
</style>
