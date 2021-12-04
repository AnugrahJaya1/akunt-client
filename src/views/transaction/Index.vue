<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link :to="{name: 'transaction.create'}"
                    class="btn btn-primary btn-sm rounded shadow mb-3">
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
                                    <th>Tittle</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- <tr v-for="(transaction, index) in transactions.data" :key="index">
                                    <td>{{transaction.title}}</td>
                                    <td>{{transaction.amount}}</td>
                                    <td>{{transaction.type}}</td>
                                    <td>
                                        <div class="btn-group">
                                            <router-link :to="{name : 'transaction.edit', params:{id: transaction.id}}"
                                            class="btn btn-sm btn-outline-info">
                                            Edit
                                            </router-link>
                                            <button class="btn btn-sm btn-outline-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr> -->

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {onMounted, ref} from 'vue'
// onMounted sebagai hook, setelah 'load semua template'
// ref object data 
export default {
    // api composition

    // data () {
    // return {
    //   info: null
    // }
    // },
    // mounted () {
    //     axios
    //     .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //     .then( function (response){
    //         console.log(response.data)
    //     })
    // }
    setup(){
        // reactive state
        let transactions = ref([]);// inisisalisasi penampung data berupa array(isi param)


        onMounted(()=>{
            // get data from api endpoint
            axios.get('http://127.0.0.1:8000/api/transactions')
            // axios.get('https://reqres.in/api/users/1')
            .then((result)=>{
                transactions.value=result.data
                console.log(result.data)   
            }).catch((err)=>{
                console.log(err.response)
            });
        });

        // return{
        //     transactions
        // }
    }
}
</script>