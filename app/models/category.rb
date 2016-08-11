class Category < ActiveRecord::Base
	has_many :stores
 	extend FriendlyId
  	friendly_id :name, use: :slugged
	validates :name, :presence => {:message => "El campo Nombre no puede estar vacío"}
end
