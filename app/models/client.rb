class Client < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable
def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    client = Client.where(:provider => auth.provider, :uid => auth.uid).first
    if client
      return client
    else
      registered_client = Client.where(:email => auth.info.email).first
      if registered_client
        return registered_client
      else
        client = Client.create(
                            provider:auth.provider,
                            uid:auth.uid,
                            email:auth.info.email,
                            password:Devise.friendly_token[0,20],
                          )
      	end
      end
	end


  def self.connect_to_linkedin(auth, signed_in_resource=nil)
    client = Client.where(:provider => auth.provider, :uid => auth.uid).first
    if client
      return client
    else
      registered_client = Client.where(:email => auth.info.email).first
      if registered_client
        return registered_client
      else

        client = Client.create(
                            provider:auth.provider,
                            uid:auth.uid,
                            email:auth.info.email,
                            password:Devise.friendly_token[0,20],
                          )
      end

    end
  end


  def self.find_for_twitter_oauth(auth, signed_in_resource=nil)
      client = Client.where(:provider => auth.provider, :uid => auth.uid).first
      if client
        return client
      else
        registered_client = Client.where(:email => auth.uid + "@twitter.com").first
        if registered_client
          return registered_client
        else

          client = Client.create(
                              provider:auth.provider,
                              uid:auth.uid,
                              email:auth.uid+"@twitter.com",
                              password:Devise.friendly_token[0,20],
                            )
        end
      end
  end

  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
    data = access_token.info
    client = Client.where(:provider => access_token.provider, :uid => access_token.uid ).first
    if client
      return client
    else
      registered_client = Client.where(:email => access_token.info.email).first
      if registered_client
        return registered_client
      else
        client = Client.create(
          provider:access_token.provider,
          email: data["email"],
          uid: access_token.uid ,
          password: Devise.friendly_token[0,20]
        )
      end
    end
  end

  # def paypal_url(return_path)
  #   values = {
  #       business: "engrohitjain5-facilitator@gmail.com",
  #       cmd: "_xclick",
  #       upload: 1,
  #       return: "#{Rails.application.secrets.app_host}#{return_path}",
  #       invoice: id,
  #       amount: product.price,
  #       item_name: product.name,
  #       item_number: product.id,
  #       quantity: '1'
  #   }
  #   "#{Rails.application.secrets.paypal_host}/cgi-bin/webscr?" + values.to_query
  # end

end
