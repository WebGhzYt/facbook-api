    Rails.application.config.middleware.use OmniAuth::Builder do  
      provider :twitter, 'E6cIgEs40At6TnfiqqFf2vHuG', 'kXSq88dOVxVZYiURfxKc1ucEMgQtHMkGhPJl8QoDiTJ7Wfoitj'  
      # provider :facebook, 'APP_ID', 'APP_SECRET'  
      # provider :linked_in, 'CONSUMER_KEY', 'CONSUMER_SECRET'  
    end  