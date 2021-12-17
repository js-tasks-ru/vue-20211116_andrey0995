<template>
  <div class="toasts">
    <t-toast v-for="item in toasts" :toast="item"  @remove="del_toast(item)"/>  
  </div>
</template>

<script>
import tToast from './TheToast.vue';

function DelToast( toaster, toast ) {
  toaster.del_toast( toast );
}

export default {
  name: 'TheToaster',
  
  components: { tToast },

  data() {
     return {
       toasts : [],
     }
  },
  methods: {
    del_toast( toast ) {
      var index = this.toasts.indexOf( toast );
        if ( index > -1 ) {
          this.toasts.splice(index, 1);
        }
    },
    add_toast( message, type ) {
      var toast = {
       message: message,
       type: type,
      }
      this.toasts.push( toast );
      setTimeout( DelToast, 5000, this, toast );
    },
    success(message) {
      this.add_toast( message, 'success' );
    },
    error(message) {
      this.add_toast( message, 'error' );
    },

  },  
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

</style>
