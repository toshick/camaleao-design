import { storiesOf } from '@storybook/vue';
import HelloWorld from '../sample/HelloWorld.vue';
import Chat from '../chat/Chat.vue';

storiesOf('カタログ', module)
  .add('HelloWorld', () => ({
    components: { HelloWorld },
    template: '<HelloWorld />',
  }))
  .add('チャット', () => ({
    components: { Chat },
    template: '<div class="mobileview"><Chat /></div>',
  }));
