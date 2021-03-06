'use strict'

const app = new Vue({
  el: '#app',
  data: {
    msg: 'halo',
    task_list: [],
    input_task: '',
    tag: localStorage.getItem('tag'),
    id: localStorage.getItem('id')
  },
  methods:{
    checkTask: function(id){
      const self = this
      axios.put(`http://localhost:3000/task/${id}`, {
        status: true
      })
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      })
    },
    addTask: function(){
      const self = this
      axios.post('http://localhost:3000/task',{
        task_name: self.input_task,
        tag: self.tag
      })
      .then(row=>{
        const self = this
        axios.put(`http://localhost:3000/user/${self.id}`,{
          task_list: row.data._id
      },{
         headers:{
           token: localStorage.getItem('token')
         }
      })
        .then(log=>{
          console.log(log);
          self.task_list.push(row.data)
          self.input_task = ''
        })
        .catch(err=>{
          console.log(err);
        })
      })
      .catch(err=>{
        console.log(err);
      })
    },
    removeTask: function(idt){
      const self = this
      swal({
       title: 'Are you sure?',
       text: "You won't be able to revert this!",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, delete it!',
       closeOnConfirm: true,
     }).then(function(){
         //function here
         axios.delete(`http://localhost:3000/user/${self.id}/${idt}`,{
           headers:{
             token: localStorage.getItem('token')
           }
         })
         .then(log=>{
           const newData = self.task_list.filter(function(task){
             return task._id != idt
           })

           self.task_list = newData
           console.log(log);
         })
         .catch(err=>{
           console.log(err);
         })

         //logic end
                 swal(
                   'Deleted!',
                   'Your file has been deleted.',
                   'success'
                 );
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
      const newData = result.data.task_list.filter(function(task){
        return task.tags[0] == localStorage.getItem('tag')
      })
      self.task_list = newData
    })
    .catch(err=>{
      console.log(err);
    })
  }
})
