<template>
  <!-- モーダル user -->
  <article :class="myClass">
    <ValidationObserver tag="form" v-slot="{ invalid, handleSubmit }" class="form">
      <h1 class="modal-title" v-html="confirmText"></h1>
      <section v-if="inputs.length > 0">
        <ul>
          <li v-for="i in inputs" :key="i.name">
            <CaInput :name="i.name" :title="i.title" :rules="i.rules" v-model="i.value" @input="(v) => onInput(i.name, v)" :placeholder="i.placeholder" :width="i.width" :size="i.size"></CaInput>
          </li>
        </ul>
      </section>

      <footer>
        <CaButton width="S" :type="buttonType" @click="handleSubmit(submit)" :disabled="invalid">{{ buttonLabel }}</CaButton>
        <CaButton v-if="withCancel" width="S" @click="cancel">キャンセル</CaButton>
      </footer>
    </ValidationObserver>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ValidationObserver } from 'vee-validate';
import { Input, FormReturn } from '../type';

type State = {
  formVal: { [key: string]: string };
};

export default Vue.extend({
  name: 'ModalInput',
  components: { ValidationObserver },
  props: {
    confirmText: String,
    onConfirm: Function,
    type: String,
    btnLabel: String,
    inputname: String,
    placeholder: String,
    inputs: {
      default: () => [],
      type: Array as PropType<Input[]>,
    },
    withCancel: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    myClass(): any {
      const klass: any = { 'modal-input': true };
      if (this.type) {
        klass[`-${this.type}`] = true;
      }

      return klass;
    },
    buttonType(): string {
      if (this.type) {
        return this.type;
      }
      return 'positive';
    },
    buttonLabel(): string {
      if (this.btnLabel) {
        return this.btnLabel;
      }
      return 'OK';
    },
  },
  data(): State {
    return {
      formVal: {},
    };
  },
  mounted() {
    this.inputs.forEach((d: Input) => {
      this.formVal[d.name] = d.value;
    });
  },
  methods: {
    close() {
      const p: any = this.$parent;
      p.onClickClose();
    },
    cancel() {
      this.close();
    },
    async submit() {
      if (this.onConfirm) {
        this.onConfirm({ ...this.formVal });
      }
      this.close();
    },
    onInput(name: string, val: string) {
      console.log('onInput', name, val);
      this.formVal[name] = val;
    },
  },
});
</script>


<style scoped lang="scss">
.modal-input {
  max-width: 400px;
  .ca-input {
    width: max-content;
    margin: 0 auto;
  }
}
h1 {
  font-size: var(--tag-fontsize-medium);
  font-weight: normal;
  color: var(--dark);
  padding: 20px 20px;
  text-align: center;
}
section {
  padding: 0 20px 30px;
  li {
    margin-bottom: 10px;
  }
}
footer {
  display: flex;
  justify-content: center;
  padding: 0 10px 20px;
  .ca-button {
    margin: 0 10px;
  }
}
</style>
