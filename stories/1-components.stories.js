import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { storiesOf, addParameters } from '@storybook/vue';

import MyButton from '../components/Ca-Button.vue';

// export default {
//   title: 'Button',
// };

storiesOf('components', module).add('MyButton', () => ({
  components: { MyButton },
  template: `<MyButton >Hello Buttonです</MyButton>`,
}));

// export const Text = () => ({
//   components: { MyButton },
//   template: '<my-button @click="action">Hello Button</my-button>',
//   methods: { action: action('clicked') },
// });

// export const Jsx = () => ({
//   components: { MyButton },
//   render(h) {
//     return <my-button onClick={this.action}>With JSX</my-button>;
//   },
//   methods: { action: linkTo('clicked') },
// });

// export const Emoji = () => ({
//   components: { MyButton },
//   template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
//   methods: { action: action('clicked') },
// });
