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
            <router-view @Login="Login" @Logout="Logout" @Save="Save" @Reserve="Reserve" @Saving="Saving" @FetchRoomByDateInterval="FetchRoomByDateInterval" @CancelRoom="CancelRoom" @fetchRoomByActivity="fetchRoomByActivity"/>
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
                  //let data = '{"State":"1","Type":"LOGIN"}\n{"State":"0","Type":"LOGIN"}'
                  //console.log(data);
                  data = data.split(/\r?\n/);
                  //console.dir(this.messages);
                  this.receiver_messages = [];
                  for (let i = 0; i < data.length; i++) {
                        let msg = JSON.parse(data[i]);
                        this.receiver_messages.push(msg);
                        console.log(msg);
                  }

                  for (let i = 0; i < data.length; i++) {
                       if (this.receiver_messages[i].Type === 'LOGIN') {
                              this.source_page.loginResponse(this.receiver_messages[i].State, this.receiver_messages[i].FirstName, this.receiver_messages[i].SecondName, this.receiver_messages[i].UserMail);
                        }
                        else if (this.receiver_messages[i].Type === 'REGISTER') {
                              this.source_page.saveResponse(this.receiver_messages[i].State);
                        }
                        else if (this.receiver_messages[i].Type === 'USEREDIT') {
                              this.source_page.editResponse(this.receiver_messages[i].State);
                        }
                        else if (this.receiver_messages[i].Type === 'RENTROOM') {
                              this.source_page.reserveResponse(this.receiver_messages[i].State);
                        }
                        else if (this.receiver_messages[i].Type === 'EDITROOM') {
                              this.source_page.saveInfoResponse(this.receiver_messages[i].State);
                        }
                        else if (this.receiver_messages[i].Type === 'FETCHRDI') {
                              this.source_page.fetchRoomByTomeIntervalResponse(this.receiver_messages[i].SetDate, this.receiver_messages[i].Data);
                        }
                        else if (this.receiver_messages[i].Type === 'CANCELROOM') {
                              this.source_page.cancelResponse(this.receiver_messages[i].State);
                        }
                        else if (this.receiver_messages[i].Type === 'FetchRoomByActivity') {
                              this.source_page.fetchRoomByDateIntervalResponse(this.receiver_messages[i].Data);
                        }
                  }
                  //console.log(this.receiver_messages)
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
            Logout() {
                  this.ws.close();
                  this.ws = null;
                  this.connectToWebsocket();
            },
            Save(sourcePage, userMail, account, firstName, secondName, password, fromSite) {
                  this.source_page = sourcePage;
                  console.log("send ");
                  let json_sf = ''
                  if (fromSite === 'login')
                        json_sf = JSON.stringify({Type: 'REGISTER', UserMail: userMail, Account: account, FirstName: firstName, SecondName: secondName, Password: password})
                  else
                        json_sf = JSON.stringify({Type: 'USEREDIT', FirstName: firstName, SecondName: secondName, Password: password})
                  console.log(json_sf);
                  if(this.ws.readyState === 1) {
                        this.ws.send(json_sf);
                  }
            },
            Reserve(sourcePage, roomInfo) {
                  this.source_page = sourcePage;
                  let invites = []
                  if (roomInfo.emails)
                        invites = roomInfo.emails.split(',');
                  console.log("send ");
                  let json_sf = JSON.stringify({Type: 'RENTROOM', Room: roomInfo.roomType, Theme: roomInfo.theme, Chairperson: roomInfo.chairperson, Date: roomInfo.date, TimeStart: roomInfo.timeStart, TimeEnd: roomInfo.timeEnd, Invites: invites, Agenda: roomInfo.agenda, Note: roomInfo.notes})
                  console.log(json_sf);
                  if(this.ws.readyState === 1) {
                        this.ws.send(json_sf);
                  }
            },
            Saving(sourcePage, roomInfo) {
                  this.source_page = sourcePage;
                  let invites = roomInfo.emails.split(',');
                  console.log("send ");
                  let json_sf = JSON.stringify({Type: 'EDITROOM', Room: roomInfo.roomType, Theme: roomInfo.theme, Chairperson: roomInfo.chairperson, Date: roomInfo.date, TimeStart: roomInfo.timeStart, TimeEnd: roomInfo.timeEnd, Invites: invites, Agenda: roomInfo.agenda, Note: roomInfo.notes})
                  console.log(json_sf);
                  if(this.ws.readyState === 1) {
                        this.ws.send(json_sf);
                  }
            },
            FetchRoomByDateInterval(sourcePage, dateBegin, dateEnd) {
                  this.source_page = sourcePage;
                  console.log("send ");
                  let json_sf = JSON.stringify({Type: 'FETCHRDI', DateBegin: dateBegin, DateEnd: dateEnd})
                  console.log(json_sf);
                  if(this.ws.readyState === 1) {
                        this.ws.send(json_sf);
                  }
            },
            CancelRoom(sourcePage, roomInfo) {
                  this.source_page = sourcePage;
                  console.log("send ");
                  let json_sf = JSON.stringify({Type: 'CANCELROOM', Date: roomInfo.date, TimeStart: roomInfo.timeStart, TimeEnd: roomInfo.timeEnd})
                  console.log(json_sf);
                  if(this.ws.readyState === 1) {
                        this.ws.send(json_sf);
                  }
            },
            fetchRoomByActivity(sourcePage) {
                  this.source_page = sourcePage;
                  console.log("send ");
                  let json_sf = JSON.stringify({Type: 'FETCHRAC', DateAfter: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)})
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
