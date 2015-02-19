class AddPriceToDonate < ActiveRecord::Migration
  def change
    add_column :donates, :price, :integer
  end
end
