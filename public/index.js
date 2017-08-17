'use strict'


const app = new Vue({
  el: '#app',
  data:{
    msg: 'helo',
    email: '',
    password: '',
    name: ''
  },
  methods:{
    login:function(){
      const self = this
      axios.post('http://localhost:3000/user/signin',{
        email: self.email,
        password: self.password
      })
      .then(log=>{
        console.log(log.data);
        if(log.data.token){
          const tokenJwt = log.data.token
          localStorage.setItem('token', tokenJwt)
          localStorage.setItem('id', log.data.id)
          window.location.href = 'project.html'
        }else {
          alert('login gagal')
        }
      })
      .catch(err=>{
        console.log(err);
      })
    },
    register:function(){
      const self = this
      axios.post('http://localhost:3000/user/signup',{
        name: self.name,
        email: self.email,
        password: self.password
      })
      .then(log=>{
        console.log(log);
        self.email = ''
        self.password = ''
        alert('Register Berhasil')
      })
      .catch(err=>{
        alert(err)
      })
    }
  }
})
