
const app = new Vue({
    el: '#app',
    data: {
        users: [],
        stmt: '',
        todos: true,
        userSelected: []
    },
    methods: {
        fetchAll() {
            this.todos = true
            if (this.stmt.length < 4) {
                alert('La búsqueda está restringida a mínimo 4 carácteres')
            } else if (/teleperformance/ig.test(this.stmt)) {
                alert('La búsqueda no es válida')
            } else {
                url = `https://api.github.com/search/users?q=${this.stmt}`
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        this.users = data.items
                        if (data.items.length == 0) {
                            alert('No se encontraron coincidencias')
                        }
                    })
                    .catch(error => {
                        alert(error.message)
                    });
            }

        },
        getUser(user) {
            url = `https://api.github.com/users/${user}`
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.userSelected = data
                    this.todos = false
                })
                .catch(error => {
                    alert(error.message)
                });
        }

    },
})