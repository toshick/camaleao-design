import { render, screen, fireEvent, cleanup } from '@testing-library/vue';
import Chat from '../Chat.vue';

describe('Chat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    cleanup();
  });
  test('タイトル default', async () => {
    const { queryByText } = render(Chat);
    expect(queryByText('むだい')).toBeTruthy();
  });
  test('タイトル 指定', async () => {
    const { queryByText } = render(Chat, {
      props: {
        title: 'にゃんきち',
      },
    });
    expect(queryByText('にゃんきち')).toBeTruthy();
  });
  describe('レンダー infoitems', () => {
    const infoitem = {
      text: 'インフォテキスト',
      username: 'カマタロー',
      postdate: '2020-03-01',
    };

    [...Array(3)].forEach((_, index) => {
      test(`インフォ ${index + 1}個`, () => {
        const infoitems = [...Array(index + 1)].map(() => {
          return { ...infoitem };
        });
        const { container } = render(Chat, {
          props: {
            infoitems,
          },
        });
        const $li = container.querySelectorAll('.chatinfo li');
        expect($li.length).toBe(index + 1);
      });
    });
  });
  describe('レンダー chatitems', () => {
    const chatitem = {
      iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
      text: 'そんなときはジンガで呼吸を整えるんだッ\nそんなときはジンガで呼吸を整えるんだッ',
      username: 'スネークのすけ',
      postdate: '2020-03-01',
      fukitype: 'fuki4',
    };

    [...Array(3)].forEach((_, index) => {
      test(`chatitem ${index + 1}個`, () => {
        const chatitems = [...Array(index + 1)].map(() => {
          return { ...chatitem };
        });
        const { container } = render(Chat, {
          props: {
            chatitems,
          },
        });
        const $li = container.querySelectorAll('.chatitem');
        expect($li.length).toBe(index + 1);
      });
    });
  });
});
