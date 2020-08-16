<template>
  <section class="app">
    <AppHeader />
    <div class="top-body">
      <div class="chara">
        <img src="../img/chat/tanu.png" class="tanu" alt="kitanu" />
        <img src="../img/chat/tanu-title.png" class="tanu-title" alt="kitanu-title" />
        <p>
          キータヌは世話焼きたぬき
          <br />
          キータヌに自分のアクティビティをみてもらおう
        </p>
      </div>
    </div>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import AppHeader from './AppHeader.vue';

type State = {};

export default Vue.extend({
  name: 'AppTop',
  components: {
    AppHeader,
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
.tanu {
  display: block;
  width: 157px;
  height: 181px;
  margin: 0 auto;
}
.tanu-title {
  display: block;
  width: 187px;
  height: 77px;
  margin: 10px auto 0;
}

.chara {
  margin-top: -100px;
}

.chara > p {
  font-size: var(--fontsize-medium);
  color: #fff;
  margin: 20px auto;
  width: 260px;
}
.top-body {
  position: relative;
  background-color: #ddcd61;
  margin-top: 160px;
  background-image: url('../img/subtle-dark-vertical.png');
}
</style>
