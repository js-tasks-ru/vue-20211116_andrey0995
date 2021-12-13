export function DelToast( toasts, toast ) {
 var index = toasts.indexOf(toast);
  if ( index > -1 ) {
    toasts.splice(index, 1);
  }
}
