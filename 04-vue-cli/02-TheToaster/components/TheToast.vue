<template>

    <div @click="click" :class= "toast.type === 'success' ? 'toast toast_success' : 'toast toast_error'" >
      <ui-icon class="toast__icon" :icon= "toast.type === 'success' ? 'check-circle' : 'alert-circle'" />
      <span>{{ toast.message }}</span>
    </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'TheToast',
  components: { UiIcon },

  props: {
    toast: {
      type: Object,
      required: true,
    },
  },
  methods: {
    click() {
      this.$emit('click_toast', this.toast );
    },
  }
};
</script>

<style scoped>

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
