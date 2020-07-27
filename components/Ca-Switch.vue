<template>
  <span :class="myClass">
    <input type="hidden" v-model="myval" />
    <a class="ca-switch-toggle" @click.stop.prevent="onClick">
      <i class="ca-switch-icon" />
      <label>{{ label }}</label>
    </a>
  </span>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

type State = {
  myval: boolean;
};

export default Vue.extend({
  name: 'CaTag',
  props: {
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
      klass[size] = true;
      if (this.myval) {
        klass['-checked'] = true;
      }
      if (this.withHeadingSpace) {
        klass['-with-heading-space'] = true;
      }
      return klass;
    },
  },
  data(): State {
    return {
      myval: false,
    };
  },
  methods: {
    onClick() {
      this.myval = !this.myval;
      this.$emit('input', this.myval);
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
.ca-switch-toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: var(--form-input-height);
}
label {
  display: inline-block;
  white-space: nowrap;
  line-height: 1;
  cursor: pointer;
  color: var(--dark);
}
.ca-switch-icon {
  display: flex;
  align-items: center;

  background-color: #ddd;
  border-radius: 20px;
  margin-right: 6px;
  padding: 0 4px;
  width: 40px;
  height: var(--switch-size-small);
}
.ca-switch-icon::before {
  display: block;
  content: '';
  width: calc(var(--switch-size-small) - 6px);
  height: calc(var(--switch-size-small) - 6px);
  border-radius: 50%;
  background-color: #fff;
}
.ca-switch-icon::after {
  --circle-color: #d5d5d5;
  --smallcircle-size: calc(var(--switch-size-small) / 2 - 3px);
  display: none;
  content: '';
  background-color: #fff;
  width: 0px;
  height: 0px;
  border: var(--smallcircle-size) solid transparent;
  border-top: var(--smallcircle-size) solid var(--circle-color);
  border-right: var(--smallcircle-size) solid var(--circle-color);
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
  background-color: #888;
}
.ca-switch.-checked .ca-switch-icon::before {
  display: none;
}
.ca-switch.-checked .ca-switch-icon::after {
  display: block;
  margin-left: auto;
}

/* size */
.ca-switch.-size-s .ca-switch-toggle {
  height: var(--form-input-height-small);
}

.ca-switch.-size-s .ca-switch-icon {
  width: 40px;
  height: 20px;
}
.ca-switch.-size-s .ca-switch-icon::before {
  width: calc(var(--switch-size-small) - 6px);
  height: calc(var(--switch-size-small) - 6px);
}

.ca-switch.-size-s .ca-switch-icon::after {
  --circle-color: #d5d5d5;
  --smallcircle-size: calc(var(--switch-size-small) / 2 - 3px);
  content: '';
  background-color: #fff;
  width: 0px;
  height: 0px;
  border: var(--smallcircle-size) solid transparent;
  border-top: var(--smallcircle-size) solid var(--circle-color);
  border-right: var(--smallcircle-size) solid var(--circle-color);

  border-radius: 100%;
  animation: ratate 2s linear infinite;
}

/* heading-space */
.ca-switch.-with-heading-space {
  padding-top: 25px;
}
</style>
