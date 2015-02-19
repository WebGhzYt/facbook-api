class CustomerController < ApplicationController
	def index
    	@customers = Customer.all
  	end
	def new
		 @customer = Customer.new
    	 # respond_with(@customer)
	end
	def create
		@count = Random.rand(100...1000)
 		@customer = Customer.new(customer_params)
   		if @customer.save
   			redirect_to @customer.paypal_url(customer_path(@customer),@customer,@count)
   		else
     	 redirect_to :back
     	end
	end
	def show
		# render 'layout/amount'
		# render "customer/show"
		@customer = Customer.find(params[:id])
		@count = Random.rand(100...1000)
		redirect_to @customer.paypal_url(customer_path(@customer),@customer,@count)
	end
	private
    def customer_params
      params.require(:customer).permit(:email,:password)
    end
end