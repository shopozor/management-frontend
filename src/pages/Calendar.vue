<template>
  <div>
    <calendar-view
      :show-date="showDate"
      class="theme-default holiday-us-traditional holiday-us-official">
      <calendar-view-header
        slot="header"
        slot-scope="t"
        :header-props="t.headerProps"
        @input="setShowDate" />
</calendar-view>
  </div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
require('vue-simple-calendar/static/css/default.css')
require('vue-simple-calendar/static/css/holidays-us.css')

export default {
  name: 'Calendar',
  data () {
    return { showDate: new Date() }
  },
  components: [CalendarView, CalendarViewHeader]
}
</script>
