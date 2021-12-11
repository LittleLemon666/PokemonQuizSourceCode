<template>
      <div id="app">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css">
            
            <!-- https://material.io/resources/icons/?style=baseline -->
            <link href="https://fonts.googleapis.com/css2?family=Material+Icons"
                  rel="stylesheet">

            <!-- https://material.io/resources/icons/?style=outline -->
            <link href="https://fonts.googleapis.com/css2?family=Material+Icons+Outlined"
                  rel="stylesheet">

            <!-- https://material.io/resources/icons/?style=round -->
            <link href="https://fonts.googleapis.com/css2?family=Material+Icons+Round"
                  rel="stylesheet">

            <!-- https://material.io/resources/icons/?style=sharp -->
            <link href="https://fonts.googleapis.com/css2?family=Material+Icons+Sharp"
                  rel="stylesheet">

            <!-- https://material.io/resources/icons/?style=twotone -->
            <link href="https://fonts.googleapis.com/css2?family=Material+Icons+Two+Tone"
                  rel="stylesheet">
            <!--img src="./assets/logo.png"-->
            <router-view @Login="Login"/>
      </div>
</template>

<script>
export default {
      name: 'App',
      data () {
            return {
                  ws: null,
                  serverUrl: "ws://localhost:8080/ws",
                  receiver_messages: [''],
                  sender_messages: '',
                  source_page: null
            };
      },
      mounted: function() {
            this.connectToWebsocket()
      },
      methods: {
            connectToWebsocket() {
                  this.ws = new WebSocket( this.serverUrl );
                  this.ws.addEventListener('open', (event) => { this.onWebsocketOpen(event) });
                  this.ws.addEventListener('message', (event) => { this.handleNewMessage(event) });
            },
            onWebsocketOpen() {
                  console.log("connected to WS!");
            },
            handleNewMessage(event) {
                  let data = event.data;
                  console.log(data)
                  data = data.split(/\r?\n/);
                  console.log(data)
                  //console.dir(this.messages);
                  this.receiver_messages = [];
                  for (let i = 0; i < data.length; i++) {
                        let msg = JSON.parse(data[i]);
                        this.receiver_messages.push(msg);
                  }
                  console.log(this.receiver_messages)
                  if (this.receiver_messages.Type === 'LOGIN') {
                        this.source_page.loginResponse(this.receiver_messages.State);
                  }
            },
            Login(sourcePage, userAccount, userPassword) {
                  this.source_page = sourcePage;
                  console.log("send ");
                  let json_sf = JSON.stringify({Type: 'LOGIN', User: userAccount, Password: userPassword})
                  console.log(json_sf);
                  if(this.ws.readyState === 1) {
                        this.ws.send(json_sf);
                  }
            },
            sendMessage(d) {
                  this.sender_messages = d;
                  console.log("send ");
                  console.log(d);
                  console.log(JSON.stringify({Type: this.sender_messages}));
                  if(this.ws.readyState === 1 && this.sender_messages !== "") {
                        this.ws.send(JSON.stringify({Type: this.sender_messages}));
                        this.sender_messages = "";
                  }
            }
      }
}
</script>

<style>
#app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
}
</style>
