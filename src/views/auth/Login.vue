<template>
    <div class="container">
        <div class="roa justify-content-center">
            <div class="col-sm-4 mt-5">
                
            </div>
        </div>
    </div>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card rounded shadow">
                    <div class="card-header">
                        Login
                    </div>
                    <div class="card-body">
                        <div v-if="validation.message" class="text-danger">
                            {{form.email + " is " +validation.message}}
                        </div>
                        <form @submit.prevent="login()">
                            <div class="mb-3">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" v-model="form.email">
                                <div v-if="validation.email" class="text-danger">
                                    {{validation.email[0]}}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" v-model="form.password">
                                <div v-if="validation.password" class="text-danger">
                                    {{validation.password[0]}}
                                </div>
                            </div>

                            <button class="btn btn-outline-primary">Login</button>
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
    setup() {
        const form=reactive({
            email: '',
            password: ''
        })

        const validation = ref([]);

        const router = useRouter();

        function login(){
            // console.log(form)
            fetch('http://127.0.0.1:8000/api/auth/login',{
                method: 'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }).then((response)=>{
                if(response.ok){
                    // berhasil
                    response.json().then((data)=>{
                        // console.log(data)
                        localStorage.setItem('user', JSON.stringify(data))
                        router.push({
                            name: 'transaction.home'
                        })
                    })
                }else{
                    response.json().then((data)=>{
                        validation.value = data
                        console.log(data)
                        
                    })
                }
            })
        }

        return{
            form,
            validation,
            login
        }
    }
}
</script>