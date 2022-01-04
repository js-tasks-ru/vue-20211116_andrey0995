<template>
  <div class="image-uploader">
    <label 
      class= "image-uploader__preview =" 
      :class= "{'image-uploader__preview-loading': uploading}" 
      :style= "url">
      <span class="image-uploader__text">{{ StateTextComp }}</span>
      <!-- 
Если убрать строчку
:value = "valueForInput"
Все работает корректно но тесты вадпют ошибку
 × UiImageUploader должен сбрасывать value у input при удалении выбранного изображения (10 ms)
 × UiImageUploader должен сбрасывать value у input когда изображение не удалось загрузить через uploader (8 ms
       -->
      <input :type = "type" 
             accept = "image/*" 
             :value = "valueForInput"
             v-bind="$attrs"
             class = "image-uploader__input"
             ref="inpiut"
             @[myEvent].prevent = "changeSelect();"
           >
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  emits: ['remove','select', 'upload', 'error' ],
  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function
    },
  },
  data() {
    return {
      uploading: false,
      selectedFile : undefined,
/*
Данное свойство для реальной работы не нужно. Все корректно работает если вместо него использовать preview
Но тесты выдают ошибки.
 × UiImageUploader должен иметь текст на Загрузить изображение после удаления изображения из preview (6 ms)
    Expected substring: "Загрузить изображение"
    Received string:    "\"Удалить изображение\""

Вообще в этой задаче работающий алгоритм в браузере сделал быстро.
Но многие тесты не работали. Приходилось экспериментировать. Спрашивал у коллег, которые учились со мной у всех те же проблемы. 
Это первый тест, в котором такая ситуация.
 
*/      
      myPreview : undefined,
    }
  },
  computed: {
    url() {
      return !!this.myPreview ? '--bg-url: url(' + this.myPreview + ')' : '';
    },
    myEvent() {
      if ( this.uploading || !!this.selectedFile || !!this.myPreview ) 
        return 'click';
      else 
        return 'change';
    },
    valueForInput() {
      return this.myPreview || this.selectedFile;
    },
    type() {
      /**
       Такой непонятный код сделан исключительно для тестов.
       Если в шаблоне убрать строчку
             :value = "valueForInput"
       То данный код не нужен тип все время может быть 'file' и в браузере все корректно работает,
       Но тесты не проходят.
       Если оставить строчку 
             :value = "valueForInput"
       То без этого кода если тип 'file' и есть значение value генерируются ошибки.

       */
      if ( this.uploading || !!this.selectedFile || !!this.myPreview ) 
        return undefined;
      else 
        return 'file';
    },
    StateTextComp() {
      if ( this.uploading ) 
        return '"Загрузка..."';
      else if ( !!this.valueForInput )  
        return '"Удалить изображение"';
      else   
        return '"Загрузить изображение"';
    },
  },
  methods: {
    changeSelect() {
      if ( this.uploading) return;
      if ( !!this.valueForInput )  
        this.removeVile();
      else  
        this.selectFile();
    },
    removeVile() {
      this.$emit('remove');
      this.selectedFile = undefined;
      this.myPreview = undefined;
    },
    selectFile( ) {
      let elInput = this.$refs['inpiut'];
      this.value = elInput.value;
      let FileName = elInput.files[0];
      this.selectedFile = URL.createObjectURL( FileName ); 
      this.$emit('select', FileName );
      if ( this.uploader ) {
        this.uploading = true;
        this.uploader( FileName ).then(
          (r) => { 
            this.uploading = false; 
            this.$emit('upload', r );
           },
           (e) => {
            this.uploading = false; 
            this.selectedFile = undefined;
            this.myPreview = undefined;
            this.$emit('error', e );
           });
      } else {
        this.uploading = false;
      }
    },
  },
  created() {
    this.myPreview = this.preview;
  },
  watch: {
    preview( newValue, oldValue ) {
      this.myPreview = newValue;
    }
  },
};

</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
