import { Bar } from 'vue-chartjs'
import database from './firebase.js'

export default {
    extends: Bar,
    data:()=>({
        chartdata: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [
              {
                label: 'Number of Ratings',
                data: [],
                backgroundColor:'#ffd700',
                borderWidth:1.5,
              },
            ]
            
          },
          
          options: {
              title:{
                  display:true,
                  text:'Distribution of Listening Ratings',
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
              scales:{
                  yAxes:[{
                      ticks:{
                          min: 0,
                          fontSize: 20
                      },
                      gridLines: {
                          color: 'rgba(0,0,0,0)'
                      },
                      scaleLabel: {
                          display: true,
                          labelString: 'Frequency',
                          fontSize: 20
                      },
                   }],
                   xAxes:[{
                       ticks:{
                           fontSize: 20
                       },
                       categoryPercentage: 1.0,
                       barPercentage: 1.0,
                       gridLines: {
                           color: 'rgba(0,0,0,0)'
                       },
                       scaleLabel: {
                           display: true,
                           labelString: 'Rating',
                           fontSize: 20
                       },
                   }]
                   
              }
            
            }  
    }),

    methods: {
        fetchData: function() {
            database.collection('profiles').doc(database.auth().currentUser.uid).get().then((querySnapShot) => {
                var tutor = querySnapShot.data();
                this.chartdata.datasets[0].data = tutor.listening;
                this.renderChart(this.chartdata, this.options);
            })
        }
    },

    created() {
        this.fetchData();
    },
}