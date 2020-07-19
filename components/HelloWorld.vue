<template>
  <div class="hello">
    <section>
      <article>
        <p class="heading">CaButton | size</p>
        <div class="btns">
          <CaButton size="S">送信する</CaButton>
          <CaButton>送信する</CaButton>
          <CaButton size="L">送信する</CaButton>
          <CaButton size="S" loading>送信する送信する</CaButton>
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
        <p class="heading">CaInput</p>
        <div class="ca-inputline">
          <CaInput name="mail1" title="ユーザのメールアドレス及び担当者のメールアドレス" rules="required|max:2" v-model="dummyVal" placeholder="メールアドレス"></CaInput>
          <CaInput name="mail2" title="" rules="required|max:2" v-model="dummyVal" placeholder="メールアドレス"></CaInput>
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
          <CaInput name="mail3" size="S" rules="required|max:2" v-model="dummyVal" placeholder="メールアドレス small"></CaInput>
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
      </article>
    </section>
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

type State = {
  dummyVal: string;
  dummyCheck01: boolean;
  dummyCheck02: boolean;
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
  },
  data(): State {
    return {
      dummyVal: '',
      dummyCheck01: false,
      dummyCheck02: false,
    };
  },
  methods: {
    dummyCall() {
      console.log('dummyCall');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.hello {
  font-family: Arial, Helvetica, sans-serif;
}
.heading {
  font-size: 22px;
  color: #999;
  margin: 0;
  padding: 0 0 1em;
}
</style>
