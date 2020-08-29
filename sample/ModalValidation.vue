<template>
  <!-- モーダル user -->
  <CaModal @close="close" v-if="isOpen">
    <CaModalBody class="modalcont" title="ユーザ情報入力" fit>
      <ValidationObserver tag="form" v-slot="{ invalid, handleSubmit }" class="form">
        <div class="modalcont-line margin-top-20">あなたのユーザ情報を入力してみてね</div>
        <h2>希望プラン</h2>
        <div class="modalcont-line">
          <CaPulldown name="myplan" v-model="myplan" rules="required" :items="pulldownItemsPlan"></CaPulldown>
        </div>

        <h2>同意事項</h2>
        <div class="modalcont-line disclaimer">
          <ul class="disclaimer-list">
            <li>
              <CaCheckBox required name="disclaimer1" size="S" label="免責についての文言免責についての文言免責についての文言免責についての文言" v-model="disclaimer1"></CaCheckBox>
            </li>
          </ul>
        </div>

        <h2>性別</h2>
        <div class="modalcont-line sex">
          <CaRadioList float required name="sex" v-model="sex" :items="radioItemsSex"></CaRadioList>
        </div>

        <footer>
          <CaButton width="S" type="positive" @click="handleSubmit(submit)" :disabled="invalid">OK</CaButton>
          <CaButton width="S" @click="close">キャンセル</CaButton>
        </footer>
      </ValidationObserver>
    </CaModalBody>
  </CaModal>
</template>

<script lang="ts">
import Vue from 'vue';

import { ValidationObserver } from 'vee-validate';

type State = {
  radioItemsSex: CaRadio[];
  loading: boolean;
  pulldownItemsPlan: CaPulldownItem[];
  hasCoupon: boolean;
  myplan: string;
  disclaimer1: boolean;
  couponCode: string;
  sex: string;
};

export default Vue.extend({
  name: 'ModalValidation',
  model: {
    prop: 'isOpen',
    event: 'change-open',
  },
  props: {
    msg: String,
    isOpen: Boolean,
  },
  components: {
    ValidationObserver,
  },
  data(): State {
    return {
      radioItemsSex: [
        { label: '男性', value: 'male' },
        { label: '女性', value: 'female' },
      ],
      loading: false,
      pulldownItemsPlan: [
        { value: 'plan01', label: 'ビギナーズプラン' },
        { value: 'plan02', label: 'スダンダードプラン' },
        { value: 'plan03', label: 'コンテンポラリープラン' },
      ],
      hasCoupon: false,
      myplan: '',

      disclaimer1: false,
      couponCode: '',
      sex: '',
    };
  },
  mounted() {},
  methods: {
    submit() {
      console.log('そうしん');
    },
    close() {
      this.$emit('change-open', false);
    },
  },
});
</script>


<style scoped lang="scss">
/* modalcont */

.form {
  max-width: 400px;
}

.modalcont h2 {
  font-size: 16px;
  font-weight: normal;
  padding: 10px 40px 10px;
  color: #999;
}

.modalcont-img {
  overflow: hidden;
  height: 200px;
  box-shadow: var(--form-shadow);
}
.modalcont-img img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.modalcont-line {
  padding: 10px 40px 10px;
  margin: 0;
  line-height: 1.6;
  color: #888;
}

.modalcont footer {
  text-align: center;
  padding: 20px 0 40px;
}
.modalcont footer button {
  margin: 0 10px;
}

.space-left {
  margin-left: 2em;
}

/* 免責 */
.disclaimer-list li {
  padding: 6px 0;
}
.disclaimer-list li:first-child {
  padding: 0;
}
</style>
