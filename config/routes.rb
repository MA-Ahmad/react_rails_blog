Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :blogs
      # get 'blogs/index'
      post 'blogs/create'
      # get '/show/:id', to: 'recipes#show'
      # delete '/destroy/:id', to: 'recipes#destroy'
    end
  end
  root 'home#index'
  get '/*path', to: 'home#index'
end
