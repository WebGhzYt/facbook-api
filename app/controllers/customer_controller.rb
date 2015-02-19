class CustomerController < ApplicationController
	def index
    	@customers = Customer.all
  	end
	def new
		 @customer = Customer.new
    	 # respond_with(@customer)
	end
	def create
		
 		@customer = Customer.new(customer_params)
   		if @customer.save
   			redirect_to @customer.paypal_url(customer_path(@customer))
   		else
     	 redirect_to :back
     	end
	end
	def show
		@customer = Customer.find(params[:id])
		redirect_to @customer.paypal_url(customer_path(@customer))
	end
	private
    def customer_params
      params.require(:customer).permit(:email,:password)
    end
end