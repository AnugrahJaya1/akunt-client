import {createRouter, createWebHistory} from 'vue-router'
// create router url/path untuk akses component
// createWebHistory aktifkan mode history

// kumpulan route
const routes=[
    // object
    {
        path: '/',
        name: 'transaction.index',
        component : () => import("../views/transaction/Index.vue")
    },
    {
        path: '/create',
        name: 'transaction.create',
        component : () => import("../views/transaction/Create.vue")
    },
    {
        path: '/edit/:id',
        name: 'transaction.edit',
        component : () => import("../views/transaction/Edit.vue")
    },
];

//buat router, object yang membuat route aktif
const router= createRouter({
    history: createWebHistory(),
    routes
});

//akan di import ke main
//export dulu agar bisa di import
export default router;