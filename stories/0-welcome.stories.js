import { storiesOf } from '@storybook/vue';
import HelloWorld from '../sample/HelloWorld.vue';

storiesOf('カタログ', module).add('HelloWorld', () => ({
  components: { HelloWorld },
  template: '<HelloWorld />',
}));
