class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  before_action :require_login 
	def set_commerce
		if params[:commerce_id]
	    	@commerce = current_user.commerces.friendly.find(params[:commerce_id])
		end
	end
	def set_store
		if params[:commerce_id]
	    	@commerce = current_user.commerces.friendly.find(params[:commerce_id])
	    	if params[:store_id]
	    		@store = @commerce.stores.friendly.find(params[:store_id])
			end
		end
	end
	def admin_role
		return	Role.where(nombre:"Admin")[0].id
	end
	def owner_role
		return	Role.where(nombre:"Owner")[0].id
	end


	require "rubygems"
	require "net/https"
	require "uri"
	require "json"

	def getCurrentTime
	  begin
	    puts "Begin******"

	    uri = URI.parse("http://api.timezonedb.com/?zone=America/Asuncion&format=json&key=ZKLS5YG2UNIH")
	    http = Net::HTTP.new(uri.host, uri.port)
	    request = Net::HTTP::Get.new(uri.request_uri)
	 
	    res = http.request(request)
	    response = JSON.parse(res.body)

	    if(response["status"] and response["status"]=="OK" and response["timestamp"])
	    	puts "OK webservice de tiempo****" + response["timestamp"].to_s
	     	puts DateTime.strptime(response["timestamp"].to_s,'%s').to_formatted_s(:db).to_s 
	     
	     	return DateTime.strptime(response["timestamp"].to_s,'%s').to_formatted_s(:db) 

	    else
	    	puts "Error en respuesta webservice::"
	    return  nil
	    end
	  rescue
	  	puts "Exception en webservice::"
	    return nil
	  end  
	end 
	def getLatLon(address)
		begin
			address.delete!("^\u{0000}-\u{007F}")
			uri = URI.parse("http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false")
	    	http = Net::HTTP.new(uri.host, uri.port)
		   	request = Net::HTTP::Get.new(uri.request_uri)
		    res = http.request(request)
	    	response = JSON.parse(res.body)

			if(response["status"] and response["status"]=="OK")
	    		puts "OK webservice de googlemaps****" + response["results"][0]["geometry"]["location"].to_s
	     	return [response["results"][0]["geometry"]["location"]["lat"],response["results"][0]["geometry"]["location"]["lng"]] 

	    	else
		    	puts "Error en respuesta webservice de googlemaps::"
			    return  [0,0] 
	   		end
		  rescue Exception => e
    		"internal error modifying exception message #{e}"
			puts "Exception en webservice de googlemaps:: #{e}"
			return  [0,0] 
		end
	end

    private
	def not_authenticated
	  redirect_to login_path, alert: "Debes iniciar sesión primero"
	end
end
