<template>
  <section class="app">
    <AppHeader>
      <a class="btn-back" href=""><ion-icon name="chevron-back" size="medium" /></a>
      <h1>設定</h1>
      <a href=""><ion-icon name="restaurant-outline" size="medium" /></a>
    </AppHeader>
    <div class="setting-body">
      <div class="setting-user">
        <UserIcon url="https://avatars3.githubusercontent.com/u/6635142?s=460&v=4" />
        <p>せかいのとしっく</p>
      </div>

      <ul class="setting-menu">
        <li>
          <a href="">プライバシーポリシー</a>
        </li>
        <li>
          <a href="">本人確認</a>
        </li>
        <li>
          <a href="">ともだちリスト</a>
        </li>
        <li>
          <a href="">ログアウト</a>
        </li>
      </ul>
    </div>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import AppHeader from './AppHeader.vue';
import UserIcon from './parts/UserIcon.vue';

type State = {};

export default Vue.extend({
  name: 'AppSetting',
  components: {
    AppHeader,
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
.setting-body {
  padding: 20px;
  color: var(--chat-color-dark);
}
.setting-user {
  display: flex;
  align-items: center;
  p {
    margin-left: 1em;
  }
}
.setting-menu {
  margin-top: 20px;

  li {
    margin: 20px 0;
  }
  a {
    text-decoration: none;
    font-size: var(--fontsize-normal);
    color: var(--chat-color-dark);
  }
}
</style>
