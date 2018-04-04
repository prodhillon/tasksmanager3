defmodule TasksmanagerWeb.Router do
  use TasksmanagerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TasksmanagerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/tasks", PageController, :index
    get "/users/:id", PageController, :index
    get "/tasks/:id", PageController, :index
    get "/users/new", PageController, :index
    get "/task/new", PageController, :index
    get "/feed", PageController, :index
    get "/feed/:id", PageController, :index
    get "/users/edit/:id", PageController, :index
  end

  # Other scopes may use custom stacks.
   scope "/api/v1", TasksmanagerWeb do
     pipe_through :api
     resources "/users", UserController, except: [:new, :edit]
     resources "/tasks", TaskController, except: [:new, :edit]
     post "/token", TokenController, :create
     post "/tasks/:id", TaskController, :update
     post "/users/:id", UserController, :update
   end
end
