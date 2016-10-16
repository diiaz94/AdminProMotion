var store_map=null;
var marker=null;
var myCenter=null;
var store_marker=null
$.fn.pressEnter = function(fn) {  
  
    return this.each(function() {  
        $(this).bind('enterPress', fn);
        $(this).keyup(function(e){
            if(e.keyCode == 13)
            {
              $(this).trigger("enterPress");
            }
        })
    });  
 }; 

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

$( document ).ready(function() {
	//check_pending_pdf();
    console.log( "ready!" );
	$(".delete-record").on("click",function(){

		if(confirm("¿Esta seguro/a?")){
			url = $(this).data("url");
			id = $(this).data("id");
			$.ajax({
			  method: "DELETE",
			   beforeSend: function (request)
			            {
			                request.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
			            },
			  url: url+"/"+id+".json",

			})
			  .done(function( msg ) {
			  	noticemsj="Registro eliminado exitosamente.";
			  	validarMensajes();
			    location.reload();
			  })
			  .fail(function(data){
				console.log(data.responseText);
			});
		}
	});

	$(".change_status").on("click",change_status);
	$(".detail-inside").on("click",show_detail);
  	$('.cedula').unbind();
  	$('.cedula').bind('keyup', function(){
		if(this.value.length>parseInt($(this).data("maxlength"))){
	    	this.value = this.value.substring(0,$(this).data("maxlength"))
	    }
	});

	$('.cedula').bind('keypress', function(){
		if(this.value.length>parseInt($(this).data("maxlength"))-1){
	    	this.value = this.value.substring(0,$(this).data("maxlength"))
	    }
	});
		$.each($(".money"), function( index, value ) {
  			$(value).text(formato_numero($(value).text(), 2, ',', '.',true))
  			$(value).val(formato_numero($(value).val(), 2, ',', '.',false))
		});
        //$(".monto").text(formato_numero($(".monto").text(), 2, ',', '.'));

	validarMensajes();
	/*$.ajaxSetup({
	  headers: {
	    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
	  }});
	*/
	$(".submit_client_date").submit(function(event){
		var d = new Date();
		var fecha = {
			"dia":d.getDate(),
			"mes":d.getMonth()+1,
			"anio":d.getFullYear(),
			"hora":d.getHours(),
			"min":d.getMinutes(),
			"seg":d.getSeconds()
		}

		$(this).append(
			"<input type='hidden' name='fecha' value='"+JSON.stringify(fecha)+"'/>"
			);
		return 
		event.preventDefault();
	});



});

function validarMensajes(){
	if(typeof(alertmsj)!="undefined" && alertmsj.trim()!=""){
		$("#modal-danger").find("#msjtxt").html(alertmsj);
		$("#modal-danger").modal("show");
	}
	if(typeof(noticemsj)!="undefined" && noticemsj.trim()!=""){
		$("#modal-success").find("#msjtxt").html(noticemsj);
		$("#modal-success").modal("show");
		setTimeout(function(){ $("#modal-success").modal("hide")}, 1500);
	}
	if(typeof(warningmsj)!="undefined" && warningmsj.trim()!=""){
		$("#modal-warning").find("#msjtxt").html(warningmsj);
		$("#modal-warning").modal("show");
	}
}


function validarErrores(array){

	if(typeof(array)!="undefined"){
		if(array.length){
			var obj = $("<ul><ul>")
			for (var i = 0; i <array.length; i++) {
				obj.append("<li>"+array[i].mensaje+"</li>")
			}
			alertmsj=obj.html();
			validarMensajes();
		}
	}
}


function graficoTortaInit(products_of_deposits,products_of_stores){


	 var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
        var pieChart = new Chart(pieChartCanvas);
        var PieData = [
          {
            value: products_of_deposits,
            color: "#3c8dbc",
            highlight: "#3c8dbc",
            label: "Productos en Deposito"
          },
          {
            value: products_of_stores,
            color: "#00c0ef",
            highlight: "#00c0ef",
            label: "Productos en Tienda"
          }
        ];
        var pieOptions = {
          //Boolean - Whether we should show a stroke on each segment
          segmentShowStroke: true,
          //String - The colour of each segment stroke
          segmentStrokeColor: "#fff",
          //Number - The width of each segment stroke
          segmentStrokeWidth: 2,
          //Number - The percentage of the chart that we cut out of the middle
          percentageInnerCutout: 50, // This is 0 for Pie charts
          //Number - Amount of animation steps
          animationSteps: 100,
          //String - Animation easing effect
          animationEasing: "easeOutBounce",
          //Boolean - Whether we animate the rotation of the Doughnut
          animateRotate: true,
          //Boolean - Whether we animate scaling the Doughnut from the centre
          animateScale: false,
          //Boolean - whether to make the chart responsive to window resizing
          responsive: true,
          // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
          maintainAspectRatio: true,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        };
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.
        pieChart.Doughnut(PieData, pieOptions);
}


