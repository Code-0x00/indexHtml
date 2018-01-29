function setCSS(cssname){
	var varIP="//10.12.12.30/css/";
	//<link rel="stylesheet" href="/css/hack.css">
	var css_src="<link rel=\"stylesheet\" href=\""+varIP+cssname+"\">";
	document.write(css_src);
}

function setDate(){
	document.write(Date());
}

function setUrlList(filename){
	document.write("<li><a href=\"./"+filename+"\">"+filename+"</a></li>");
}

function setJS(jsname){
	var varIP="//10.12.12.30/js/";
	var script_src="<script src=\""+varIP+jsname+"\""+"></"+"script>";
	document.write(script_src);
}

function add_items(){
	var max_xcount=10;
	if(xcount>=max_xcount){
		return 0;
	}
	xname='name'+xcount;
	xcount=xcount+1;
	//console.log(xs);
    var input1 = document.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('name', xname);
    input1.setAttribute('class', 'git');

    var btn1 = document.getElementById("add_id");
    btn1.insertBefore(input1,null);

    var hr = document.createElement('br');
    btn1.insertBefore(hr,null);

    var h_input_count=document.getElementById("add_count_id");
    h_input_count.value=xcount;    
}

function plot_main(username,myChart){
	var json_path=username+'.json?';

$.get(json_path, function (data) {
//console.log(data);

    var base = 0;
 
    myChart.setOption(option = {
        title: {
            text: 'Accuracy Line',
            subtext: 'Accuracy/epoch',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#ccc',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    textStyle: {
                        color: '#222'
                    }
                }
            },
            formatter: function (params,val) {
                return params[2].name +'<br />' +params[2].data
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.map(function (item) {
                return item.iteration;
            }),
            axisLabel: {
                formatter: function (value, idx) {
                    var date = new Date(value);
                    return idx ;
                }
            },
            splitLine: {
                show: false
            },
            boundaryGap: false,
            axisLine:{
                  onZero:false,
                  lineStyle:{
                  //color:'#ffffff'
                  color: '#ffffff'
                }
            }
        },
        yAxis: {
            axisLabel: {
                formatter: function (val) {
                    return (val - base) * 100 + '%';
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return (params.value * 100).toFixed(2) + '%';
                    }
                }
            },
            splitNumber: 3,
            splitLine: {
                show: false
            },
            axisLine:{
                  onZero:false,
                  lineStyle:{
                  //color:'#ffffff'
                  color: '#ffffff'
                }
            }
        },
        series: [{
            name: 'L',
            type: 'line',
            data: data.map(function (item) {
            	
            //console.log(data);
                return item.l + base;
            }),
            lineStyle: {
                normal: {
                	color:'#ffffff',
                    opacity: 0
                }
            },
            stack: 'confidence-band',
            symbol: 'none'
        }, 
        {
            name: 'U',
            type: 'line',
            data: data.map(function (item) {
                return item.u - item.l;
            }),
            lineStyle: {
            	color:'#00ff00',
                normal: {
                	color:'#ffffff',
                    opacity: 0
                }
            },
            areaStyle: {
                normal: {
                    color: '#ffffff'
                }
            },
            stack: 'confidence-band',
            symbol: 'none'
        }, 
        {
            type: 'line',
            data: data.map(function (item) {
                return item.accuracy + base;
            }),
            hoverAnimation: false,
            symbolSize: 6,
            itemStyle: {
                normal: {
                    color: '#ffffff'
                }
            },
            showSymbol: false
        }]
    });
});
}