<template>
  <section>
    <h1>
      <ion-icon name="skull" size="large" />
      アプリ名です
    </h1>
    <ul>
      <li v-for="i in 40" :key="i">
        <a @click="() => onSelect(i)">
          <ion-icon name="notifications-outline" />
          キタキタヌ
        </a>
      </li>
    </ul>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'ModalSideMenu',
  components: {},
  model: {
    event: 'change-open',
  },
  props: {},

  data(): State {
    return {};
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
    onClickIcon(icon: string) {
      console.log('コール', icon);
    },
    onSelect(idx: number) {
      this.$emit('select', idx);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
/* section {
  padding: 20px;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: -2px 2px 5px #eee, inset 2px -2px 5px #eee, 2px -2px 5px #eee, inset -2px 2px 5px #eee;
} */

h1 {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  color: #aaa;
}
h1 ion-icon {
  color: inherit;
  margin-right: 0.2em;
}

li {
  padding: 10px 0;
}
li a {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #999;
  font-size: 14px;
}
li ion-icon {
  color: inherit;
  margin-right: 0.2em;
}
</style>
