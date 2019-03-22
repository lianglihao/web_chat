<template>
    <div class="home">
        <div class="login">
            <router-link :to="{path:'/test'}">进入测试</router-link>
            <label for="userName">请输入用户名：</label><input id="userName" type="text" v-model="userName">
            <input type="button" @click="login" value="登录聊天室">
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {

  },
  data() {
    return {
      userName: '',
    }
  },
  methods: {
    login(){
      var that = this;
      this.$router.push({
        path:'/about',
        query:{
          userName: that.userName
        }
      });
    }
  }
}
</script>

<style scoped>
.login{
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
.login input,button{
    width: 100px;
    margin-bottom: 10px;
}
</style>
