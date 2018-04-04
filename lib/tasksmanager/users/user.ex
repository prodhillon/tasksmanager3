defmodule Tasksmanager.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :name, :string
    field :email, :string

    field :password_hash, :string
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :password, :email, :password_confirmation])
    |> validate_confirmation(:password)
    |> validate_password(:password)
    |> validate_required([:name, :password, :email])
    |> unique_constraint(:email)
    |> generate_password_hash
  end

  def generate_password_hash(changeset) do
    IO.inspect "Inside hassh"
   case changeset do
     %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
       IO.inspect "valid hash"
       put_change(changeset, :password_hash, Comeonin.Argon2.hashpwsalt(password))
     _ ->
       changeset
       IO.inspect changeset
   end
 end

 def validate_password(changeset, field, options \\ []) do
   validate_change(changeset, field, fn _, password ->
     case valid_password?(password) do
       {:ok, _} -> []
       {:error, msg} -> [{field, options[:message] || msg}]
     end
   end)
 end

 def valid_password?(password) when byte_size(password) > 7 do
   {:ok, password}
 end
 def valid_password?(_), do: {:error, "The password is too short"}
 
end
