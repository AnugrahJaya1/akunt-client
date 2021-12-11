<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link
                :to="{name: 'transaction.home'}"
                class="btn btn-primary btn-sm rounded shadow mb-3"
                >
                Back
                </router-link>

                <div class="card rounded shadow">
                    <div class="card-header">
                        Create Transaction
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store()">
                            <div class="mb-3">
                                <label for="" class="form-label">Title</label>
                                <input type="text" class="form-control" v-model="transaction.title">
                                <div v-if="validation.title" class="text-danger">
                                    {{validation.title[0]}}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Amount</label>
                                <input type="number" class="form-control" v-model="transaction.amount">
                                <div v-if="validation.amount" class="text-danger">
                                    {{validation.amount[0]}}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Time</label>
                                <input type="text" class="form-control" placeholder="yyyy-mm-dd hh:mm:ss" v-model="transaction.time">
                                <div v-if="validation.time" class="text-danger">
                                    {{validation.time[0]}}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Type</label>
                                <select id="" class="form-select" v-model="transaction.type">
                                    <option value="expense">Expense</option>
                                    <option value="revenue">Revenue</option>
                                </select>
                                <div v-if="validation.type" class="text-danger">
                                    {{validation.type[0]}}
                                </div>
                            </div>
                            <button class="btn btn-outline-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'

export default {
    setup(){
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        // data binding
        const transaction = reactive({
            title: '',
            amount: '',
            time: '',
            type: '',
        });

        const validation = ref([]);

        const router = useRouter();

        // req ke api
        function store(){
            fetch('http://localhost:8000/api/transactions',{
                method: 'post',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
                body: JSON.stringify(transaction)
            }).then((response)=>{
                if(response.ok){
                    // berhasil
                    router.push({
                        name: 'transaction.home'
                    })
                }else{
                    response.json().then((data)=>{
                        validation.value = data
                        // console.log(data)
                    })
                    // console.log(validation.value)
                }
                // console.log(response)
                
            })

            // //url, data
            // axios.post(
            //     'http://localhost:8000/api/transactions',
            //     transaction
            // ).then(()=>{
            //     // berhasil
            //     router.push({
            //         name: 'transaction.index'
            //     })
            // }).catch((err)=>{
            //     validation.value = err.response.data
            // })
        }

        return {
            transaction,
            validation,
            router,
            store
        }
    }
}
</script>