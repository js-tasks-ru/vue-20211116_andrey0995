import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const RootComp = defineComponent({
    name: 'glCalck',
    // Реактивные данные приложения, его локальное состояние
    data() {
      return {
        P1: 0
        ,P2: 0
        ,Oper: 'sum'
      }
    },
    computed: {
      Result() {
        try {
          const p1 = parseFloat(this.P1);
          const p2 = parseFloat(this.P2);
          switch( this.Oper ) {
            case 'sum': return p1 + p2;
            case 'subtract': return p1 - p2;
            case 'multiply': return p1 * p2;
            case 'divide': return p1 / p2;
          }
          return 0;
        } catch (e) {
          return e.message;
        }
      }
    }
  
});


// Создаём новое счетчик нажатий на кнопку
const app = createApp( RootComp );

// Монтируем приложение на странице
// Возвращается публичный экземпляр корневого компонента
const Calck = app.mount( "#app" );

// Добавляем vm в глобальные переменные для простой отладки в консоли браузера
// window.Calck = Calck;


