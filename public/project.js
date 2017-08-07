'use strict'

const app = new Vue({
  el: '#app',
  data:{
    msg:'hai',
    list_project:[],
    task_list: [],
    tag: ''
  },
  methods:{
    addTag:function(){
      const self = this
      axios.post(`http://localhost:3000/user/${localStorage.getItem('id')}`,{
        tag: self.tag
      },
      {
        headers:{
          token: localStorage.getItem('token')
          }
      })
      .then(log=>{
        const obj = {}
        obj.name = self.tag
        obj.count = 0
        self.list_project.push(obj)
        self.tag = ''
        console.log(log);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    viewTask: function(name){
      localStorage.setItem('tag', name)
      window.location.href = 'task.html'
    },
    removeProject: function(name){
      const self = this
      const newData = self.list_project.filter(function(tag){
          if(tag.name != name) return tag
      })

      self.list_project = newData

      console.log(newData);
      axios.put(`http://localhost:3000/user/tag/${localStorage.getItem('id')}`,{
        tag: self.list_project.name//not finish
      })
      .then(row=>{
        console.log(row);
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
  created:function(){
    const self = this
    axios.get(`http://localhost:3000/user/${localStorage.getItem('id')}`,{
      headers:{
        token: localStorage.getItem('token')      }
    })
    .then(result=>{
      console.log(result);
      for (let i = 0; i < result.data.tag.length; i++) {
        let obj = {}
        obj.name = result.data.tag[i]
        obj.count = 0
        for (let j = 0; j < result.data.task_list.length; j++) {
          if(result.data.task_list[j].tags[0] == result.data.tag[i])
          {
            obj.count += 1
          }
        }
        self.list_project.push(obj)
      }
      self.task_list = result.data.task_list
    })
    .catch(err=>{
      console.log(err);
    })
  }
})
