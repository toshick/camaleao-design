<template>
  <section class="app">
    <AppHeader />
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
<style scoped>
.setting-body {
  padding: 20px;
}
.setting-menu a {
  color: #666;
  text-decoration: none;
}
</style>
