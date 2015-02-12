class WelcomeController < ApplicationController
  def index
  	@current_client_email = current_client.email if client_signed_in?
  end
  def home
  end
end
