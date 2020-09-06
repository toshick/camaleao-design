<template>
  <transition name="toast">
    <div v-if="visible" :class="myClass" @click.stop.prevent="close">
      <span>
        <ion-icon v-if="backIcon" :name="backIcon" size="" />
        {{ text }}
      </span>
    </div>
  </transition>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

type State = {
  visible: boolean;
};

export default Vue.extend({
  name: 'CaToast',
  props: {
    text: {
      default: '',
      type: String,
    },
    icon: {
      default: '',
      type: String,
    },
    duration: {
      default: 3000,
      type: Number,
    },
    klass: {
      default: () => [],
      type: Array as PropType<string[]>,
    },
  },
  computed: {
    myClass(): any {
      const klass: any = { 'ca-toast': true };
      if (this.klass.length > 0) {
        for (const key of this.klass) {
          klass[key] = true;
        }
      }
      if (this.visible) {
        klass['-show'] = true;
      }
      return klass;
    },
    backIcon(): string {
      if (this.icon) {
        return this.icon;
      }
      return 'mail';
    },
  },
  data(): State {
    return {
      visible: false,
    };
  },
  mounted() {
    this.visible = true;
    setTimeout(() => {
      this.close();
    }, this.duration);
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-toast {
  transition: 0.4s all cubic-bezier(0.39, 0.575, 0.565, 1);
  margin: 0 auto 0.5em;
  padding: 0 10px;
  width: min-content;
  max-width: 100%;
  cursor: pointer;
}
.ca-toast span {
  display: block;
  white-space: nowrap;
  font-size: var(--toast-fontsize);
  border: var(--toast-border);
  border-radius: calc(var(--toast-radius));
  background-color: var(--toast-bg-color);
  box-shadow: var(--toast-shadow);
  text-align: center;
  color: var(--toast-text-color);
  line-height: 1;
  padding: var(--toast-padding);
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0 auto;
}
.ca-toast ion-icon {
  color: inherit;
  vertical-align: -5px;
  font-size: 20px;
}
</style>
