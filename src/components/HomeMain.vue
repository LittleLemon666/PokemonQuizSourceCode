<template>
    <v-app>
        <v-app-bar color="light-blue lighten-5" height="100%" app justify-space-between>
            <v-img
                class="row-pointer"
                alt="VRRA"
                :src="require('../assets/logo.jpg')"
                max-height="50%"
                max-width="20%"
                position="center left"
                contain
                @click="HomeLogo"
            ></v-img>
            <v-col max-width="40%">
            </v-col>
            <v-col>
                <v-card flat color="light-blue lighten-5">
                    <v-row>
                        <v-col v-show="web_at!=='Home'">
                            <v-btn
                                color="blue darken-1"
                                text
                                :to="{path: '/home'}"
                                @click="Home"
                            >
                                Home
                            </v-btn>
                        </v-col>
                        <v-col v-show="web_at!=='Activity'">
                            <v-btn
                                color="blue darken-1"
                                text
                                :to="{name: 'Activity'}"
                                @click="Activity"
                            >
                                Activity
                            </v-btn>
                        </v-col>
                        <v-col v-show="web_at!=='Booking'">
                            <v-btn
                                color="blue darken-1"
                                text
                                :to="{name: 'Booking'}"
                                @click="Booking"
                            >
                                Booking
                            </v-btn>
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
                                        :key="item.title"
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
            </v-col>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template> 

<script>
export default {
    data () {
        return {
            web_at: 'Home',
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
    methods: {
        HomeLogo() {
            this.$router.replace('home').catch(()=>{})
            this.Home()
        },
        Home() {
            this.web_at = 'Home'
        },
        Activity() {
            this.web_at = 'Activity' 
        },
        Booking() {
            this.web_at = 'Booking' 
        },
        settingAction(action){
            if (action === 'user'){
                // to be fix
                this.$router.replace('signup').catch(()=>{})
                this.web_at = 'Home'
            }
            else if (action === 'logout'){
                this.$router.replace('home').catch(()=>{})
                this.web_at = 'Home'
            }
        },
   }
}</script>

<style scoped>
.row-pointer {
  cursor: pointer;
}
</style>