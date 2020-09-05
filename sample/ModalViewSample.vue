<template>
  <ValidationObserver tag="form" v-slot="{ invalid }" class="form">
    <CaModalScroll>
      <CaModalHeader title="タイトルである" @close="close">
        <!-- icons -->
        <div class="ca-modalview-header-icons">
          <a class="btn-action" @click.stop.prevent="() => onClickIcon(i)" v-for="i in icons" :key="i"><ion-icon :name="i" size="medium" /></a>
          <a class="btn-action" @click.stop.prevent="close" :disabled="invalid">保存</a>
        </div>
      </CaModalHeader>
      <div class="ca-modalview-body">
        <div class="ca-inputline">
          <CaInput width="L" name="mail2" title="" rules="required|max:2" v-model="dummyVal" placeholder="担当者のメールアドレス"></CaInput>
        </div>
        <div class="ca-inputline">
          <CaButton @click="close">とじる</CaButton>
        </div>

        <ul>
          <li v-for="i in 40" :key="i">キタキターヌ</li>
        </ul>
      </div>
    </CaModalScroll>
  </ValidationObserver>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { ValidationObserver } from 'vee-validate';

type State = {
  icons: string[];
  dummyVal: string;
};

export default Vue.extend({
  name: 'UserInfoForm',
  components: { ValidationObserver },
  model: {
    prop: 'isOpen',
    event: 'change-open',
  },
  props: {
    msg: String,
    isOpen: Boolean,
  },

  data(): State {
    return {
      icons: ['map-outline', 'rainy-outline'],
      dummyVal: '',
    };
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
    onClickIcon(icon: string) {
      console.log('コール', icon);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.ca-modalview-body {
  padding: 20px;
  overflow: scroll;
}

.form {
  width: 100%;
  height: 100%;
}

.btn-action[disabled] {
  opacity: 0.4;
}
li {
  border-top: solid 1px #aaa;
  padding: 10px;
}
</style>
