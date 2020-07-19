import { storiesOf } from '@storybook/vue';
import HelloWorld from '../components/HelloWorld.vue';

storiesOf('カタログ', module).add('HelloWorld', () => ({
  components: { HelloWorld },
  template: '<HelloWorld />',
}));
