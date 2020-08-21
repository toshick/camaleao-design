<template>
  <section class="app">
    <AppHeader>
      <a class="btn-back" href=""><ion-icon name="chevron-back" size="medium" /></a>
      <h1>アルバムリスト</h1>
      <a class="btn-header" href=""><ion-icon name="build-outline" size="medium" /></a>
    </AppHeader>
    <div class="album-body">
      <div class="album-body-head">
        <p class="album-text-des">アルバムだよ</p>
        <CaButton size="S" @click="validate">新規作成</CaButton>
      </div>
      <div class="album-item" v-for="(i, index) in 4" :key="`item${index}`">
        <img src="https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg" alt="" />
        <div class="album-item-body">
          <h2>2020.02.22</h2>
          <p>みんなで東北へいってきたよ。</p>
        </div>
      </div>
    </div>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import UserIcon from './parts/UserIcon.vue';

type State = {};

export default Vue.extend({
  name: 'AppAlbumList',
  components: {
    AppHeader,
    AppFooter,
    UserIcon,
  },
  props: {},
  data(): State {
    return {};
  },
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.album-body {
  overflow: scroll;
  padding: 20px;
}
.album-body-head {
  display: flex;
  align-items: center;
  line-height: 1;
  margin: 0 0 20px;
  button {
    margin-left: auto;
  }
}
.album-text-des {
  font-size: var(--fontsize-normal);
}
.album-item {
  display: flex;
  position: relative;
  margin: 0 0 10px;
  color: #333;
  h2 {
    margin-bottom: 0.3em;
    font-size: var(--fontsize-large);
    line-height: 1;
  }
  p {
    font-size: var(--fontsize-normal);
  }

  img {
    display: block;
    width: 40%;
    height: 100px;
    border-radius: 6px;
    flex-grow: 0;
    margin-right: 10px;
  }
}
.album-item-body {
}
</style>
