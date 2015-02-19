class Product < ActiveRecord::Base

 #  def paypal_url(return_url) 
	# values = { 
	# :business => 'engrohitjain5-facilitator@gmail.com',
 #    :cmd => '_cart',
	# :upload => 1,
	# :return => return_url,
	# }	values.merge!({ 
	# "amount_1" => product.price,
	# "item_name_1" => product.name,
	# "item_number_1" => product.id,
	# "quantity_1" => '1'
	# })
 #         # For test transactions use this URL
	# "https://www.sandbox.paypal.com/cgi-bin/webscr?" + values.to_query
 # end 

	# def paypal_url(return_path)
 #    values = {
 #        business: "engrohitjain5-facilitator@gmail.com",
 #        cmd: "_xclick",
 #        upload: 1,
 #        return: "#{Rails.application.secrets.app_host}#{return_path}",
 #        invoice: id,
 #        amount: product.price,
 #        item_name: product.name,
 #        item_number: product.id,
 #        quantity: '1'
 #    }
 #    "#{Rails.application.secrets.paypal_host}/cgi-bin/webscr?" + values.to_query
 #  end



end
