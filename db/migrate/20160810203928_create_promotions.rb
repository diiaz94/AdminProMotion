class CreatePromotions < ActiveRecord::Migration
  def change
    create_table :promotions do |t|
      t.string :title
      t.text :description
      t.boolean :active
      t.string :picture
      t.float :price
      t.string :until
      t.string :slug
      t.belongs_to :store, index:true
      t.timestamps null: false
    end
  end
end
