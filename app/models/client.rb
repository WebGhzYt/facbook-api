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



end
