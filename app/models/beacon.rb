class Beacon < ActiveRecord::Base
	belongs_to :store
 	extend FriendlyId
  	friendly_id :uuid, use: :slugged
	validates :uuid, :presence => {:message => "El campo UUID no puede estar vacío"}
	validates :major, :presence => {:message => "El campo Major no puede estar vacío"}
	validates :minor, :presence => {:message => "El campo Minor no puede estar vacío"}
	validates :store_id, :presence => {:message => "Debe indicar la Tienda"}

end
