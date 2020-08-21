import Vue from 'vue';
Vue.config.ignoredElements = ['ion-icon'];

import { storiesOf } from '@storybook/vue';
import '../components/install';
import HelloWorld from '../sample/HelloWorld.vue';
import AppTop from '../chat/AppTop.vue';
import AppSetting from '../chat/AppSetting.vue';
import AppAlbum from '../chat/AppAlbum.vue';
import AppAlbumList from '../chat/AppAlbumList.vue';

import Chat from '../chat/Chat.vue';

storiesOf('カタログ', module).add('HelloWorld', () => ({
  components: { HelloWorld },
  template: '<HelloWorld />',
}));

const chatitems = [];
chatitems.push({
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'そんなときはジンガで呼吸を整えるんだッ',
  username: 'スネークのすけ',
  postdate: '2020-03-01',
  fukitype: 'fuki3',
});
chatitems.push({
  iconurl: 'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg',
  text: '初弾を手動で排莢していたな。考え方はおかしくない。だが聞きかじっただけの行為を実戦で試すもんじゃない',
  username: 'カマキチのすけ',
  postdate: '2020-03-01',
});
chatitems.push({
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'そんなときはジンガで呼吸を整えるんだッ\nそんなときはジンガで呼吸を整えるんだッ',
  username: 'スネークのすけ',
  postdate: '2020-03-01',
  fukitype: 'fuki4',
});
chatitems.push({
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: '追いこまれた狐はジャッカルより凶暴だ！！ https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg',
  username: 'スネークのすけ',
  postdate: '2020-03-01',
});
chatitems.push({
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'スネーク、俺達は政府や誰かの道具じゃない\n戦うことでしか自分を表現できなかったが、いつも自分の意志で戦ってきた。',
  username: 'グレイフォックスのすけ',
  postdate: '2020-03-01',
  fukitype: 'fuki2',
});

const infoitems = [];
infoitems.push({
  text: '来れる人は1230に第二リフト乗り場下のレストランに集合だぞ',
  username: 'カマタロー',
  postdate: '2020-03-01',
});
infoitems.push({
  text: '旅行の代金はカマタローが集めます。',
  username: 'カマタロー',
  postdate: '2020-03-01',
});
infoitems.push({
  text: '宿の夕飯は18時かららしいヨ宿の夕飯は18時かららしいヨ',
  username: 'カマタロー',
  postdate: '2020-03-01',
});

storiesOf('キータヌ', module).add('チャット', () => ({
  components: { Chat, AppTop, AppSetting, AppAlbum, AppAlbumList },
  template: `<main class="appviews">
  <div class="mobileview"><AppTop /></div>
  <div class="mobileview"><Chat :chatitems="chatitems" :infoitems="infoitems" /></div>
  <div class="mobileview"><AppSetting /></div>
  <div class="mobileview"><AppAlbumList /></div>
  <div class="mobileview"><AppAlbum /></div>
  <div class="mobileview-des">
    ・リアルタイムにアルバムを構築していく<br>
    ・リアルタイムにアルバムを構築していく
  </div>

  
  
    </main>`,

  data: () => {
    return {
      chatitems,
      infoitems,
    };
  },
}));
