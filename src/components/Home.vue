<template>
    <v-app>
        <div class="m-header">
            <v-layout justify-space-between rowt>
                    <div class="picture">
                        <img src="../assets/logo.jpg" class="bar_picture">
                    </div>
                    <v-card flat>
                        <v-row>
                            <v-col>
                                <a @click = "Activity">Activity</a>
                            </v-col>
                            <v-col>
                                <a @click = "Booking">Booking</a>
                            </v-col>
                            <v-col>
                                <div>
                                    <v-toolbar
                                        rounded
                                        width=300
                                        dense
                                    >
                                        <v-text-field
                                            flat
                                            solo
                                            dense
                                            hide-details
                                            v-model="search_text"
                                        ></v-text-field>

                                        <v-btn
                                            icon
                                            class="hidden-xs-only"
                                        >
                                        <v-icon>mdi-magnify</v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </div>
                            </v-col>
                            <v-col>
                                <v-menu
                                    left
                                    bottom
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-cog</v-icon>
                                    </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item
                                            v-for="item in setting_items"
                                            :key="item"
                                            @click="settingAction(item.action)"
                                        >
                                            <v-list-item-title>
                                                {{ item.title }}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-card>
            </v-layout>
            <component :is="currentTab" keep-alive></component>
        </div>
        <div class="m-content">
            <v-layout justify-end rowc>
                <v-date-picker
                    no-title
                    v-model="dates"
                    :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
                    :events="functionEvents"
                >
                </v-date-picker>
            </v-layout>
        </div>
    </v-app>
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
        Activity () {
           this.$router.replace('/Activity')
        },
        Booking() {
            this.$router.replace('/Booking')  
        },
        settingAction(action){
            if (action === 'user'){
                // to be fix
                this.$router.replace('Signup')
            }
            else if (action === 'logout'){
                this.$router.replace('/')
            }
        },
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