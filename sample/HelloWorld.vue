<template>
  <div class="hello">
    <section>
      <a class="icon icon-cross btn-close-top"></a>
      <article class="modal-user">
        <CaButton @click="openModalView">openModalView</CaButton>
        <CaButton @click="openInput">openInput</CaButton>
        <CaButton @click="openConfirm">openDialog</CaButton>
        <CaButton @click="visibleModalValidation = true">モーダルバリデーション {{ visibleModalValidation }}</CaButton>
        <CaButton @click="visibleModalUser = true">ユーザ情報入力のモーダルがでます</CaButton>
      </article>
      <article class="previewblock"></article>
      <article>
        <p class="heading">CaDrumroll</p>
        <div class="ca-inputline">
          <CaFloat>誕生日を選択してください</CaFloat>
          <CaDrumroll width="S" :items="drumrollItemsYear" required placeholder="年" v-model="birthYear"></CaDrumroll>
          <CaDrumroll width="S" :items="drumrollItemsMonth" required placeholder="月" v-model="birthMonth"></CaDrumroll>
          <CaDrumroll width="S" :items="drumrollItemsDate" required placeholder="日" v-model="birthDate"></CaDrumroll>
          <CaFloat>
            <p class="shell">誕生日: {{ birthYear }}/{{ birthMonth }}/{{ birthDate }}</p>
          </CaFloat>
        </div>

        <div class="ca-inputline">
          <CaDrumroll width="S" size="S" :items="drumrollItemsYear" required title="あなたが最初にカメレオンを見た日をおしえてくださいカマ" v-model="birthYear2"></CaDrumroll>
          <CaDrumroll width="M" size="S" :items="drumrollItemsMonth" required withHeadingSpace v-model="birthMonth2"></CaDrumroll>
          <CaDrumroll size="S" :items="drumrollItemsDate" required withHeadingSpace v-model="birthDate2"></CaDrumroll>
        </div>
      </article>
      <article>
        <p class="heading">CaButton | size</p>
        <div class="btns">
          <CaButton size="S">スモールボタン</CaButton>
          <CaButton>通常ボタン</CaButton>
          <CaButton size="L" @click="visibleModal = true">ラージボタン</CaButton>
          <CaButton size="S" loading>モーダル開く</CaButton>
        </div>
        <div class="btns">
          <CaButton size="M" width="S">width S</CaButton>
          <CaButton size="M" width="L">width L</CaButton>
        </div>
      </article>
      <article>
        <p class="heading">CaButton | positive</p>
        <CaButton type="positive">編集する</CaButton>
        <CaButton type="positive" width="L">決定する</CaButton>
      </article>
      <article>
        <p class="heading">CaButton | danger</p>
        <CaButton type="danger">削除する</CaButton>
        <CaButton type="danger">削除して閉じる</CaButton>
      </article>

      <article>
        <p class="heading">CaTag</p>
        <div class="ca-taglist">
          <CaTag @click="dummyCall">タイプ</CaTag>
          <CaTag type="yellow" @click="dummyCall">タイプyellow</CaTag>
          <CaTag type="red" @click="dummyCall">タイプred</CaTag>
          <CaTag type="green">タイプgreen</CaTag>
        </div>
      </article>

      <article>
        <p class="heading">CaSwitch</p>
        <div class="ca-taglist">
          <CaSwitch label="スイッチオン" />
        </div>
      </article>

      <article>
        <p class="heading">CaInput</p>

        <div class="ca-inputline">
          <CaInput name="mail1" title="ユーザのメールアドレス及び担当者のメールアドレス" rules="required|max:2" v-model="dummyVal" placeholder="ユーザのメールアドレス"></CaInput>
          <CaInput name="mail2" title="" rules="required|max:2" v-model="dummyVal" placeholder="担当者のメールアドレス"></CaInput>
          <CaInputButton withHeadingSpace>アドレスを送信</CaInputButton>
          <CaInputButton withHeadingSpace loading>アドレスを送信</CaInputButton>
        </div>
        <div class="ca-inputline">
          <CaInput width="L" name="tanto_tel" title="担当者の電話番号" rules="required|max:2" v-model="dummyVal" placeholder="メールアドレス"></CaInput>
          <CaInput name="tanto_contact" title="担当者の連絡先" rules="" v-model="dummyVal" placeholder="メールアドレス"></CaInput>
          <CaInput width="S" name="tanto_age" title="担当者の年齢" textRight="歳" rules="" v-model="dummyVal" placeholder="年齢"></CaInput>
          <CaInput width="S" name="tanto_year" title="年度" textRight="年" rules="numeric" v-model="dummyVal" placeholder="年度"></CaInput>
        </div>

        <div class="ca-inputline">
          <CaInput name="mail3" size="S" rules="required|max:2" v-model="dummyVal" placeholder="メールアドレス small"></CaInput>
          <CaInputButton size="S">送信</CaInputButton>
          <CaSwitch label="スイッチオン" size="S" />
          <CaInput width="S" size="S" name="tanto_year" textRight="年" rules="numeric" v-model="dummyVal" placeholder="年度"></CaInput>
        </div>
        <div class="ca-inputline">
          <CaInput title="スモールタイトル付き" name="mail3" size="S" rules="required|max:2" v-model="dummyVal" placeholder="メールアドレス small"></CaInput>
          <CaInputButton size="S" withHeadingSpace loading>送信</CaInputButton>
        </div>
      </article>

      <article>
        <p class="heading">CaCheckBox</p>

        <CaCheckBoxList title="チェックボックス">
          <CaCheckBox name="check01" label="チェックボックス01" v-model="dummyCheck01"></CaCheckBox>
          <CaCheckBox name="check02" label="チェックボックス02" required v-model="dummyCheck02"></CaCheckBox>
        </CaCheckBoxList>
        <p class="shell">チェックボックス check01（{{ dummyCheck01 }}） check02（{{ dummyCheck02 }}）</p>
      </article>

      <article>
        <p class="heading">CaRadioList</p>

        <CaRadioList title="ラジオのリスト" name="radio01" v-model="dummyRadio01" :items="radioItems"></CaRadioList>

        <p class="shell">ラジオ {{ dummyRadio01 }}</p>
      </article>

      <article>
        <p class="heading">CaPulldown</p>

        <div class="ca-inputline">
          <CaPulldown rules="required" title="プルダウン" name="pull01" size="S" v-model="dummyPulldown01" :items="pulldownItems"></CaPulldown>
          <CaPulldown rules="required" withHeadingSpace name="pull02" v-model="dummyPulldown02" :items="pulldownItems"></CaPulldown>

          <CaFloat withHeadingSpace>
            <p class="shell">プルダウン1（{{ dummyPulldown01 }}）　プルダウン2（{{ dummyPulldown02 }}）</p>
          </CaFloat>
        </div>
      </article>
      <article>
        <p class="heading">CaIcon</p>

        <div class="ca-inputline">
          <CaIcon type="check" size="S" />
          <CaIcon type="check" />
          <CaIcon type="check" size="L" />
        </div>
      </article>
    </section>

    <!-- モーダル user -->
    <UserInfoForm v-model="visibleModalUser" />
    <ModalValidation v-model="visibleModalValidation" />
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import CaSpinner from '../components/Ca-Spinner.vue';
Vue.component('CaSpinner', CaSpinner);

