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
      answers:[],
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
      this.$http.get('https://vue-test-75089.firebaseio.com/answers.json').then(response =>{
      return  response.json();

      }).then( response =>{

        let rightByQuestion = 0;
        let wrongByQuestion =0;
        let arrayElments = [];

       this.answers = response;

        Object.keys(this.answers);
           Object.values(this.answers);
           let responseArray = Object.entries(this.answers);


           for(let i=0; i < responseArray.length; i++) {

             if(responseArray[i][1].right === true){
               rightByQuestion++
             }
             else{
               wrongByQuestion++
             }
             if(arrayElments.length ===0 ){
               arrayElments.push([responseArray[i][1].questionId,rightByQuestion,wrongByQuestion]);
             }
             else {
               for(let j =0; j < arrayElments.length; j++){
                 if (arrayElments[j][0] === responseArray[i][1].questionId ){
                   if(responseArray[i][1].right === true){
                     rightByQuestion++;
                   }else {
                     wrongByQuestion++
                   }
                  arrayElments = [responseArray[i][1].questionId,rightByQuestion,wrongByQuestion];

                 }
                 else{
                   arrayElments.push([responseArray[i][1].questionId,rightByQuestion,wrongByQuestion]);
                 }

               }
             }
           }

        this.chartData.push(arrayElments)

      })
    }

  }
}
</script>
