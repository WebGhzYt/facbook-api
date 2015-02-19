class DonateController < ApplicationController
# def donation 


# end



	# def paypal_url(return_path)
 #    values = {
 #        business: "engrohitjain5-facilitator@gmail.com",
 #        cmd: "_xclick",
 #        upload: 1,
 #        return: "#{Rails.application.secrets.app_host}#{return_path}",
 #        invoice: id,
 #        amount: 250,
        
 #    }
 #    "#{Rails.application.secrets.paypal_host}/cgi-bin/webscr?" + values.to_query
 # #  end
 # def new

 # end

  def create

 	# @client   = Client.find(params[:client_id])
 	@price = params[:price]

  	@donate = Donate.new(:price => @price)
    # @donate.save
 	  


  	# values = {
   #      business: "engrohitjain5-facilitator@gmail.com",
   #      cmd: "_xclick",
   #      upload: 1,
   #      return: "#{Rails.application.secrets.app_host}#{return_path}",
   #      invoice: id,
   #      amount: 250,
        
   #  }
   #  "#{Rails.application.secrets.paypal_host}/cgi-bin/webscr?" + values.to_query
  end
  private
  def donate_params
      params.require(:donate).permit(:client_id,:price)
    end
end
