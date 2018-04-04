defmodule TasksmanagerWeb.PageController do
  use TasksmanagerWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
