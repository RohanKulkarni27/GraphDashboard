var chart,year;
$(document).ready(function(){
    $("#BarContainer").css("display","none");
    $("#Grade").css("display","none")
loadYear();

//loadAmount();
});


function loadYear(){
    var str='';
    $.ajax({
        url: 'https://ancient-shelf-26491.herokuapp.com/',
       
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        data:{
            format:"json"
        },
        success:function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                str=str+"<option value = '" + data[i].year+ " '>" + data[i].year + " </option>";
            }
            $("#Year").append(str);
        }
});
  
}

function GenerateReportfn(){
 year = $("#Year").val();
$("#GradeValue").css("display","block");
$("#gradeLabel").css("display","block");
$("#Grade").css("display","block")
 loadAmount(year)
}

function loadAmount(yearSelected){
$("#valueDiv").empty();
 var str="";
  year =yearSelected
$.ajax({
url: 'https://ancient-shelf-26491.herokuapp.com/year/'+year,
type: 'GET',
crossDomain: true,
dataType: 'json',
data:{
    format:"json"
},
success:function(data){

var amountApplied=(data[0].amount_applied).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
var amountFunded= (data[0].amount_funded).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
var amountInv  = (data[0].amount_inv_comm).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
str=str+'<div  class="col-md-4 col-sm-4 col-xs-4 mainValueDiv">';
    str=str+'<div class="row">';
        str=str+'<div class="col-md-12 col-sm-12 col-xs-12 valueDiv"><span class="ValueLabel">Total Amount Applied for</span></div>';
    str=str+'</div>';
    str=str+'<hr />';
    str=str+'<div class="row">';
        str=str+'<div class="col-md-12 col-sm-12 col-xs-12 valueDiv" style="text-align:center;"><span class="ValueAmount">$'+amountApplied+'</span></div>';
    str=str+'</div>';
str=str+'</div>';
str=str+'<div class="col-md-4 col-sm-4 col-xs-4 mainValueDiv">';
    str=str+'<div class="row">';
        str=str+'<div class="col-md-12 col-sm-12 col-xs-12 valueDiv"><span class="ValueLabel">Total Amount Funded</span></div>';
    str=str+'</div>';
    str=str+'<hr />';
    str=str+'<div class="row">';
        str=str+'<div class="col-md-12 col-sm-12 col-xs-12 valueDiv" style="text-align:center;"><span class="ValueAmount">$'+amountFunded+'</span></div>';
    str=str+'</div>';
str=str+'</div>';
str=str+'<div class="col-md-4 col-sm-4 col-xs-4 mainValueDiv">';
    str=str+'<div class="row">';
        str=str+'<div class="col-md-12 col-sm-12 col-xs-12 valueDiv"><span class="ValueLabel">Total Committed by Investors</span></div>';
    str=str+'</div>';
    str=str+'<hr />';
    str=str+'<div class="row">';
        str=str+'<div class="col-md-12 col-sm-12 col-xs-12 valueDiv" style="text-align:center;"><span class="ValueAmount">$'+amountInv+'</span></div>';
    str=str+'</div>';
str=str+'</div>';
$("#valueDiv").append(str);
}
});

loadBar(year);
loadGradeDropDown(year);
}

function loadBar(year){
 var arrayBar = []
var year =year
$.ajax({
url: 'https://ancient-shelf-26491.herokuapp.com/bar/'+year,
type: 'GET',
crossDomain: true,
dataType: 'json',
data:{
    format:"json"
},
success:function(data){
plotGraph(data,year);
}
});

}



function plotGraph(arrayBar,year){
var main_data=arrayBar;
$("#BarContainer").css("display","block")
$("#BarContainer").empty();
Highcharts.chart('BarContainer', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Leading club-monthly loan volume '+year
    },

    xAxis: {
        title:{
            text:'Month'
        },
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Loan Volume'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 1,
            dataLabels: {
                enabled: false
            }
        }
    },

    tooltip: {
    
        pointFormat: '<span style="color:{point.color}"><b>{point.y}</b>'
    },

    "series": [
        {
            "name": "Browsers",
            "colorByPoint": true,
            "data": main_data
        }
    ]
    
});

}

function loadGradeDropDown(year){
$("#GradeValue").empty();


var str='';
    $.ajax({
        url: 'https://ancient-shelf-26491.herokuapp.com/grade/',
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        data:{
            format:"json"
        },
        success:function(data){
           
            for(var i=0;i<data.length;i++){
                str=str+"<option value = '" + data[i].grade+ " '>" + data[i].grade + " </option>";
            }
            
            $("#GradeValue").append(str);
            plotLineGraph(year,"B");
            //loadLine(year,"B")
        }
});
}
function myFunction(){

var value=$("#GradeValue").val();
chart.series[0].remove();
loadLine(year,value);

}
function loadLine(year,grade){

var values = [];
$.ajax({
        url: 'https://ancient-shelf-26491.herokuapp.com/lineGraph/'+year+'/'+grade,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        data:{
            format:"json"
        },
        success:function(data){
           var dataL = data.length;
           for(var i=0;i<dataL;i++){
               values.push(data[i].aver_amt);
           }

           console.log(values);
           
           chart.addSeries({
                data: values
            });
           //return values;
          // plotLineGraph(values);
        }
});
}

function plotLineGraph(year,grade){

// create the chart
chart = Highcharts.chart('Grade', {
chart: {
    events: {
        addSeries: function () {
            var label = this.renderer.label('A series was added, about to redraw chart', 100, 120)
                .attr({
                    fill: Highcharts.getOptions().colors[0],
                    padding: 10,
                    r: 5,
                    zIndex: 8
                })
                .css({
                    color: '#FFFFFF'
                })
                .add();

            setTimeout(function () {
                label.fadeOut();
            }, 1000);
        }
    }
},
title: {
    text: 'Loans issued by Credit Score(Grade)'
},
xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    title:{
        text:'Month'
    }
},
yAxis:{
    title:{
        text:'Avg Loan Amount'
    }
}
});
loadLine(year,grade);
}