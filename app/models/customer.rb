class Customer < ActiveRecord::Base
	 def paypal_url(return_path,customer,count)
    values = {
        business: "engrohitjain5-facilitator@gmail.com",
        cmd: "_xclick",
        upload: 1,
        return: "#{Rails.application.secrets.app_host}#{return_path}",
        invoice: count,
        amount: 250,
        item_name: customer.email,
        item_number: '',
        quantity: '',
        notify_url: "#{Rails.application.secrets.app_host}/hook"
    }
    "#{Rails.application.secrets.paypal_host}/cgi-bin/webscr?" + values.to_query
  end
end
