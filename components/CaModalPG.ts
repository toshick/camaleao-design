import Vue from 'vue';
import CaModal from './Ca-Modal.vue';
import CaModalBody from './Ca-ModalBody.vue';
import ModalConfirm from './modal/ModalConfirm.vue';
import { CreateElement } from 'vue/types/umd';

export type OpenParams = {
  component?: any;
  easyClose?: boolean;
  removeDuration?: number;
  modalTitle?: string;
  compoParams?: object;
  target?: Element | null;
};

export const open = (params: OpenParams) => {
  const p = { ...params, easyClose: params.easyClose !== false, removeDuration: params.removeDuration || 200 };
  const $el = document.createElement('article');
  const $body = params.target ? params.target : document.body;
  console.log('$body', $body, params.target);

  if ($body) {
    $body.appendChild($el);
  }

  function getRender(h: CreateElement) {
    // return [h(Sample)];
    const component = [p.component ? h(p.component, { props: { ...p.compoParams } }) : null];
    return component;
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
                  title: p.modalTitle || '',
                },
              },
              getRender(h),
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

export type OpenParamsConfirm = OpenParams & {
  confirmText?: string;
  component?: any;
  type?: 'danger';
  btnLabel?: string;
  onConfirm?: () => void;
};

export const openConfirm = (params: OpenParamsConfirm) => {
  return open({
    compoParams: {
      confirmText: params.confirmText || '',
      onConfirm: params.onConfirm || null,
      type: params.type,
      btnLabel: params.btnLabel,
    },
    component: ModalConfirm,
    modalTitle: params.modalTitle || '',
    target: params.target || null,
    // easyClose: params.easyClose || false,
  });
};

export default {
  open,
  openConfirm,
};
