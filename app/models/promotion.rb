class ActivatesValidator < ActiveModel::Validator
  def validate(record)
  	puts "***"+record.send(options[:fields][0]).to_s
  	if record.send(options[:fields][0])==true
    	puts "OK active"
    	array = Store.find(record.send(options[:fields][1])).promotions.where("active =? AND id!=?","true",record.send(options[:fields][2]))
    	if array.size>0
	      record.errors[:message] = "Esta tienda ya posee una promoción activa"
    		
    	end
    end
  end
end
class Promotion < ActiveRecord::Base

	belongs_to :store
	after_initialize :init
 	extend FriendlyId
  	friendly_id :title, use: :slugged
	validates :title, :presence => {:message => "El campo Título no puede estar vacío"}
	validates :until, :presence => {:message => "El campo Caducidad no puede estar vacío"}
	validates :price, :presence => {:message => "El campo Precio no puede estar vacío"}
	validates :store_id, :presence => {:message => "Debe indicar la Tienda"}
	validates_with ActivatesValidator, fields: [:active,:store_id,:id]

	def init
		self.picture  ||= "/photo_store/default_promotion.png"
		self.active =  false if self.active.nil?
	end	
	
	def state
		return self.active ? "Activa" : "Inactiva"
	end
end
