import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',
  props: {
    organizer: {
      type: String
      ,required: true
    },    
    place: {
      type: String
      ,required: true
    }, 
    date: {
      type: Number
      ,required: true
    }, 
  },
  methods: {
    formatAsLocalDate(timestamp) {
      return new Date(timestamp).toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    formatAsLocalDateYYYYMMDD(timestamp) {
      var date = new Date(timestamp)
      var d = date.getDate();
      var m = date.getMonth() + 1; // Month from 0 to 11
      var y = date.getFullYear();
      return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    },
  },
  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="formatAsLocalDateYYYYMMDD(date)">{{ formatAsLocalDate(date) }}</time>
      </li>
    </ul>`,
});
