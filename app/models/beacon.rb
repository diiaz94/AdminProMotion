class Beacon < ActiveRecord::Base
	belongs_to :store
	after_initialize :init
 	extend FriendlyId
  	friendly_id :uuid, use: :slugged
	validates :name, :presence => {:message => "El campo Nombre no puede estar vacío"}
	validates :uuid, :presence => {:message => "El campo UUID no puede estar vacío"}
	validates :major, :presence => {:message => "El campo Major no puede estar vacío"}
	validates :minor, :presence => {:message => "El campo Minor no puede estar vacío"}
	validates :store_id, :presence => {:message => "Debe indicar la Tienda"}

	def init
		self.picture  ||= "/photo_store/default_beacon.png"
	end	

end
