class User < ActiveRecord::Base
	authenticates_with_sorcery!
	attr_accessor  :password, :password_confirmation
	has_many :commerces,dependent: :destroy
	belongs_to :role
	has_one :profile, dependent: :destroy
	accepts_nested_attributes_for :profile, allow_destroy: true
	extend FriendlyId
	friendly_id :email, use: :slugged

	#Validaciones
	validates :email, :presence => {:message => "El campo email no puede estar vacío"}
	validates :email, :uniqueness => {:message => "Ya existe un usuario cone este correo"}
	validates :password, length: {:if => :password_required?, minimum: 8 , message:"El campo contraseña debe contener al menos 8 dígitos"}
	validates :password, :presence =>  { :if => :password_required?, :message => "El campo contraseña no puede estar vacío"}
	validates :password, :confirmation =>  { :if => :password_required?, :message => "Las contraseñas no coinciden"}
	validates :password_confirmation, :presence =>  { :if => :password_required?, :message => "El campo confirmar contraseña no puede estar vacío"}
  def password_required?
    new_record?
  end
  def admin?
    self.role.name=="Admin"
  end

  def owner?
    self.role.name=="Owner"
  end

  def seller?
    self.role.name=="Seller"
  end
	def role_name
	    puts "role******"
	    if !self.role_id?
	      return "S/R"
	    end
	    if self.admin?
	      return "Administrador"
	    end
	    if self.owner? 
	      if self.commerces.count>0
	        count = self.commerces.count
	        return "Propietari"+(self.profile.sex==true ? "o": "a")+" de "+count.to_s+" Comercio"+(count>1 ? "s" : "")
	      else
	        return "Owner"
	      end
	    end
	    if self.seller?
	      return "Vendedor"+(self.profile.sex ? "" : "a")+" en la tienda "+self.sellers.first.store.nombre 
		end
		end  
end
