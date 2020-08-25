<template>
  <section class="app">
    <AppHeader>
      <a class="btn-back" href=""><ion-icon name="chevron-back" size="medium" /></a>
      <h1>アルバムリスト</h1>
      <a class="btn-header" @click="editing = !editing">
        <ion-icon name="restaurant-outline" size="medium" v-if="!editing" />
        <span v-else>完了</span>
      </a>
    </AppHeader>
    <div :class="myClass">
      <div class="album-body-head">
        <p class="album-text-des">アルバムだよ</p>
        <CaButton size="S" @click="create">新規作成</CaButton>
      </div>
      <!-- リスト -->
      <AlbumList :items="albumItems" :editing="editing" />
    </div>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import AlbumList from './parts/AlbumList.vue';
import { AlbumItem } from './types/app';
import { albumItems } from './sample';

type State = {
  albumItems: AlbumItem[];
  editing: boolean;
};

export default Vue.extend({
  name: 'AppAlbumList',
  components: {
    AppHeader,
    AppFooter,
    AlbumList,
  },
  computed: {
    myClass(): any {
      const klass: any = { 'album-body': true };

      if (this.editing) {
        klass['-editing'] = true;
      }
      return klass;
    },
  },
  props: {},
  data(): State {
    return {
      albumItems,
      editing: false,
    };
  },
  mounted() {},
  methods: {
    selectItem() {},
    create() {},
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.album-body {
  overflow: scroll;
  padding: 20px;
  &.-editing {
    .album-body-head {
      display: none;
    }
  }
}
.album-body-head {
  display: flex;
  align-items: center;
  line-height: 1;
  margin: 0 0 20px;
  color: var(--chat-color-dark);
  button {
    margin-left: auto;
  }
}
.album-text-des {
  font-size: var(--fontsize-normal);
}
</style>
