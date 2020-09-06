import Vue from 'vue';
import CaModal from './Ca-Modal.vue';
import CaModalBody from './Ca-ModalBody.vue';
import CaModalView from './Ca-ModalView.vue';
import ModalInput from './modal/ModalInput.vue';
import { CreateElement } from 'vue/types/umd';
import { Input } from './type';

export type OpenParams = {
  parentComponent?: any;
  component?: any;
  easyClose?: boolean;
  transition?: string;
  fixed?: boolean;
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
  klass?: string[];
};

export const open = (params: OpenParams) => {
  const p = { ...params, easyClose: params.easyClose !== false, removeDuration: params.removeDuration || 200, fixed: params.fixed !== false };
  const $el = document.createElement('article');
  const $body = params.target ? params.target : document.body;
  const modalCompo = params.parentComponent;

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
      attrs: { ...attrs, class: 'ca-modal-titleicon' },
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
          fixed: p.fixed,
          transition: p.transition,
          additionalKlass: p.klass,
        },
        scopedSlots: {
          default: () => {
            return h(
              modalCompo,
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

export type OpenParamsView = OpenParams & {
  confirmText?: string;
  component?: any;
  onConfirm?: () => void;
};

const openWithView = (params: OpenParamsDialog) => {
  return open({
    compoParams: {
      confirmText: params.confirmText || '',
      onConfirm: params.onConfirm || null,
      type: params.type,
      btnLabel: params.btnLabel,
      inputs: params.inputs,
    },
    component: params.component,
    modalTitle: params.modalTitle || '',
    target: params.target || null,
    titleIcon: params.titleIcon,
    easyClose: params.easyClose || false,
    fixed: params.fixed || false,
    transition: params.transition,
    removeDuration: params.removeDuration,
    parentComponent: params.parentComponent || CaModalBody,
    klass: params.klass,
  });
};

export const openDialog = (params: OpenParamsDialog) => {
  return openWithView({ ...params, parentComponent: CaModalBody, component: ModalInput, transition: 'fade' });
};

export const openView = (params: OpenParamsView) => {
  return openWithView({ ...params, parentComponent: CaModalView, transition: 'modal', removeDuration: 600 });
};

export const drillDown = (params: OpenParamsView) => {
  return openWithView({ ...params, parentComponent: CaModalView, transition: 'drilldown', removeDuration: 600 });
};

export default {
  open,
  openDialog,
  openView,
  drillDown,
};
