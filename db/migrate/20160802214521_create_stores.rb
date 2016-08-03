class CreateStores < ActiveRecord::Migration
  def change
    create_table :stores do |t|
      t.string :name
      t.text :location
      t.text :description
      t.belongs_to :commerce, index:true
      t.string :slug
      t.timestamps null: false
    end
  end
end
