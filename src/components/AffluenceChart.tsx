import React, {useState, useEffect} from 'react'
import Highcharts from "highcharts"
import HighchartsReact from 'highcharts-react-official'
import drilldown from "highcharts/modules/drilldown.js";
drilldown(Highcharts);

Highcharts.setOptions({
    lang: {
        drillUpText: '<< Retour au jours de la semaine'
    }
});

const options = {
    chart: {
        type: 'column',
    },
    title: {
        text: ''
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: "pourcentage d'affluence"
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
    series:[
        {
            name: "Jour de la semaine",
            colorByPoint:true,
            data: [
                {
                    name:"Lundi",
                    y: 35.05,
                    drilldown:"Lundi"
                },
                {
                    name:"Mardi",
                    y: 29.64,
                    drilldown:"Mardi"
                },
                {
                    name:"Mercredi",
                    y: 48.31,
                    drilldown:"Mercredi"
                },
                {
                    name:"Jeudi",
                    y: 92.38,
                    drilldown:"Jeudi"
                },
                {
                    name:"Vendredi",
                    y: 56.96,
                    drilldown:"Vendredi"
                },
                {
                    name:"Samedi",
                    y: 85.40,
                    drilldown:"Samedi"
                },
                {
                    name:"Dimanche",
                    y: 11.24,
                    drilldown:"Dimanche"
                },
            ]
        }
    ],
    drilldown:{
        drillUpButton:{

        },
        series:[
            {
                name:"Lundi",
                id:"Lundi",
                data:[
                    ["8:00", 9.5],["9:00", 14.50],["10:00", 20.5],["11:00", 9.5],["12:00", 6.00],["13:00", 13.5],["14:00", 8.50],["15:00", 19.5],["16:00", 8.5],
                    ["17:00", 5.00],
                ]
            },
            {
                name:"Mardi",
                id:"Mardi",
                data:[
                    ["8:00", 9.5],["9:00", 14.50],["10:00", 20.5],["11:00", 9.5],["12:00", 6.00],["13:00", 13.5],["14:00", 8.50],["15:00", 19.5],["16:00", 8.5],
                    ["17:00", 5.00],
                ]
            },
            {
                name:"Mercredi",
                id:"Mercredi",
                data:[
                    ["8:00", 9.5],["9:00", 14.50],["10:00", 20.5],["11:00", 9.5],["12:00", 6.00],["13:00", 13.5],["14:00", 8.50],["15:00", 19.5],["16:00", 8.5],
                    ["17:00", 5.00],
                ]
            },
            {
                name:"Jeudi",
                id:"Jeudi",
                data:[
                    ["8:00", 9.5],["9:00", 14.50],["10:00", 20.5],["11:00", 9.5],["12:00", 6.00],["13:00", 13.5],["14:00", 8.50],["15:00", 19.5],["16:00", 8.5],
                    ["17:00", 5.00],
                ]
            },
            {
                name:"Vendredi",
                id:"Vendredi",
                data:[
                    ["8:00", 9.5],["9:00", 14.50],["10:00", 20.5],["11:00", 9.5],["12:00", 6.00],["13:00", 13.5],["14:00", 8.50],["15:00", 19.5],["16:00", 8.5],
                    ["17:00", 5.00],
                ]
            },
            {
                name:"Samedi",
                id:"Samedi",
                data:[
                    ["8:00", 9.5],["9:00", 14.50],["10:00", 20.5],["11:00", 9.5],["12:00", 6.00],["13:00", 13.5],["14:00", 8.50],["15:00", 19.5],["16:00", 8.5],
                    ["17:00", 5.00],
                ]
            },
            {
                name:"Dimanche",
                id:"Dimanche",
                data:[
                    ["8:00", 9.5],["9:00", 14.50],["10:00", 20.5],["11:00", 9.5],["12:00", 6.00],["13:00", 13.5],["14:00", 8.50],["15:00", 19.5],["16:00", 8.5],
                    ["17:00", 5.00],
                ]
            },
        ]
    }
}

const AffluenceChart = () => {

    return(
        <>
        {!!options ?
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            :
                <p>Chargement...</p>
            }
        </>
    )
}

export default AffluenceChart