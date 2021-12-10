<template>
    <v-layout justify-end rowc>
        <v-col
            cols="12"
            rows="36"
            sm="6"
        >
        <v-date-picker
            no-title
            v-model="dates"
            input-class="datetime-picker"
            width="100%"
            :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
            :events="functionEvents"
        >
        </v-date-picker>
        </v-col>
    </v-layout>
</template> 

<script>
export default {
    data () {
        return {
            search_text: '',
            setting_items: [{
                title: 'User info',
                action: 'user'
            },
            {
                title: 'Sign out',
                action: 'logout'
            }],
            arrayEvents: null,
            dates: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        };
    },
    mounted () {
      this.arrayEvents = [...Array(6)].map(() => {
        const day = Math.floor(Math.random() * 30)
        const d = new Date()
        d.setDate(day)
        return d.toISOString().substr(0, 10)
      })
    },
    methods: {
        functionEvents (date) {
            const [,, day] = date.split('-')
            if ([12, 17, 28].includes(parseInt(day, 10))) return true
            if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
            return false
        },
   }
}</script>

<style>
.content .banner {
    margin-left:280px;
    width: 100%;
    height: 200px;
    background-size:cover;
}

.content .banner div {
    display: inline-block;
}
</style>