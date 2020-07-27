<template>
  <!-- モーダル user -->
  <CaModal @close="close">
    <CaModalBody class="modalcont" title="ユーザ情報入力">
      <ValidationObserver tag="form" v-slot="{ errors, validate }">
        <div class="modalcont-line">あなたのユーザ情報を入力してみてね</div>
        <h2>希望プラン</h2>
        <div class="modalcont-line ca-inputline">
          <CaPulldown name="myplan" v-model="myplan" rules="required" :items="pulldownItemsPlan"></CaPulldown>
          <CaSwitch label="クーポンコードを持っている" v-model="hasCoupon" />
          <CaFloat>
            <CaInput v-if="hasCoupon" size="S" height="M" name="coupon_code" rules="required" v-model="couponCode" placeholder="クーポンコード"></CaInput>
          </CaFloat>
        </div>
        <h2>氏名</h2>
        <div class="modalcont-line ca-inputline">
          <CaInput width="S" size="S" name="user_name_last" title="氏名（漢字）" rules="required" v-model="userNameLast" placeholder="姓"></CaInput>
          <CaInput width="S" size="S" name="user_name_first" title="" rules="required" v-model="userNameFirst" placeholder="名"></CaInput>
          <CaInput width="S" size="S" name="user_name_last_kana" title="氏名（カナ）" rules="required" v-model="userNameLastKana" placeholder="セイ" class="space-left"></CaInput>
          <CaInput width="S" size="S" name="user_name_first_kana" title="" rules="required" v-model="userNameFirstKana" placeholder="メイ"></CaInput>
        </div>

        <h2>住所</h2>
        <div class="modalcont-line ca-inputline">
          <CaInput width="S" size="S" name="zip_code" title="郵便番号" rules="required|numeric|length:7" v-model="zipCode" placeholder="郵便番号"></CaInput>
          <CaFloat withHeadingSpace>
            <CaButton size="S" @click="sendDummy(1)" :loading="loading" submit :disabled="zipCode.length !== 7 || (errors.zip_code && errors.zip_code.length > 0)">郵便番号から自動入力</CaButton>
          </CaFloat>
        </div>
        <div class="modalcont-line ca-inputline">
          <CaInput size="S" width="S" name="prefecture" title="都道府県" rules="required" v-model="prefecture" placeholder="都道府県"></CaInput>
          <CaInput size="S" name="city" title="市区町村" rules="required" v-model="city" placeholder="市区町村"></CaInput>
          <CaInput size="S" name="address1" title="番地" rules="required" v-model="address1" placeholder="番地"></CaInput>
          <CaInput size="S" name="address2" title="建物名・号室" v-model="address2" placeholder="建物名・号室"></CaInput>
        </div>

        <h2>その他</h2>
        <div class="modalcont-line ca-inputline">
          <CaInput :disabled="hasNoTel" width="M" size="S" name="user_tel" title="電話番号" rules="required|max:2" v-model="userTel" placeholder="080-XXXX-XXXX"></CaInput>
          <CaSwitch withHeadingSpace label="電話もってない" size="S" v-model="hasNoTel" />
        </div>
        <div class="modalcont-line ca-inputline">
          <CaInput width="M" size="S" name="user_mail" title="メールアドレス" rules="required|max:2" v-model="userMail" placeholder="メールアドレス"></CaInput>
        </div>
        <div class="modalcont-line ca-inputline">
          <CaInput size="S" width="S" name="user_age" title="年齢" textRight="歳" rules="required|numeric|max_value:120" v-model="userAge" placeholder="年齢"></CaInput>
          <CaRadioList class="space-left" required title="性別" name="user_sex" v-model="userSex" :items="radioItemsSex" size="S" float></CaRadioList>
        </div>
        <div class="modalcont-line ca-inputline"></div>
        <div class="modalcont-line ca-inputline">
          <CaInput size="S" width="S" name="user_birthday" title="生年月日" rules="numeric" v-model="userBirthday" placeholder="生年月日"></CaInput>
          <CaFloat size="S" withHeadingSpace>
            <CaCheckBox required name="user_takenoko" size="S" label="キノコよりタケノコのほうが好みです" v-model="userTakenoko"></CaCheckBox>
          </CaFloat>
        </div>

        <h2>免責事項</h2>
        <div class="modalcont-line disclaimer">
          <ul class="disclaimer-list">
            <li>
              <CaCheckBox required name="disclaimer1" size="S" label="免責についての文言免責についての文言免責についての文言免責についての文言" v-model="disclaimer1"></CaCheckBox>
            </li>
            <li>
              <CaCheckBox required name="disclaimer2" size="S" label="免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言" v-model="disclaimer2"></CaCheckBox>
            </li>
            <li>
              <CaCheckBox name="disclaimer3" size="S" label="免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言" v-model="disclaimer3"></CaCheckBox>
            </li>
          </ul>
        </div>
        <footer>
          <CaButton width="S" type="positive" @click="validate">OK</CaButton>
          <CaButton width="S" @click="close">キャンセル</CaButton>
        </footer>
      </ValidationObserver>
    </CaModalBody>
  </CaModal>
