import Vue from 'vue';
Vue.config.ignoredElements = ['ion-icon'];

import { storiesOf } from '@storybook/vue';
import '../components/install';
import HelloWorld from '../sample/HelloWorld.vue';

storiesOf('カタログ', module).add('HelloWorld', () => ({
  components: { HelloWorld },
  template: '<HelloWorld />',
}));
