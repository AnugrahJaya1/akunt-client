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
                                            <button class="btn btn-sm btn-outline-danger">
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
import axios from 'axios'

export default {
    setup(){
        // console.log("Setup")
        const transactions = ref([])
        const load = async() => {
            try{
                let data = await fetch('http://localhost:8000/api/transactions')
                // const axios = require('axios')
                // axios.grt('http://localhost:8000/api/transactions')
                // then((res)=>{
                //     console.log(res)
                // })
                // console.log(data)
                if(!data.ok){
                    throw Error('no data available')
                }
                transactions.value = await data.json();
                // console.log(transactions)
            }catch(err){
                console.log(err.message)
            }
        }

        load()

        // untuk bisa pake harus di return terlebih dahulu
        return{
            transactions
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