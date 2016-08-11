class Promotion < ActiveRecord::Base
	belongs_to :store
 	extend FriendlyId
  	friendly_id :title, use: :slugged
	validates :title, :presence => {:message => "El campo Título no puede estar vacío"}
	validates :store_id, :presence => {:message => "Debe indicar la Tienda"}
end
