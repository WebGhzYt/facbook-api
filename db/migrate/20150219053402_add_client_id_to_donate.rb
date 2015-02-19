class AddClientIdToDonate < ActiveRecord::Migration
  def change
    add_column :donates, :client_id, :integer
  end
end
