<template>
  <transition name="drillup">
    <div v-if="visible" :class="myClass">
      <div class="ca-modal-sidemenu-scroll" @click.stop.prevent="clickBack" ref="scroll">
        <div class="ca-modal-sidemenu-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

type State = {
  visible: boolean;
  appeared: boolean;
};

export default Vue.extend({
  name: 'Ca-ModalSideMenu',
  props: {
    klass: String,
  },
  computed: {
    myClass(): any {
      const klass: any = { 'ca-modal-sidemenu': true };
      if (this.klass) {
        klass[this.klass] = true;
      }
      if (!this.appeared) {
        klass['-noscroll'] = true;
      }
      return klass;
    },
  },
  data(): State {
    return {
      visible: false,
      appeared: false,
    };
  },
  mounted() {
    this.visible = true;

    setTimeout(() => {
      this.appeared = true;
      // const $scroll = this.$refs.scroll as Element;
      // $scroll.scrollTo();
    }, 1000);
  },
  methods: {
    close() {
      this.visible = false;
      this.appeared = false;
      this.$emit('close');
    },

    clickBack(e: MouseEvent) {
      const $el = e.target as Element;
      if ($el.className.includes('ca-modal-sidemenu-scroll')) {
        this.close();
      }
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-modal-sidemenu {
  display: grid;
  width: 100%;
  height: 100%;
}

.ca-modal-sidemenu.-noscroll .ca-modal-sidemenu-scroll {
  overflow: hidden;
}

.ca-modal-sidemenu-scroll {
  overflow: scroll;
}
.ca-modal-sidemenu-body {
  width: 70%;
  background-color: #fff;
  padding: 20px;
}
</style>
