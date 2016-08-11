class Profile < ActiveRecord::Base
	belongs_to :user
	validates :name, :presence => {:message => "El campo Nombres no puede estar vacío"}
	validates :last_name, :presence => {:message => "El campo Apellidos no puede estar vacío"}
	extend FriendlyId
	friendly_id :name, use: :slugged
	def identifier
		self.user.cedula
	end	

	def short_name
		self.name
	end
	def complete_name
		self.name + " "+ self.last_name
	end

	def sex_name
		self.sex == true ? "Masculino" : "Femenino"
	end

end
