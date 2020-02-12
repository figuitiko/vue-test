import Vue from 'vue';
import firebase from "firebase";
import App from './App.vue';
import router from './router';
import VueResource from 'vue-resource';
import VueGoogleCharts from 'vue-google-charts'

Vue.use(VueResource);
Vue.use(VueGoogleCharts);


Vue.config.productionTip = false;
let app = '';

const firebaseConfig = {
  apiKey: "AIzaSyBDUndLIzcNQrzWRyRS6pSV77jNfjZTzjw",
  authDomain: "vue-test-75089.firebaseapp.com",
  databaseURL: "https://vue-test-75089.firebaseio.com",
  projectId: "vue-test-75089",
  storageBucket: "vue-test-75089.appspot.com",
  messagingSenderId: "1057850861288",
  appId: "1:1057850861288:web:eed6ee8a105b2d9229cb5d",
  measurementId: "G-4L2RNYV1G4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(()=>{
  if(!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});

