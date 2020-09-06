import Vue from 'vue';
import CaToast from './Ca-Toast.vue';
import { CreateElement } from 'vue/types/umd';
import { Input } from './type';

export type OpenParams = {
  text: string;
  icon?: string;
  duration?: number;
  target?: Element | null;
  klass?: string[];
};

export const open = (params: OpenParams) => {
  let $holder = document.querySelector('.toast-holder');
  if (!$holder) {
    $holder = document.createElement('div');
    $holder.classList.add('toast-holder');
  }

  const $el = document.createElement('div');
  $holder.prepend($el);

  const $body = params.target ? params.target : document.body;

  if ($body) {
    $body.appendChild($holder);
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
      return h(CaToast, {
        props: {
          text: params.text,
          klass: params.klass,
          icon: params.icon,
          duration: params.duration,
        },
        on: {
          close() {
            self.visible = false;
            setTimeout(() => {
              self.$destroy();
            }, 800);
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

// export type OpenParamsDialog = OpenParams & {
//   confirmText?: string;
//   component?: any;
//   type?: 'danger' | string;
//   btnLabel?: string;
//   onConfirm?: () => void;
//   inputs?: Input[];
// };

// const openWithView = (params: OpenParamsDialog) => {
//   return open({
//     compoParams: {
//       confirmText: params.confirmText || '',
//       onConfirm: params.onConfirm || null,
//       type: params.type,
//       btnLabel: params.btnLabel,
//       inputs: params.inputs,
//     },
//     component: params.component,
//     modalTitle: params.modalTitle || '',
//     target: params.target || null,
//     titleIcon: params.titleIcon,
//     easyClose: params.easyClose || false,
//     fixed: params.fixed || false,
//     transition: params.transition,
//     removeDuration: params.removeDuration,
//     parentComponent: params.parentComponent || CaModalBody,
//     klass: params.klass,
//   });
// };

export default {
  open,
};
