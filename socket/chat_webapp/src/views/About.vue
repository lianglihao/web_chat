<template>
  <div class="about">
    <div id="left">
      <div>当前在线人数{{userNum}}</div>
      <p v-for="(item) in users" :key="item.index">{{item}}</p>
    </div>
    <div class="right">
      <div id="messages">
        <p v-for="(item) in oldMsgList" :key="item.index">{{item.name}}:{{item.msg}}</p>
      </div>
      <form action="" onkeydown="if(event.keyCode==13)return false;">
        <input id="m" autocomplete="off" @keyup.enter="send" v-model="inputValue" />
        <input type="button" value="Send" @click="send" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      oldMsgList: [{
        name: '1',
        msg: 'hello'
      },
      {
        name: '2',
        msg: 'world'
      }
      ],
      newMsgList: [],
      inputValue: '',
      socket: null,
      userName: '',
      userNum: 0,
      users: []
    }
  },
  created: function() {
    sessionStorage.setItem('status',1);
    var status = sessionStorage.getItem('status');
    this.$nextTick(() => {
      document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
    });
    var that = this;
    this.userName = this.$route.query.userName;
    console.log(this.$route.query.userName);
    this.socket = io(`http://139.199.206.151:3000?userName=${that.userName}`);
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
      this.socket.emit('chat_message',{name:this.userName,msg:this.inputValue});
      this.inputValue = '';
    },
    // beforeunloadHandler (e) {
    //   // window.open("https://www.cnblogs.com/lijshui/p/7451360.html");
    //   this.socket.emit('userLogout',this.userName);  
    // }
  },
  mounted(){
    // window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    var that = this;
    this.socket.on('chat_message', function(msg) {
      that.oldMsgList.push(msg);
    });
    this.socket.on('loginNews', function(data) {
      that.$message({
        message: `迷人的${data}上线啦`,
        center: true
      });
    });
    this.socket.on("userNum", (num) => {
      that.userNum = num;
    });
    this.socket.on("users", (users) => {
      that.users = users;
    });
  },
  watch: {
    oldMsgList() {
      this.$nextTick(() => {
        document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
      });
    },
    users() {
      this.$nextTick(() => {
        document.getElementById('left').scrollTop = document.getElementById('left').scrollHeight;
      });
    }
  },
  beforeRouteLeave(to,from,next)  {
    if(this.socket){
      this.socket.close();
      next();
    }
  },
  destroyed:function() {
    
  },
  // updated() {
  //   window.open("https://www.cnblogs.com/lijshui/p/7451360.html");  
  // }
}
</script>

<style scoped>
#messages{
  box-sizing: border-box;
  height: 400px;
  width: 300px;
  background-color: aliceblue;
  overflow: auto;
} 
.about{
  width: 500px;
  height: 500px;
  background-color: pink;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-around;
  align-items: center;
}
#left{
  height: 423px;
  width: 150px;
  background-color: aliceblue;
}
</style>
