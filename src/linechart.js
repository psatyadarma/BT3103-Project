//{}
import { Line } from 'vue-chartjs'
import database from './firebase.js'

export default {
    extends: Line,
    data:()=>({
        chartdata: {
            labels: [],
            datasets: [
              {
                label: 'Total Views per Day',
                data: [],
                borderColor: '#a00a4d',
                fill: false,
                tension: 0
              },
              {
                label: 'Total Clicks per Day',
                data: [],
                borderColor: '#2e84d5',
                fill: false,
                tension: 0
              }
            ]
          },
          
          options: {
              responsive: true,
              maintainAspectRatio: false,
              title:{
                  display:true,
                  text:'Profile Views & Clicks (30 Day)',
                  fontColor:'Black',
                  fontSize:25
              },
              legend:{
                  position:'top'
              }
            
            },
            
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }],
                xAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            } 

    }),

    methods: {
        fetchData: function() {
            database.collection('profiles').doc(database.auth().currentUser.uid).get().then((querySnapShot) => {
                var tutor = querySnapShot.data();
                var viewDates = Object.keys(tutor.viewHistory);
                var clickDates = Object.keys(tutor.clickHistory);
                var pastThirtyDays = [];
                for (let i=0; i < 30; i++) {
                    var date = new Date(new Date().setDate(new Date().getDate() - i)).toDateString().slice(4);
                    pastThirtyDays.push(date);
                }
                pastThirtyDays = pastThirtyDays.sort((a,b) => new Date(a) - new Date(b));
                for (const date of pastThirtyDays) {
                    this.chartdata.labels.push(date.slice(0,-4));
                    if (viewDates.includes(date)) {
                        this.chartdata.datasets[0].data.push(tutor.viewHistory[date]);
                    } else {
                        this.chartdata.datasets[0].data.push(0);
                    }
                    if (clickDates.includes(date)) {
                        this.chartdata.datasets[1].data.push(tutor.clickHistory[date]);
                    } else {
                        this.chartdata.datasets[1].data.push(0);
                    }
                }
                this.renderChart(this.chartdata, this.options);
            })
        }

    },

    created() {
        this.fetchData();
    },
}