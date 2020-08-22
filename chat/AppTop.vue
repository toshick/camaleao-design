<template>
  <section class="app">
    <AppHeader>
      <h1>キタキターヌ</h1>
      <a href=""><ion-icon name="leaf-outline" size="medium" /></a>
    </AppHeader>
    <div class="top-body">
      <section>
        <div class="chara">
          <img src="../img/chat/tanu.png" class="tanu" alt="kitanu" />
          <img src="../img/chat/tanu-title.png" class="tanu-title" alt="kitanu-title" />
          <p>
            キータヌは世話焼きたぬき
            <ion-icon name="heart"></ion-icon>
            <br />
            キータヌに自分のアクティビティをみてもらおーぬ
          </p>
        </div>
        <h2>最近のアクティビティ</h2>
        <!-- リスト -->
        <AlbumList :items="albumItems" />
      </section>
    </div>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import AppHeader from './AppHeader.vue';
import AlbumList from './parts/AlbumList.vue';
import { AlbumItem } from './types/app';
import { albumItems } from './sample';

type State = {
  albumItems: AlbumItem[];
};

export default Vue.extend({
  name: 'AppTop',
  components: {
    AppHeader,
    AlbumList,
  },
  props: {},
  data(): State {
    return {
      albumItems: albumItems,
    };
  },
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.top-body {
  overflow: scroll;

  & > section {
    padding: 20px;
    background-color: #ddcd61;
    margin-top: 160px;
    background-image: url('../img/subtle-dark-vertical.png');
  }
}
.tanu {
  display: block;
  width: 157px;
  height: 181px;
  margin: 0 auto;
}
.tanu-title {
  display: block;
  width: 309px;
  height: 77px;
  margin: 10px auto 0;
}

.chara {
  margin-top: -100px;
  margin-bottom: 50px;
}

.chara {
  & > p {
    font-size: var(--fontsize-medium);
    color: #fff;
    margin: 20px auto;
    width: 260px;
  }
}
.top-body {
  position: relative;
}

h2 {
  color: var(--chat-color-dark);
  font-size: var(--fontsize-medium);
  margin-bottom: 20px;
}
</style>
