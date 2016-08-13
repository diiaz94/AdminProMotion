class Promotion < ActiveRecord::Base

	belongs_to :store
	after_initialize :init
 	extend FriendlyId
  	friendly_id :title, use: :slugged
	validates :title, :presence => {:message => "El campo Título no puede estar vacío"}
	validates :until, :presence => {:message => "El campo Caducidad no puede estar vacío"}
	validates :price, :presence => {:message => "El campo Precio no puede estar vacío"}
	validates :store_id, :presence => {:message => "Debe indicar la Tienda"}

	def init
		self.picture  ||= "/photo_store/default_promotion.png"
		self.active =  false if self.active.nil?
	end	
	
	def state
		return self.active ? "Activa" : "Inactiva"
	end
end
