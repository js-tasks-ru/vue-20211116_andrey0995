import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
  template: `
    <ul class="agenda">
      <li v-for="agendaItem in agenda" :key="agendaItem.id" class="meetups-list__item">
        <meetup-agenda-item :agendaItem=agendaItem />
      </li>
    </ul>`,
});
