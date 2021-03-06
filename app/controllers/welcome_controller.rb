class WelcomeController < ApplicationController
  skip_before_action :require_login,  except: [:index,:admin,:owner,:seller]

  def index

    if current_user.admin?
      redirect_to admin_index_path
    end 
    if current_user.owner?
      redirect_to owner_index_path
    end 
    if current_user.seller?
      redirect_to seller_index_path
    end 
    
  end
  def admin
    render "index"
  end
  def owner
    render "index"
  end
  def seller
    render "index"
  end
  def admin_user
  	@user = User.new
    if !@notUsers
      render "register_user", layout: "blank"
    else
      redirect_to root_path
    end
  end

  def create_admin_user
  	@user = User.new(user_params)
   
      roles=Role.where(name: "Admin")
    if roles.length>0
    	@user.role_id =  roles[0].id
    	if @user.save
    	 	 redirect_to login_path
        else
          redirect_to(:back,alert: "Lo sentimos, no se ha podido crear el usuario Administrador.")
        return
        end
    else
    	redirect_to(:back,alert: "Lo sentimos, no se ha podido crear el usuario Administrador.")
    	#render "register_user", layout: "blank", alert: "Lo sentimos, no se ha podido crear el usuario Administrador."
        return
    end
 

  end

  def download
     if $pdf!=nil
      puts "download pdf"
      respond_to do  |format|
        format.pdf do
          puts "OKAY"
           send_data $pdf.render, filename: $pdf.file_name,
                                  type: "application/pdf",
                                  disposition: "outline"
            $pdf=nil
        end
      end
      puts "OK"
    else
      puts "FAIL"
      send_data "FAIL"
    end
    
  end
  def check_pending_pdf
    send_data $pdf!=nil ? "OK" : "FAIL"
  end

  	private
    
	  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation,:role_id,profile_attributes: [:id,:name, :last_name, :sex, :phone, :_destroy])
  end
end
