class CreateStores < ActiveRecord::Migration
  def change
    create_table :stores do |t|
      t.string :name
      t.text :description
      t.string :email
      t.string :phone
      t.text :address
      t.boolean :active
      t.string :latitude
      t.string :longitude
      t.string :picture
      t.belongs_to :commerce, index:true
      t.belongs_to :category, index:true
      t.string :slug
      t.timestamps null: false
    end
  end
end
