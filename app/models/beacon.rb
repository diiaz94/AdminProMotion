class BeaconValidator < ActiveModel::Validator
  def validate(record)
  	if Beacon.where(uuid: record.send(options[:fields][0]),major record.send(options[:fields][1]),minor: record.send(options[:fields][2])).size>0
	    record.errors[:base] << "Ya existe un beacon registrado con estos valores, intente con otros valores"
    end
  end
end
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
	validates_with BeaconValidator, fields: [:uuid,:major,:minor]
	def init
		self.picture  ||= "/photo_store/default_beacon.png"
	end	

end