function formato_numero(numero, decimales, separador_decimal, separador_miles,bsLit){ 
    numero=parseFloat(numero);
    if(isNaN(numero)){
        return "";
    }

    if(decimales!==undefined){
        // Redondeamos
        numero=numero.toFixed(decimales);
    }

    // Convertimos el punto en separador_decimal
    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");

    if(separador_miles){
        // Añadimos los separadores de miles
        var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
        while(miles.test(numero)) {
            numero=numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }
    return numero+(typeof(bsLit)!="undefined"&&bsLit==true?" Bs.":"");
    //Implementación formato_numero(numeroAFormatear, 2, ',', '.');
}



function check_pending_pdf(){
	$.ajax({
		method: "GET",
  		url: "/check_pdf",
	}).done(
		function(data){
			if (data=="OK") {
				window.location.href="/download.pdf"
			};

		});
}

function unmask(v){
return v.replaceAll(".","").replaceAll(",","");
}
function enmask(mask){
	var result=unmask(mask)
	if (result.length>2) {
		result=result.insert(result.length-2, ",");

		var cad = result.substring(0,result.length-3)
		if (cad.length>3) {
			var index = cad.length-3;
			for (var i = 0; i < parseInt(cad.length/3); i++) {
				if (index!=0) {
					result = result.insert(index,".");
					index -=3;
				};
			}
		};
			
	
	}

	return result;
}
var lat_selected="";
var lng_selected="";


function showNoticeMessage(mjs){
	noticemsj=mjs;
	validarMensajes();
}
function showWarningMessage(mjs){
	warningmsj=mjs;
	validarMensajes();
}
function showErrorMessage(mjs){
	alertmsj=mjs;
	validarMensajes();
}

function change_status(event){
	var element = $(this);
	var model = element.data("model");
	var model_description = element.data("model-description");
	var active = element.text()=="Activar";
	$.ajax({
	  url: element.data("url"),
	  dataType: "json",
	  data: JSON.parse("{\""+model+"\":{\"active\":\""+active+"\"}}")
	  ,
	  method: "PATCH",
	  beforeSend: function( xhr ) {
	  	xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
		$("#modal-loader").modal({backdrop: 'static', keyboard: false}); 
	  }
	}).done(function( data ) {
		console.log(data)
	    showNoticeMessage(model_description+" "+(element.text()=="Activar"?"activada":"desactivada")+" exitosamente");
	    setTimeout(function(){location.reload();},1000);
	  }).error(function(data){
	  			console.log(data.responseText);
	  			try{
	  				var error=JSON.parse(data.responseText);
	  				if(typeof(error.message)!="undefined")
	  					showWarningMessage(error.message[0])
	  				else
	  					showErrorMessage("Lo sentimos, no pudimos "+element.text()+" la "+model_description.toLowerCase());
	  			}catch(e){
					showErrorMessage("Lo sentimos, no pudimos "+element.text()+" la "+model_description.toLowerCase());

	  			}

				if (data.responseText) {}
			}).always(function() {
	   		$("#modal-loader").modal("hide");
	  });

}


function show_detail(event){
	var element = $(this);
    history.pushState({target:element.data("target")},"", window.location.origin+element.data("url"));
    current_state=history.state;
}


function getAddress(lat,lng,f) {
	var latlng = new google.maps.LatLng(lat, lng);
	var geocoder = geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'latLng': latlng },
		function (results, status) {
    		if (status == google.maps.GeocoderStatus.OK) {
        		if (results[1]) {
        			$(".form-no-submit")
        			.append("<input type='hidden' name='store[address]' value='"+results[1].formatted_address+"' />");
        		}
    		}
    		f.apply();
		});
}
var form_model;
function submitForm(m){
		$("#modal-loader").modal({backdrop: 'static', keyboard: false}); 
		form_model=m;
		$.each($(".money"), function( index, e ) {
			$(e).val($(e).val().replaceAll(".","").replace(",","."));
		});

		if (form_model=="store") {
			$(".form-no-submit")
			.append("<input type='hidden' name='store[latitude]' value='"+lat_selected+"' />")
			.append("<input type='hidden' name='store[longitude]' value='"+lng_selected+"' />")
			getAddress(lat_selected,lng_selected,getUrlImage);
		};
		if (form_model=="promotion") {
			getUrlImage();
		};
		if (form_model=="beacon") {
			getUrlImage();
		};
}


