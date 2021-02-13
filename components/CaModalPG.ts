import Vue from 'vue';
import CaModal from './Ca-Modal.vue';
import CaModalBody from './Ca-ModalBody.vue';
import CaModalView from './Ca-ModalView.vue';
import CaModalSideMenu from './Ca-ModalSideMenu.vue';
import ModalInput from './modal/ModalInput.vue';
import { CreateElement } from 'vue/types/umd';
import { Input } from './type';

export type OpenParams = {
  parentComponent?: any;
  component?: any;
  easyClose?: boolean;
  transition?: string;
  removeDuration?: number;
  modalTitle?: string;
  compoParams?: {
    confirmText?: string;
    onConfirm?: (p: any) => void;
    btnLabel?: string;
    inputs?: Input[];
    type?: 'danger' | string;
    withCancel?: boolean;
  };
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
  on?: any;
};

export const open = (params: OpenParams) => {
  const p = {
    ...params,
    easyClose: params.easyClose !== false,
    removeDuration: params.removeDuration || 600,
    fixed: true,
  };
  const $el = document.createElement('article');
  let $body: Element = document.body;
  if (params.target) {
    $body = params.target;
    p.fixed = false;
  }

  const modalCompo = params.parentComponent;

  if ($body) {
    $body.appendChild($el);
  }

  function getRender(h: CreateElement) {
    const component = [
      p.component
        ? h(p.component, {
            props: { ...p.compoParams },
            on: {
              ...params.on,
            },
          })
        : null,
    ];
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

export const openDialog = (params: OpenParams) => {
  return open({
    ...params,
    parentComponent: CaModalBody,
    component: ModalInput,
    transition: params.transition || 'scalefade',
  });
};

export const openView = (params: OpenParams) => {
  return open({
    ...params,
    parentComponent: CaModalView,
    transition: params.transition || 'modal',
  });
};

export const drillDown = (params: OpenParams) => {
  return open({
    ...params,
    parentComponent: CaModalView,
    transition: 'drilldown',
  });
};

export const modalMenu = (params: OpenParams) => {
  return open({
    ...params,
    parentComponent: CaModalSideMenu,
    transition: 'fade',
  });
};

export default {
  open,
  openDialog,
  openView,
  drillDown,
  modalMenu,
};