import { ValidationObserver } from 'vee-validate';

import { CaPulldownItem } from '../components/Ca-Pulldown.vue';
import { CaDrumrollItem } from '../components/Ca-Drumroll.vue';
import CaButton from '../components/Ca-Button.vue';
import CaModalPG from '../components/CaModalPG';
// sample
import UserInfoForm from '../sample/UserInfoForm.vue';
import ModalValidation from '../sample/ModalValidation.vue';
import ModalContSample from '../sample/ModalContSample.vue';
import { Input, FormReturn } from '../components/type';

type State = {
  dummyVal: string;
  dummyCheck01: boolean;
  dummyCheck02: boolean;
  dummyRadio01: string;
  dummyPulldown01: string;
  dummyPulldown02: string;
  radioItems: CaRadio[];
  visibleModal: boolean;
  visibleModalUser: boolean;
  visibleModalValidation: boolean;

  loading1: boolean;
  pulldownItems: CaPulldownItem[];
  pulldownItemsPlan: CaPulldownItem[];
  drumrollItems: CaDrumrollItem[];
  drumrollItemsYear: CaDrumrollItem[];
  drumrollItemsMonth: CaDrumrollItem[];
  drumrollItemsDate: CaDrumrollItem[];

  birthYear: string;
  birthMonth: string;
  birthDate: string;
  birthYear2: string;
  birthMonth2: string;
  birthDate2: string;
};

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    ValidationObserver,
    // sample
    UserInfoForm,
    ModalValidation,
  },
  data(): State {
    return {
      dummyVal: '',
      dummyCheck01: false,
      dummyCheck02: false,
      dummyRadio01: '',
      radioItems: [
        { label: 'アンドロイドは電気羊の夢を見るか', value: '001' },
        { label: 'いいにおいのおならをうるおとこ', value: '002' },
        { label: 'カモメに飛ぶことを教えた猫', value: '003' },
      ],

      visibleModal: false,
      visibleModalUser: false,
      visibleModalValidation: false,
      loading1: false,
      pulldownItems: [
        { value: 'キック1', label: 'ケイシャーダ' },
        { value: 'キック2', label: 'アルマーダ' },
        { value: 'キック3', label: 'コンパッソ' },
      ],
      pulldownItemsPlan: [
        { value: 'plan01', label: 'ビギナーズプラン' },
        { value: 'plan02', label: 'スダンダードプラン' },
        { value: 'plan03', label: 'コンテンポラリープラン' },
      ],
      drumrollItems: Array.from(Array(20)).map((_, idx: number) => {
        return { value: `plan${idx}`, label: `カメレオン${idx}` };
      }),
      drumrollItemsYear: Array.from(Array(100)).map((_, idx: number) => {
        const val = 1900 + idx;
        return { value: `${val}`, label: `${val}年` };
      }),
      drumrollItemsMonth: Array.from(Array(12)).map((_, idx: number) => {
        const val = 1 + idx;
        return { value: `${val}`, label: `${val}月` };
      }),
      drumrollItemsDate: Array.from(Array(31)).map((_, idx: number) => {
        const val = 1 + idx;
        return { value: `${val}`, label: `${val}日` };
      }),

      dummyPulldown01: '',
      dummyPulldown02: '',

      birthYear: '1999',
      birthMonth: '3',
      birthDate: '30',

      birthYear2: '',
      birthMonth2: '',
      birthDate2: '',
    };
  },
  mounted() {},
  methods: {
    dummyCall() {
      console.log('dummyCall');
    },
    sendDummy(num: number) {
      if (num === 1) {
        this.loading1 = true;
      }

      setTimeout(() => {
        if (num === 1) {
          this.loading1 = false;
        }
      }, 3000);
    },
    openModalView() {
      const $t = document.querySelector('.previewblock') || null;
      CaModalPG.openView({
        modalTitle: 'モーダルのビューです',
        confirmText: 'なんだかしらんけどよろしいですか？なんだかしらんけどよろしいですか？',
        btnLabel: 'さくじょ',
        type: 'danger',
        onConfirm: () => {
          console.log('いえす');
        },
        target: $t,
        titleIcon: {
          tag: 'ion-icon',
          attrs: {
            name: 'heart',
          },
        },
        fixed: false,
      });
    },
    openInput() {
      const inputs: Input[] = [];
      inputs.push({
        name: 'eventname',
        value: '',
        // title: 'イベント名',
        placeholder: 'イベント名',
        width: 'M',
        rules: 'required',
      });

      const $t = document.querySelector('.previewblock') || null;
      CaModalPG.openDialog({
        modalTitle: 'なんか入力しよーネ',
        confirmText: 'イベント名を決定しよう',
        btnLabel: '確定',
        onConfirm: (res: FormReturn[]) => {
          console.log('いえす', res);
        },
        target: $t,
        titleIcon: {
          tag: 'ion-icon',
          attrs: {
            name: 'heart',
          },
        },
        inputs,
        fixed: false,
      });
    },
    openConfirm() {
      const $t = document.querySelector('.previewblock') || null;
      CaModalPG.openDialog({
        modalTitle: '確認しますヨ',
        confirmText: 'なんだかしらんけどよろしいですか？なんだかしらんけどよろしいですか？',
        btnLabel: 'さくじょ',
        type: 'danger',
        onConfirm: () => {
          console.log('いえす');
        },
        target: $t,
        titleIcon: {
          tag: 'ion-icon',
          attrs: {
            name: 'heart',
          },
        },
        fixed: false,
      });
    },
    openCustom() {
      const self = this;
      const Sample = {
        template: `<div class="custommodal"><h1>あほおいえうりえ</h1><button @click="closeCustom">とじる</button></div>`,
        methods: {
          closeCustom() {
            self.ddd();
          },
        },
      };
      CaModalPG.open({
        component: Sample,
        modalTitle: 'ほーほけきょ',
        titleIcon: {
          tag: 'ion-icon',
          attrs: {
            name: 'heart',
          },
        },
        fixed: false,
      });
    },
    ddd() {
      console.log('ddd');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss">
html {
  font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
}

ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.hello > section > article {
  padding: 10px 20px;

  & > button {
    margin-right: 20px;
  }
}

.btns > button {
  margin-bottom: 20px;
  margin-right: 20px;
}

.heading {
  font-size: 36px;
  color: #999;
  margin: 0;
  padding: 1em 0 0.5em;
}
.shell {
  padding: 10px;
  background-color: #333;
  color: #ddd;
  border-radius: 3px;
  font-size: 12px;
}

.btn-close-top {
  position: absolute;
  right: 32px;
  top: 32px;
}

.space-left {
  margin-left: 2em;
}

.modal-user {
  text-align: center;
  padding: 40px;
}
.custommodal {
  border: solid 1px #ff0000;
  width: 500px;
  padding: 30px;
}
.previewblock {
  position: relative;

  box-shadow: 0 0 1px 1px rgba(#333, 0.2);
  width: 500px;
  height: 600px;
}
</style>
