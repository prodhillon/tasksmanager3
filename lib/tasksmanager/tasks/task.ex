defmodule Tasksmanager.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :title, :string
    field :completed, :string
    field :description, :string
    field :timespent, :integer
    belongs_to :user, Tasksmanager.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :user_id,:description, :completed, :timespent])
    |> validate_required([:title, :description, :user_id])
  end
end
