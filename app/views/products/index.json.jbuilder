json.array!(@products) do |product|
  json.extract! product, :id, :name, :string, :unit_price, :decimal
  json.url product_url(product, format: :json)
end
