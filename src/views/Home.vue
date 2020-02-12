<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="logout">Logout </button>

    <GChart
            type="BarChart"
            :data="chartData"
            :options="chartOptions"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import firebase from "firebase";
import { GChart } from 'vue-google-charts';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    GChart
  },
  data(){
    return {
      questions:[],
      dataArray:[],
      chartData: [
        ["Questions", "Right", "Wrong"],

      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      }

    };
  },
  created() {
  this.fetch();
  },
  methods:{
    logout: function () {
      firebase.auth().signOut().then(()=> {
        this.$router.replace('login');
      })
    },
    fetch: function () {
      this.$http.get('https://vue-test-75089.firebaseio.com/questions.json').then(response =>{
      return  response.json();

      }).then( response =>{
        //console.log(response);
        // this.questions = response;

        let i = 0;
        for(const question of response ){
         this.chartData.push([i, question.rights, question.wrongs]);
          i++;
        }

      })
    }

  }
}
</script>
