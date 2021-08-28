var app = new Vue({
    el: '#app',
    data: {
        todos: [],
        message: '',
        show: 'all',
        drag: {},
      },

    beforeMount(){
      this.show = 'active'
    },
    
    mounted()
    {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(data => this.todos = data)
        .catch(err => console.log(err.message))

    },

    computed: {
        activeTodos() {
          return this.todos.filter(item => {
            return !item.completed;
          });
        },
        filteredTodos() {
            if (this.show === 'active')
              return this.todos.filter(item => {
               return !item.completed;
              });
            if (this.show === 'completed')
              return this.todos.filter(item => {
                return item.completed;
               });
            return this.todos;
          },
      
    },    

    methods: {
      showAll() {
        this.show = 'all';
      },
      showCompleted() {
        this.show = 'completed';
      },

        addItem() {
          this.todos.push({text: this.message, completed:false});
          this.message = '';
        },
        deleteItem(item) {
            var index = this.todos.indexOf(item);
            if (index > -1)
              this.todos.splice(index,1);
        },      
        showActive() {
          this.show = 'active';
        },
        deleteCompleted() {
          this.todos = this.todos.filter(item => {
              return !item.completed;
          });
        },
        dragItem(item) {
          this.drag = item;
        },
        dropItem(item) {
          const indexItem = this.todos.indexOf(this.drag);
          const indexTarget = this.todos.indexOf(item);
          this.todos.splice(indexItem,1);
          this.todos.splice(indexTarget,0,this.drag);
        },
      }
    
});