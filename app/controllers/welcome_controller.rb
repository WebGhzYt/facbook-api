class WelcomeController < ApplicationController
  def index
  	@current_client_email = current_client.email if client_signed_in?
    @current_client = current_client
    
  end
  
  

  def home
  end
  def myinfo
  	@client_id = Client.find(parms[:client_id])

    respond_to do |format|      
      
      format.html    
      format.json 
    end
    
  end

def edit
  @client_id = Client.find(parms[:client_id])  
  respond_to do |format|
      
      format.html    
      format.json 
    end 
end

  
  def show

     @client = Client.find(current_client.id)  

     # redirect_to @client.paypal_url(client_registration_path(@client))
     # redirect_to root_url
  end
  
end