</template>

<script lang="ts">
import Vue from 'vue';
import CaSpinner from '../components/Ca-Spinner.vue';
Vue.component('CaSpinner', CaSpinner);

import { ValidationObserver } from 'vee-validate';

import CaButton from '../components/Ca-Button.vue';
import CaInput from '../components/Ca-Input.vue';
import CaInputButton from '../components/Ca-InputButton.vue';
import CaTag from '../components/Ca-Tag.vue';
import CaCheckBox from '../components/Ca-CheckBox.vue';
import CaCheckBoxList from '../components/Ca-CheckBoxList.vue';
import CaRadioList, { CaRadio } from '../components/Ca-RadioList.vue';
import CaModal from '../components/Ca-Modal.vue';
import CaModalBody from '../components/Ca-ModalBody.vue';
import CaPulldown, { CaPulldownItem } from '../components/Ca-Pulldown.vue';
import CaFloat from '../components/Ca-Float.vue';
import CaIcon from '../components/Ca-Icon.vue';
import CaSwitch from '../components/Ca-Switch.vue';

type State = {
  radioItemsSex: CaRadio[];
  loading: boolean;
  pulldownItemsPlan: CaPulldownItem[];
  hasCoupon: boolean;
  zipCode: string;
  myplan: string;
  hasNoTel: boolean;
  userNameLast: string;
  userNameFirst: string;
  userNameLastKana: string;
  userNameFirstKana: string;
  userSex: string;
  userAge: string;
  userTel: string;
  userMail: string;
  userBirthday: string;
  prefecture: string;
  city: string;
  address1: string;
  address2: string;
  userTakenoko: boolean;
  disclaimer1: boolean;
  disclaimer2: boolean;
  disclaimer3: boolean;
  couponCode: string;
};

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    ValidationObserver,
    CaButton,
    CaInput,
    CaTag,
    CaInputButton,
    CaCheckBox,
    CaCheckBoxList,
    CaRadioList,
    CaModal,
    CaModalBody,
    CaPulldown,
    CaFloat,
    CaIcon,
    CaSwitch,
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
      zipCode: '',
      myplan: '',
      hasNoTel: false,
      userNameLast: '',
      userNameFirst: '',
      userNameLastKana: '',
      userNameFirstKana: '',
      userSex: '',
      userAge: '',
      userTel: '',
      userMail: '',
      userBirthday: '',
      prefecture: '',
      city: '',
      address1: '',
      address2: '',
      userTakenoko: false,
      disclaimer1: false,
      disclaimer2: false,
      disclaimer3: false,
      couponCode: '',
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.visibleModal = true;
    // }, 1000);
  },
  methods: {
    sendDummy(num: number) {
      if (num === 1) {
        this.loading = true;
      }

      setTimeout(() => {
        if (num === 1) {
          this.loading = false;
        }
      }, 2000);
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>


<style scoped>
/* modalcont */

.modalcont h2 {
  font-size: 16px;
  font-weight: normal;
  padding: 10px 20px 10px;
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
  padding: 10px 20px 10px;
  margin: 0;
  line-height: 1.6;
  color: #888;
}

.modalcont-line.ca-inputline {
  padding: 0px 20px;
}

.modalcont footer {
  text-align: center;
  padding: 20px 0 40px;
}
.modalcont footer button {
  margin: 0 10px;
}

.btn-close-top {
  position: absolute;
  right: 32px;
  top: 32px;
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
