class Welcome < ActiveRecord::Base

def paypal_url(return_url) 
  values = { 
  :business => 'engrohitjain5-facilitator@gmail.com',
  :cmd => '_cart',
  :upload => 1,
  :return => return_url,
  }         # For test transactions use this URL
  "https://www.sandbox.paypal.com/cgi-bin/webscr?" + values.to_query
end 

end
