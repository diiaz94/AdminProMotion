class Role < ActiveRecord::Base
	has_many :users
 	extend FriendlyId
  	friendly_id :name, use: :slugged
  	validates :name, :presence => {:message => "El campo Nombre no puede estar vacío"}
end
