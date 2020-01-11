/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform'
import VueRouter from 'vue-router'
import moment from 'moment'

Vue.use(VueRouter)

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

let routes = [
  { path: '/dashboard', component: require('./components/DashboardComponent.vue').default},
  { path: '/users', component: require('./components/UsersComponent.vue').default},
  { path: '/profile', component: require('./components/ProfileComponent.vue').default}
]

Vue.filter('upText', function (text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter('myDate', function (created) {
	return moment(created).format('MMMM Do YYYY');
});


const router = new VueRouter({
  routes
})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// Vue.component('dashboard', require('./components/DashboardComponent.vue').default);
// Vue.component('profile', require('./components/ProfileComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
