<template>
  <!-- モーダル user -->
  <article class="modal-confirm">
    <h1 class="modal-title" v-html="confirmText"></h1>

    <footer>
      <CaButton width="S" type="positive" @click="positive" :disabled="confirmed">OK</CaButton>
      <CaButton width="S" @click="cancel" :disabled="confirmed">キャンセル</CaButton>
    </footer>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';

type State = {
  confirmed: boolean;
};

export default Vue.extend({
  name: 'ModalConfirm',
  props: {
    confirmText: String,
    onConfirm: Function,
  },
  components: {},
  data(): State {
    return {
      confirmed: false,
    };
  },
  mounted() {},
  methods: {
    close() {
      const p: any = this.$parent;
      p.onClickClose();
    },
    cancel() {
      this.close();
    },
    positive() {
      this.confirmed = true;
      if (this.onConfirm) {
        this.onConfirm();
      }
      this.close();
    },
  },
});
</script>


<style scoped lang="scss">
.modal-confirm {
  width: 400px;
}
h1 {
  font-size: var(--tag-fontsize-large);
  font-weight: normal;
  color: var(--dark);
  padding: 20px 20px;
  text-align: center;
}
footer {
  display: flex;
  justify-content: center;
  padding: 0 0 20px;
  .ca-button {
    margin: 0 10px;
  }
}
</style>
