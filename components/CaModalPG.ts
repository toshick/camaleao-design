import Vue from 'vue';
import CaModal from './Ca-Modal.vue';
import CaModalBody from './Ca-ModalBody.vue';
import { CreateElement } from 'vue/types/umd';

export type OpenParams = {
  component: any;
  easyClose?: boolean;
  removeDuration?: number;
};

export const open = (params: OpenParams) => {
  const p = { ...params, easyClose: params.easyClose !== false, removeDuration: params.removeDuration || 200 };
  const $el = document.createElement('article');
  const $body = document.body;
  if ($body) {
    $body.appendChild($el);
  }

  const vm = new Vue({
    el: $el,
    props: {
      visible: {
        default: true,
        type: Boolean,
      },
    },
    beforeDestroy() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    render(h: CreateElement) {
      const self: any = this;
      return h(CaModal, {
        props: {
          easyClose: p.easyClose,
        },
        scopedSlots: {
          default: () => {
            return h(
              CaModalBody,
              {
                props: {
                  fit: true,
                },
              },
              [h(p.component)],
            );
          },
        },
        on: {
          close() {
            self.visible = false;
            setTimeout(() => {
              self.$destroy();
            }, p.removeDuration);
          },
        },
        directives: [
          {
            name: 'show',
            value: self.visible,
          },
        ],
      });
    },
  });

  return vm;
};

export default {
  open,
};
