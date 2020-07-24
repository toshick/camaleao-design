<template>
  <div class="hello">
    <section>
      <a class="icon icon-cross btn-close-top"></a>
      <article>
        <p class="heading">CaButton | size</p>
        <div class="btns">
          <CaButton size="S" @click="visibleModal = true">モーダル開く</CaButton>
          <CaButton @click="visibleModalUser = true">ユーザ情報入力</CaButton>
          <CaButton size="L" @click="visibleModal = true">モーダル開く</CaButton>
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
          <CaSwitch label="スイッチオン" size="S" />
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
          <CaPulldown title="プルダウン" name="pull01" size="S" v-model="dummyRadio01" :items="pulldownItems"></CaPulldown>
          <CaPulldown withHeadingSpace name="pull01" v-model="dummyRadio01" :items="pulldownItems"></CaPulldown>

          <CaFloat withHeadingSpace> せんたく {{ dummySelect }} </CaFloat>
        </div>

        <p class="shell">ラジオ {{ dummyRadio01 }}</p>
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

    <!-- モーダル -->
    <CaModal v-if="visibleModal" @close="visibleModal = false">
      <CaModalBody class="modalcont" title="1984">
        <div class="modalcont-img">
          <img src="https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-06-13_18.48.53-1592041744904.jpeg" alt="" />
        </div>
        <div class="modalcont-line">
          1950年代に発生した核戦争を経て、1984年現在、世界はオセアニア、ユーラシア、イースタシアの3つの超大国によって分割統治されている。さらに、間にある紛争地域をめぐって絶えず戦争が繰り返されている。作品の舞台となるオセアニアでは、思想・言語・結婚などあらゆる市民生活に統制が加えられ、物資は欠乏し、市民は常に「テレスクリーン」と呼ばれる双方向テレビジョン、さらには町なかに仕掛けられたマイクによって屋内・屋外を問わず、ほぼすべての行動が当局によって監視されている。
        </div>
        <div class="modalcont-line ca-inputline">
          <CaInput width="M" size="S" name="tanto_tel" title="担当者の電話番号" rules="required|max:2" v-model="dummyVal" placeholder="メールアドレス"></CaInput>
          <CaPulldown title="プルダウン" name="pull01" size="S" v-model="dummyRadio01" :items="pulldownItems"></CaPulldown>
          <CaSwitch withHeadingSpace label="スイッチオン" size="S" />
          <CaFloat withHeadingSpace>
            <CaButton size="S" @click="sendDummy(1)" :loading="loading1" submit>送信する</CaButton>
          </CaFloat>
        </div>
        <div class="modalcont-line ca-inputline">
          <CaInput size="S" width="S" name="tanto_age" title="担当者の年齢" textRight="歳" rules="numeric" v-model="dummyVal" placeholder="年齢"></CaInput>
          <CaInput size="S" width="S" name="tanto_year" title="年度" textRight="年" rules="numeric" v-model="dummyVal" placeholder="年度"></CaInput>
          <CaFloat size="S" withHeadingSpace>
            <CaCheckBox name="check01" size="S" label="チェックボックス01" v-model="dummyCheck01"></CaCheckBox>
          </CaFloat>
          <CaFloat withHeadingSpace>
            <CaButton size="S" @click="sendDummy(1)" :loading="loading1" text>送信する</CaButton>
          </CaFloat>
        </div>
        <p class="modalcont-line">
          オセアニアに内属しているロンドンに住む主人公ウィンストン・スミスは、真理省の役人として日々歴史記録の改竄作業を行っていた。物心ついたころに見た旧体制やオセアニア成立当時の記憶は、記録が絶えず改竄されるため、存在したかどうかすら定かではない。ウィンストンは、古道具屋で買ったノートに自分の考えを書いて整理するという、禁止された行為に手を染める。ある日の仕事中、抹殺されたはずの3人の人物が載った過去の新聞記事を偶然に見つけたことで、体制への疑いは確信へと変わる。「憎悪週間」の時間に遭遇した同僚の若い女性、ジューリアから手紙による告白を受け、出会いを重ねて愛し合うようになる。また、古い物の残るチャリントンという老人の店（ノートを買った古道具屋）を見つけ、隠れ家としてジューリアと共に過ごした。さらに、ウインストンが話をしたがっていた党内局の高級官僚の1人、オブライエンと出会い、現体制に疑問を持っていることを告白した。エマニュエル・ゴールドスタインが書いたとされる禁書をオブライエンより渡されて読み、体制の裏側を知るようになる。
        </p>
      </CaModalBody>
    </CaModal>

    <!-- モーダル user -->
    <CaModal v-if="visibleModalUser" @close="visibleModalUser = false">
      <CaModalBody class="modalcont" title="ユーザ情報入力">
        <div class="modalcont-line">
          あなたのユーザ情報を入力してみてね
        </div>
        <h2>希望プラン</h2>
        <div class="modalcont-line ca-inputline">
          <CaPulldown name="pull01" v-model="dummyRadio01" :items="pulldownItemsPlan"></CaPulldown>
          <CaSwitch label="クーポンコードを持っている" />
        </div>
        <h2>氏名</h2>
        <div class="modalcont-line ca-inputline">
          <CaInput width="S" size="S" name="tanto_tel" title="氏名（漢字）" rules="required" v-model="dummyVal" placeholder="姓"></CaInput>
          <CaInput width="S" size="S" name="tanto_tel" title="" rules="required" v-model="dummyVal" placeholder="名"></CaInput>
          <CaInput width="S" size="S" name="tanto_tel" title="氏名（カナ）" rules="required" v-model="dummyVal" placeholder="セイ" class="space-left"></CaInput>
          <CaInput width="S" size="S" name="tanto_tel" title="" rules="required" v-model="dummyVal" placeholder="メイ"></CaInput>
        </div>

        <h2>住所</h2>
        <div class="modalcont-line ca-inputline">
          <CaInput width="S" size="S" name="tanto_tel" title="郵便番号" rules="required|numeric|length:7" v-model="dummyVal" placeholder="郵便番号"></CaInput>
          <CaFloat withHeadingSpace>
            <CaButton size="S" @click="sendDummy(1)" :loading="loading1" submit>郵便番号から自動入力</CaButton>
          </CaFloat>
        </div>
        <div class="modalcont-line ca-inputline">
          <CaInput size="S" name="tanto_tel" title="都道府県" rules="required" v-model="dummyVal" placeholder="都道府県"></CaInput>
          <CaInput size="S" name="tanto_tel" title="市区町村" rules="required" v-model="dummyVal" placeholder="市区町村"></CaInput>
        </div>
        <div class="modalcont-line ca-inputline">
          <CaInput size="S" name="tanto_tel" title="番地" rules="required" v-model="dummyVal" placeholder="番地"></CaInput>
          <CaInput size="S" name="tanto_tel" title="建物名・号室" rules="required" v-model="dummyVal" placeholder="建物名・号室"></CaInput>
        </div>

        <h2>その他</h2>
        <div class="modalcont-line ca-inputline">
          <CaInput width="M" size="S" name="tanto_tel" title="電話番号" rules="required|max:2" v-model="dummyVal" placeholder="080-XXXX-XXXX"></CaInput>
          <CaInput width="M" size="S" name="tanto_tel" title="メールアドレス" rules="required|max:2" v-model="dummyVal" placeholder="メールアドレス"></CaInput>
          <CaSwitch withHeadingSpace label="スイッチオン" size="S" />
        </div>
        <div class="modalcont-line ca-inputline">
          <CaRadioList title="性別" name="radio01" v-model="dummyRadio01" :items="radioItemsSex" size="S" float></CaRadioList>
        </div>
        <div class="modalcont-line ca-inputline">
          <CaInput size="S" width="S" name="tanto_age" title="年齢" textRight="歳" rules="numeric" v-model="dummyVal" placeholder="年齢"></CaInput>
        </div>
        <div class="modalcont-line ca-inputline">
          <CaInput size="S" width="S" name="tanto_year" title="生年月日" rules="numeric" v-model="dummyVal" placeholder="生年月日"></CaInput>
          <CaFloat size="S" withHeadingSpace>
            <CaCheckBox name="check01" size="S" label="キノコよりタケノコのほうが好みです" v-model="dummyCheck01"></CaCheckBox>
          </CaFloat>
        </div>

        <h2>免責事項</h2>
        <div class="modalcont-line disclaimer">
          <ul class="disclaimer-list">
            <li>
              <CaCheckBox name="check01" size="S" label="免責についての文言免責についての文言免責についての文言免責についての文言" v-model="dummyCheck01"></CaCheckBox>
            </li>
            <li>
              <CaCheckBox name="check01" size="S" label="免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言" v-model="dummyCheck01"></CaCheckBox>
            </li>
            <li>
              <CaCheckBox name="check01" size="S" label="免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言免責についての文言" v-model="dummyCheck01"></CaCheckBox>
            </li>
          </ul>
        </div>
      </CaModalBody>
    </CaModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CaSpinner from '../components/Ca-Spinner.vue';
