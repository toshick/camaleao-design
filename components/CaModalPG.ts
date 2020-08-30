import Vue from 'vue';
import CaModal from './Ca-Modal.vue';
import CaModalBody from './Ca-ModalBody.vue';
import ModalConfirm from './modal/ModalConfirm.vue';
import ModalInput from './modal/ModalInput.vue';
import { CreateElement } from 'vue/types/umd';
import { Input } from './type';

export type OpenParams = {
  component?: any;
  easyClose?: boolean;
  removeDuration?: number;
  modalTitle?: string;
  compoParams?: object;
  target?: Element | null;
  titleIcon?: {
    tag: string;
    attrs: {
      name?: string;
      size?: string;
      class?: string;
    };
  };
};

export const open = (params: OpenParams) => {
  const p = { ...params, easyClose: params.easyClose !== false, removeDuration: params.removeDuration || 200 };
  const $el = document.createElement('article');
  const $body = params.target ? params.target : document.body;

  if ($body) {
    $body.appendChild($el);
  }

  function getRender(h: CreateElement) {
    const component = [p.component ? h(p.component, { props: { ...p.compoParams } }) : null];
    return component;
  }

  function getTitleIcon(h: CreateElement) {
    if (!params.titleIcon) return null;
    const { tag, attrs } = params.titleIcon;
    return h(tag, {
      attrs: { ...attrs, class: 'ca-modal-body-titleicon' },
    });
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
                scopedSlots: {
                  titleicon: () => getTitleIcon(h),
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

export type OpenParamsDialog = OpenParams & {
  confirmText?: string;
  component?: any;
  type?: 'danger' | string;
  btnLabel?: string;
  onConfirm?: () => void;
  inputs?: Input[];
};

export const openDialog = (params: OpenParamsDialog) => {
  return open({
    compoParams: {
      confirmText: params.confirmText || '',
      onConfirm: params.onConfirm || null,
      type: params.type,
      btnLabel: params.btnLabel,
      inputs: params.inputs,
    },
    component: ModalInput,
    modalTitle: params.modalTitle || '',
    target: params.target || null,
    titleIcon: params.titleIcon,
    easyClose: params.easyClose || false,
  });
};

export default {
  open,
  openDialog,
};
