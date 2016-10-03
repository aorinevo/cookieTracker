var myChart,
	ctx = document.createElement("canvas");

ctx.id = "myChart";
document.body.appendChild(ctx);

function listCookieNames(){
    return document.cookie.split(";").map(function(element, index, array){ return element.split("=")[0];});
}

function displayChart( ){
	myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: [0],
	        datasets: [{
	            label: '# of Cookies',
	            data: [0]	            
	        }]
	    },
	    options: {
	    	animation : false
	    }
	});
}

function updateChart( data ){
	myChart.data.labels = data;
	myChart.data.datasets[0].data = data;
	myChart.update();
}

function pollCookies(){
	var cookieLog = JSON.parse(sessionStorage.getItem("cookieLog")) || [],
		currentCookies = listCookieNames();	
	if( cookieLog.length < 1){
		cookieLog = [];
	}
	cookieLog.push(currentCookies.length);
	updateChart( cookieLog );
	sessionStorage.setItem("cookieLog",JSON.stringify(cookieLog));	
}

displayChart();
window.setInterval(function(){pollCookies();},4000);

