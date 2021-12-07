import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js';
import { fetchMeetupById } from './meetupService.js';


export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isloading: false
      ,errormessage : ''
      ,meetup : null
    }
  },

  watch: {
    meetupId(newValue, oldValue) {
      this.SelectmeetupId(newValue);
    }
  },

  methods: {
    SelectmeetupId(meetupId) {
      this.isloading = true;
      this.errormessage = '';
      this.meetup = null;
      fetchMeetupById(meetupId).then((meetup) => {
        this.meetup = meetup;
        this.isloading = false;
      },
      (e) => {
        this.isloading = false;
        this.errormessage = e.message;
      })
    }
  },

  mounted() {
    this.SelectmeetupId(this.meetupId);
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="meetup != null" :meetup="meetup"></meetup-view>

      <ui-container>
        <ui-alert v-if="isloading">Загрузка...</ui-alert>
      </ui-container>

      <ui-container>
        <ui-alert v-if="errormessage != ''">{{ errormessage }}</ui-alert>
      </ui-container>
    </div>`,
});

