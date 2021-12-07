<template>
<div>
    <h1>主頁面</h1>歡迎！<b @click = "Login">點這裡登入</b>
</div></template> 

<script>
export default {
   methods: {
       Login () {
           this.$router.replace('/Login')
       }
   }
}</script>
