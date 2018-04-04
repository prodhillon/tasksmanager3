defmodule TasksmanagerWeb.TokenController do
  use TasksmanagerWeb, :controller
  alias Tasksmanager.Users.User

  action_fallback TasksmanagerWeb.FallbackController

  def create(conn, %{"email" => email, "password" => password}) do
    with {:ok, %User{} = user} <- Tasksmanager.Users.get_and_auth_user(email, password) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      IO.inspect "Token"
      IO.inspect token
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
