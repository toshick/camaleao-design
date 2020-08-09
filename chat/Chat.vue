<template>
  <section>
    <header>
      <img class="chat-usericon" src="https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg" alt="" />
      <p class="chat-username">キャットのすけ</p>
    </header>
    <div class="chat-body">
      <ul>
        <li v-for="(i, index) in items" :key="`${index}-${i.text}`">
          <ChatComment :myitem="i" :opposite="index % 2 === 1" />
        </li>
      </ul>
    </div>

    <footer>
      <div class="footer-icon"></div>
      <div class="footer-icon"></div>
      <div class="footer-icon"></div>
      <div class="footer-input">
        <input type="text" placeholder="書く" />
      </div>
      <div class="footer-icon"></div>
    </footer>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ChatComment, { ChatCommentType } from './ChatComment.vue';

type State = {};

const items: ChatCommentType[] = [];
items.push({
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'そんなときはジンガで呼吸を整えるんだッ',
  username: 'スネークのすけ',
  postdate: '2020-03-01',
  fukitype: 'fuki3',
});
items.push({
  iconurl: 'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg',
  text: '初弾を手動で排莢していたな。考え方はおかしくない。だが聞きかじっただけの行為を実戦で試すもんじゃない',
  username: 'カマキチのすけ',
  postdate: '2020-03-01',
});
items.push({
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'そんなときはジンガで呼吸を整えるんだッ\nそんなときはジンガで呼吸を整えるんだッ',
  username: 'スネークのすけ',
  postdate: '2020-03-01',
  fukitype: 'fuki4',
});
items.push({
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: '追いこまれた狐はジャッカルより凶暴だ！！ https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg',
  username: 'スネークのすけ',
  postdate: '2020-03-01',
});
items.push({
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'スネーク、俺達は政府や誰かの道具じゃない\n戦うことでしか自分を表現できなかったが、いつも自分の意志で戦ってきた。',
  username: 'グレイフォックスのすけ',
  postdate: '2020-03-01',
  fukitype: 'fuki2',
});

export default Vue.extend({
  name: 'Chat',
  components: {
    ChatComment,
  },
  props: {
    msg: String,
  },
  data(): State {
    return {
      items: items.concat(items),
    };
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
section {
  position: relative;
  display: grid;
  grid-template-rows: min-content auto min-content;

  overflow: hidden;

  padding: 0;
  background-image: url('../img/subtle-dark-vertical.png');
  background-color: var(--chat-bg-color);
  height: 100%;
}
input {
  outline: none;
  color: #666;
}

.chat-body {
  overflow: scroll;
}
.chat-body ul {
  padding: 10px 0 30px;
}

header {
  position: relative;
  display: flex;
  align-items: center;
  /* background-color: var(--chat-base-color); */
  background: linear-gradient(var(--chat-base-color) 60%, var(--chat-base-color2) 0%);
  padding: 6px 10px;
}

header .chat-usericon {
  margin-right: 0.5em;
}
header p {
  color: #fff;
  font-size: 12px;
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(var(--chat-base-color) 50%, var(--chat-base-color2) 0%);

  padding: 0 10px;
  height: 50px;
}

.footer-icon {
  --icon-size: 34px;
  width: var(--icon-size);
  height: var(--icon-size);
  border-radius: calc(var(--icon-size) / 2);
  background-color: #fff;
}
.footer-input input {
  height: 34px;
  border-radius: 4px;
  border: solid 1px var(--chat-base-color);
  padding: 0 10px;
}
</style>
