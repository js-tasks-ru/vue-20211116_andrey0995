<template>
  <ui-input :type="type"  v-model="strValue"  v-bind="$attrs">
    <template v-for="slotName of Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>  
   </ui-input>
</template>

<script>
import UiInput from './UiInput';
export default {
  name: 'UiInputDate',
  components: { UiInput },
  emits: ['update:modelValue'],
  props: {
    type : {
      type : String,
      default : 'date'
    },
    modelValue: { 
     type: Number
    },
  },
  methods: {
    checkSlots() {
      return Boolean(this.$slots['left-icon']) || Boolean(this.$slots['right-icon']);
    },
  },  
  computed: {
    _dtISOSStr() {
      return new Date(this.modelValue).toISOString();
    },
    _dateStr() {
      return this._dtISOSStr.split('T')[0];
    },
    _timeStr() {
      return this._dtISOSStr.split('T')[1].split('.')[0];;
    },
    _msecontUTC() {
      return (new Date().getTimezoneOffset() * 60 * 1000 );
    },
    strValue: {
      get() {
        if ( this.modelValue == null )
          return '';
        var date = new Date(this.modelValue);
        if ( this.type === 'date' )
          return this._dateStr;
        else if ( this.type === 'time' )
          return this._timeStr.substr(0,5);
        else
          return this._dtISOSStr.split('.')[0];
      },
      set(Value) {
        if  ( !Value )
          this.$emit('update:modelValue', null );
        else if ( this.type === 'date' )  
          this.$emit('update:modelValue', Date.parse( Value + 'T' + this._timeStr ) - this._msecontUTC);
        else if ( this.type === 'time' )   
          this.$emit('update:modelValue', Date.parse( this._dateStr + 'T' + Value) - this._msecontUTC );
        else
          this.$emit('update:modelValue', Date.parse(Value) - this._msecontUTC);
      }
    }
  },
};
</script>
