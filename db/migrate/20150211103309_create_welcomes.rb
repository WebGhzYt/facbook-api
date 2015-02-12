class CreateWelcomes < ActiveRecord::Migration
  def change
    create_table :welcomes do |t|
      t.string :name
      t.integer :pid

      t.timestamps null: false
    end
  end
end
