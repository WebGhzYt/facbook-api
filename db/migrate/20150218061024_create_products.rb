class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.integer :unit_price

      t.timestamps null: false
    end
  end
end
