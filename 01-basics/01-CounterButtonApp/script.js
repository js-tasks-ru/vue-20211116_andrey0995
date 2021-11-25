 import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const RootComp = defineComponent({
    name: 'glRoot',
    // Реактивные данные приложения, его локальное состояние
    data() {
      return {
        CountClick: 0
      }
    }
  
});


// Создаём новое счетчик нажатий на кнопку
const app = createApp( RootComp );

// Монтируем приложение на странице
// Возвращается публичный экземпляр корневого компонента
const Btn = app.mount( "#app" );

// Добавляем vm в глобальные переменные для простой отладки в консоли браузера
window.Btn = Btn;


