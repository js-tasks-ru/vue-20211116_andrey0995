<template>

    <div @click="click" class = "toast" :class= '{ toast_success: issuccess, toast_error: iserror}' >
<!--      <ui-icon class="toast__icon" :icon= '{"check-circle": issuccess, "alert-circle": iserror}' /> -->
      <ui-icon class="toast__icon" :icon= "icon" />
      <span>{{ toast.message }}</span>
    </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'tToast',
  components: { UiIcon },
  emits: ['click'],
  props: {
    toast: {
      type: Object,
      required: true,
    },
  },
  computed: {
    issuccess() {
      return this.toast.type === 'success';
    },
    iserror() {
      return this.toast.type === 'error';
    },
    icon() {
      if ( this.issuccess )  
        return 'check-circle';
      else if ( this.iserror )  
        return 'alert-circle';
      return null;  
    }
  },
  methods: {
    click() {
      this.$emit('remove' );
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
