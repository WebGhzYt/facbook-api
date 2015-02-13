class OmniauthCallbacksController < Devise::OmniauthCallbacksController   
def facebook     
     @client = Client.find_for_facebook_oauth(request.env["omniauth.auth"], current_client)      
     if @client.persisted?       
      sign_in_and_redirect @client, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to new_client_registration_url
    end
  end

  def linkedin
		    # auth = env["omniauth.auth"]
		    @client = Client.connect_to_linkedin(request.env["omniauth.auth"],current_client)
		    if @client.persisted?
		      flash[:notice] = I18n.t "devise.omniauth_callbacks.success"
		      sign_in_and_redirect @client, :event => :authentication
		    else
		      session["devise.linkedin_uid"] = request.env["omniauth.auth"]
		      redirect_to new_client_registration_url
		    end
	end

	def twitter
	    #auth = env["omniauth.auth"]

	    @client = Client.find_for_twitter_oauth(request.env["omniauth.auth"],current_client)
	    if @client.persisted?
	      flash[:notice] = I18n.t "devise.omniauth_callbacks.success"
	      sign_in_and_redirect @client, :event => :authentication
	    else
	      session["devise.twitter_uid"] = request.env["omniauth.auth"]
	      redirect_to new_client_registration_url
	    end
	end

	def google_oauth2
     
 	    @client = Client.find_for_google_oauth2(request.env["omniauth.auth"], current_client)
 
	    if @client.persisted?
	      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
	      sign_in_and_redirect @client, :event => :authentication
	    else
	      session["devise.google_data"] = request.env["omniauth.auth"]
	      redirect_to new_client_registration_url
	    end
	end



end
