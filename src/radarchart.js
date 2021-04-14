import { Radar } from 'vue-chartjs'
import database from './firebase.js'

export default {
    extends: Radar,
    data:()=>({
        chartdata: {
            labels: ['Engaging', 'Communication', 'Listening', 'Patience'],
            datasets: [
              {
                label: 'Number of Ratings',
                data: [],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
              },
            ]
            
          },
          
          options: {
              title:{
                  display:true,
                  text:'Attribute Ratings',
                  fontColor:'Black',
                  fontSize:25
              },
              legend:{
                  position:'top'
              },
              layout:{
                  padding:{
                      left: 100,
                      right: 100,
                      top: 50,
                      bottom: 50
                  }
              },
              scales: {
                  r: {
                      animate: true,
                      display: true,
                      beginAtZero: true,
                      min: 0,
                      max: 10,
                      ticks: {
                          count: 10,
                          stepSize: 1
                      }
                  }
              }
            
            }  
    }),

    methods: {
        fetchData: function() {
            database.collection('profiles').doc(database.auth().currentUser.uid).get().then((querySnapShot) => {
                var tutor = querySnapShot.data();
                var engagingList = tutor.engaging;
                var communicationList = tutor.communication;
                var listeningList = tutor.listening;
                var patienceList = tutor.patience;
                var attributeLists = [engagingList, communicationList, listeningList, patienceList]
                var data = [];
                for (var i=0; i<4; i++) {
                    var attributeList = attributeLists[i];
                    var sumRatings = 0;
                    var numRatings = 0;
                    attributeList.forEach((value, index) => {
                        sumRatings += value*(index+1);
                        numRatings += value;
                    })
                    data[i] = sumRatings/numRatings;
                }
                this.chartdata.datasets[0].data = data;
                this.renderChart(this.chartdata, this.options);
            })
        }
    },

    created() {
        this.fetchData();
    },
}