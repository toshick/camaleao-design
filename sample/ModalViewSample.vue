<template>
  <div class="modalview">
    <h1>ModalViewSample</h1>

    <CaButton @click="setIconA">ヘッダにアイコンをセットA</CaButton>
    <CaButton @click="setIconB">ヘッダにアイコンをセットB</CaButton>
    <CaButton @click="close">とじる</CaButton>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'UserInfoForm',
  components: {},
  model: {
    prop: 'isOpen',
    event: 'change-open',
  },
  props: {
    msg: String,
    isOpen: Boolean,
  },

  data(): State {
    return {};
  },
  mounted() {},
  methods: {
    setIconA() {
      this.$emit('setIcon', ['paper-plane-outline']);
    },
    setIconB() {
      this.$emit('setIcon', ['map-outline', 'rainy-outline']);
    },
    close() {
      this.$emit('close');
    },
    onClickIcon(icon: string) {
      console.log('親からコール', icon);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.modalview {
  padding: 20px;
}
h1 {
  margin-bottom: 2em;
}
.modalview .ca-button {
  margin: 10px 0;
}
</style>
