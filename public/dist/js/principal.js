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
  			$(value).val(formato_numero($(value).text(), 2, ',', '.',false))
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
}function showErrorMessage(mjs){
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
	    location.reload();
	  }).error(function(data){
				console.log(data.responseText);
				showErrorMessage("Lo sentimos, no pudimos "+element.text()+" la "+model_description.toLowerCase());
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