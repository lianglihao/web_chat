<template>
  <div class="about">
    <ul id="messages">
      <li v-for="(item) in oldMsgList" :key="item.index">{{item}}</li>
    </ul>
    <form action="" onkeydown="if(event.keyCode==13)return false;">
      <input id="m" autocomplete="off" v-model="inputValue" />
      <input type="button" value="Send" @click="send" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      oldMsgList:['大家好','你好'],
      newMsgList: {},
      inputValue: '',
      socket: null,
      userName: ''
    }
  },
  created: function() {
    var that = this;
    this.userName = this.$route.query.userName;
    console.log(this.$route.query.userName);
    this.socket = io("http://localhost:3000");
    console.log(this.socket);
    if(sessionStorage.getItem('userName') == null){
      console.log('首次登录，发送登录信息');
      this.socket.emit('login', that.userName);
      sessionStorage.setItem('userName',this.userName);
    }else {
      console.log('已登录，无需再次发送登录信息');
    }
  },
  methods:{
    send: function(e) {
      console.log(123);
      console.log(this.inputValue);
      this.socket.emit('chat_message',this.inputValue);
      this.inputValue = '';
    },
  },
  mounted(){
    var that = this;
    this.socket.on('chat_message', function(msg) {
      that.oldMsgList.push(msg);
    });
    this.socket.on('loginNews', function(data) {
      console.log(data);
      that.oldMsgList.push(`可爱的${data}上线啦`);
    })
  }
}
</script>

<style scoped>
#messages{
  list-style-type: none;
  padding-inline-start: 0px;
} 
.about{
  width: 500px;
    height: 500px;
    background-color: pink;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
}
</style>
