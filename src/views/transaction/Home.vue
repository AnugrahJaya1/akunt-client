<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link
                :to="{name: 'transaction.create'}"
                class="btn btn-primary btn-sm rounded shadow mb-3"
                >
                Add
                </router-link>

                <div class="card rounded shadow">
                    <div class="card-header">
                        Transaction List
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(transaction, index) in transactions.data" :key="index">
                                    <td>{{transaction.title}}</td>
                                    <td>{{transaction.amount}}</td>
                                    <td>{{transaction.type}}</td>
                                    <td>
                                        <div class="btn-group">
                                            <router-link
                                            :to="{name: 'transaction.edit', params:{id: transaction.id}}"
                                            class="btn btn-sm btn-outline-info"
                                            >
                                            Edit
                                            </router-link>
                                            <button class="btn btn-sm btn-outline-danger" @click.prevent="destroy(transaction.id, index)">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'

export default {
    setup(){
        let user = JSON.parse(localStorage.getItem('user'));
        const transactions = ref([])
        function load(){
            fetch('http://localhost:8000/api/transactions',{
                method: 'GET',
                headers:{
                    'Authorization': 'Bearer ' + user.token,
                },
            }).then((response)=>{
                if(response.ok){
                    response.json().then((data)=>{
                        transactions.value = data
                    })
                }
            })    
        }
        load()

        function destroy(id, index){
            fetch(`http://localhost:8000/api/transactions/${id}`,{
                method: 'delete',
                headers:{
                    'Authorization': 'Bearer ' + user.token,
                },
            }).then((response)=>{
                if(response.ok){
                    // berhasil
                    transactions.value.data.splice(index, 1)
                }else{
                    response.json().then((data)=>{
                        console.log(data)
                    })
                }
                
            })
        }

        // untuk bisa pake harus di return terlebih dahulu
        return{
            transactions,
            destroy
        }
        
    }
    // setup(){
    //     // reactive state
    //     const transactions = ref([]);

    //     onMounted(()=>{
    //         // get data from api endpoint
    //         axios.get('http://localhost:8000/api/transactions')
    //         .then((result)=>{
    //             transactions.value = result.data
    //         }).catch((err)=>{
    //             console.log(err.response)
    //         });
    //     });

    //     return{
    //         transactions
    //     }
    // }
}
</script>