Vue.component('CaSpinner', CaSpinner);

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
  dummyVal: string;
  dummyCheck01: boolean;
  dummyCheck02: boolean;
  dummyRadio01: string;
  dummySelect: CaPulldownItem | null;
  radioItems: CaRadio[];
  radioItemsSex: CaRadio[];
  visibleModal: boolean;
  visibleModalUser: boolean;
  loading1: boolean;
  pulldownItems: CaPulldownItem[];
  pulldownItemsPlan: CaPulldownItem[];
};

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
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
      dummyVal: '',
      dummyCheck01: false,
      dummyCheck02: false,
      dummyRadio01: '',
      radioItems: [
        { label: 'アンドロイドは電気羊の夢を見るか', value: '001' },
        { label: 'いいにおいのおならをうるおとこ', value: '002' },
        { label: 'カモメに飛ぶことを教えた猫', value: '003' },
      ],
      radioItemsSex: [
        { label: '男性', value: 'male' },
        { label: '女性', value: 'female' },
      ],
      visibleModal: false,
      visibleModalUser: false,
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
      dummySelect: null,
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.visibleModal = true;
    // }, 1000);
  },
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

section {
  /* padding: 10px 0 20px; */
}
article {
  padding: 10px 20px;
}
article > button {
  margin-right: 20px;
}
.btns > button {
  margin-bottom: 20px;
  margin-right: 20px;
}

.heading {
  font-size: 26px;
  color: #999;
  margin: 0;
  padding: 0 0 1em;
}
.shell {
  padding: 10px;
  background-color: #333;
  color: #ddd;
  border-radius: 3px;
  font-size: 12px;
}

/* modalcont */

.modalcont h2 {
  font-size: 16px;
  font-weight: normal;
  padding: 4px 20px 0;
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
