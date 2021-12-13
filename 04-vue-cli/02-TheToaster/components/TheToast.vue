<template>

    <div v-if="toast.type === 'success'" @click="click" class="toast toast_success">
      <ui-icon class="toast__icon" icon="check-circle" />
      <span>{{ toast.message }}</span>
    </div>

    <div v-if="toast.type === 'error'" @click="click" class="toast toast_error">
      <ui-icon class="toast__icon" icon="alert-circle" />
      <span>{{ toast.message }}</span>
    </div>
</template>

<script>
import UiIcon from './UiIcon';
import { DelToast } from '../api/func.js';

export default {
  name: 'TheToast',
  components: { UiIcon },

  props: {
    toast: {
      type: Object,
      required: true,
    },
    toasts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    click() {
      DelToast( this.toasts, this.toast );
    },
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