function getUrlImage(){

	if ($("#file").val().length>0){
		var formData = new FormData(document.getElementById("file-img"));
		 $.ajax({
		 		beforeSend: function( xhr ) {
				$("#modal-loader").modal({backdrop: 'static', keyboard: false}); 
				},
		        type:'POST',
	            url: $("#file-img").attr('action'),
	            data:formData,
	            cache:false,
	            contentType: false,
	            processData: false,
	            success:function(response){
	                console.log("success");
	                console.log(response);
	                var url_image = response.status_code==200 ? response.data.thumb_url:window.location.origin+"/photo_store/default_"+form_model+".png";
	                $(".form-with-img").append("<input type='text' name='"+form_model+"[picture]' value='"+url_image+"'>");         	
	               	$(".form-with-img").submit();

	            },
	            error: function(data){
	                console.log("error");
	                console.log(data);
			        $(".form-with-img").append("<input type='hidden' name='"+form_model+"[picture]' value='"+window.location.origin+"/photo_store/default_"+form_model+".png'>");         	
					$(".form-with-img").submit();
	            },
	            complete:function(){
	            	$("#modal-loader").modal("hide");
	            }
	        });
	}else{
		if ($("#containerImage").attr("src")=="/photo_store/default_"+form_model+".png") {
        	$(".form-with-img").append("<input type='hidden' name='"+form_model+"[picture]' value='"+window.location.origin+"/photo_store/default_"+form_model+".png'>");         	
		}
		$(".form-with-img").submit();
	}
}


function initCharts(){
	 /* ChartJS
     * -------
     * Here we will create a few charts using ChartJS
     */
    //--------------
    //- AREA CHART -
    //--------------

    // Get context with jQuery - using jQuery's .get() method.
    var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var areaChart = new Chart(areaChartCanvas);

    var areaChartData = {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
      datasets: [
        {
          label: "Arturos's",
          fillColor: "rgba(210, 214, 222, 1)",
          strokeColor: "rgba(210, 214, 222, 1)",
          pointColor: "rgba(210, 214, 222, 1)",
          pointStrokeColor: "#c1c7d1",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "Mc'donals",
          fillColor: "rgba(60,141,188,0.9)",
          strokeColor: "rgba(60,141,188,0.8)",
          pointColor: "#3b8bba",
          pointStrokeColor: "rgba(60,141,188,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(60,141,188,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    var areaChartOptions = {
      //Boolean - If we should show the scale at all
      showScale: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: false,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
      //Boolean - Whether the line is curved between points
      bezierCurve: true,
      //Number - Tension of the bezier curve between points
      bezierCurveTension: 0.3,
      //Boolean - Whether to show a dot for each point
      pointDot: false,
      //Number - Radius of each point dot in pixels
      pointDotRadius: 4,
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,
      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,
      //Boolean - Whether to show a stroke for datasets
      datasetStroke: true,
      //Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,
      //Boolean - Whether to fill the dataset with a color
      datasetFill: true,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
      //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,
      //Boolean - whether to make the chart responsive to window resizing
      responsive: true
    };

    //Create the line chart
    areaChart.Line(areaChartData, areaChartOptions);

    //-------------
    //- LINE CHART -
    //--------------
    var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas);
    var lineChartOptions = areaChartOptions;
    lineChartOptions.datasetFill = false;
    lineChart.Line(areaChartData, lineChartOptions);

    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    var pieChart = new Chart(pieChartCanvas);
    var PieData = [
      {
        value: 700,
        color: "#f56954",
        highlight: "#f56954",
        label: "2x1 en pollos (Arturo's)"
      },
      {
        value: 500,
        color: "#00a65a",
        highlight: "#00a65a",
        label: "Ladies night (Teatro Club)"
      },
      {
        value: 400,
        color: "#f39c12",
        highlight: "#f39c12",
        label: "Chamo Pack Oferta (Arturo's)"
      },
      {
        value: 600,
        color: "#00c0ef",
        highlight: "#00c0ef",
        label: "Oferta Mc combo (Mc'donals)"
      },
      {
        value: 300,
        color: "#3c8dbc",
        highlight: "#3c8dbc",
        label: " Oferta para niños (Edw Shoes)"
      }
    ];
    var pieOptions = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke: true,
      //String - The colour of each segment stroke
      segmentStrokeColor: "#fff",
      //Number - The width of each segment stroke
      segmentStrokeWidth: 2,
      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout: 50, // This is 0 for Pie charts
      //Number - Amount of animation steps
      animationSteps: 100,
      //String - Animation easing effect
      animationEasing: "easeOutBounce",
      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate: true,
      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale: false,
      //Boolean - whether to make the chart responsive to window resizing
      responsive: true,
      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    pieChart.Doughnut(PieData, pieOptions);

    //-------------
    //- BAR CHART -
    //-------------
    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    var barChart = new Chart(barChartCanvas);
    var barChartData = areaChartData;
    barChartData.datasets[1].fillColor = "#00a65a";
    barChartData.datasets[1].strokeColor = "#00a65a";
    barChartData.datasets[1].pointColor = "#00a65a";
    var barChartOptions = {
      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
      //Boolean - If there is a stroke on each bar
      barShowStroke: true,
      //Number - Pixel width of the bar stroke
      barStrokeWidth: 2,
      //Number - Spacing between each of the X value sets
      barValueSpacing: 5,
      //Number - Spacing between data sets within X values
      barDatasetSpacing: 1,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
      //Boolean - whether to make the chart responsive
      responsive: true,
      maintainAspectRatio: true
    };

    barChartOptions.datasetFill = false;
    barChart.Bar(barChartData, barChartOptions);
}